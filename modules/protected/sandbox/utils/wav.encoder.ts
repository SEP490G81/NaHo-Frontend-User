/**
 * Chuyển bản ghi (webm/opus...) sang WAV PCM 16kHz mono — định dạng chuẩn cho
 * Azure Speech ("Could not recognize any speech content" thường do gửi webm/opus
 * thô mà Azure không giải mã được), đồng thời phát lại được ở mọi trình duyệt.
 */

const TARGET_RATE = 16000;

type AudioCtor = typeof AudioContext;

function getAudioContext(): AudioContext {
    const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: AudioCtor })
            .webkitAudioContext;
    return new Ctor();
}

function encodeWav(samples: Float32Array, sampleRate: number): Blob {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    const writeStr = (offset: number, str: string) => {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    };

    writeStr(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // byte rate
    view.setUint16(32, 2, true); // block align
    view.setUint16(34, 16, true); // bits/sample
    writeStr(36, "data");
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        offset += 2;
    }
    return new Blob([view], { type: "audio/wav" });
}

/** Decode blob ghi âm → resample về 16kHz mono → encode WAV 16-bit. */
export async function blobToWav(blob: Blob): Promise<Blob> {
    const arrayBuffer = await blob.arrayBuffer();
    const decodeCtx = getAudioContext();
    const decoded = await decodeCtx.decodeAudioData(arrayBuffer);
    await decodeCtx.close();

    if (!decoded.length || !decoded.duration) {
        throw new Error("Bản ghi rỗng");
    }

    const frameCount = Math.ceil(decoded.duration * TARGET_RATE);
    const offline = new OfflineAudioContext(1, frameCount, TARGET_RATE);
    const source = offline.createBufferSource();
    source.buffer = decoded;
    source.connect(offline.destination);
    source.start();
    const rendered = await offline.startRendering();

    return encodeWav(rendered.getChannelData(0), TARGET_RATE);
}
