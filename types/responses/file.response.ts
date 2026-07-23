export interface FileResponse {
    id: number;
    objectKey: string;
    originalName: string;
    contentType: string;
    size: number;
    /** Các trường cũ (giữ optional để tương thích ngược). */
    fileUrl?: string;
    previewUrl?: string;
}

export interface FileResult {
    id: number;
    objectKey: string;
    originalName: string;
    contentType: string;
    size: number;
}
