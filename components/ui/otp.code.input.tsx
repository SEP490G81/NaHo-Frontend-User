"use client";
import { OTP_LENGTH } from "@/constants/otp.constants";
import { onlyDigits } from "@/libs/otp";
import { ClipboardEvent, KeyboardEvent, useEffect, useRef } from "react";

const OtpCodeInput = ({
    values,
    error,
    disabled,
    focusSignal,
    onChange,
    onComplete,
}: {
    values: string[];
    error: boolean;
    disabled: boolean;
    focusSignal: number;
    onChange: (values: string[]) => void;
    onComplete: (code: string) => void;
}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const focusAt = (index: number) => {
        const target = inputRefs.current[index];
        if (target) {
            target.focus();
            target.select();
        }
    };

    // focus ô đầu tiên khi mở màn hình và mỗi lần mã bị xoá để nhập lại
    useEffect(() => {
        if (!disabled) focusAt(0);
    }, [focusSignal, disabled]);

    const emit = (nextValues: string[], focusIndex: number) => {
        onChange(nextValues);
        focusAt(focusIndex);

        const code = nextValues.join("");
        if (code.length === OTP_LENGTH) onComplete(code);
    };

    const handleChange = (index: number, rawValue: string) => {
        const digits = onlyDigits(rawValue);
        if (digits.length === 0) return;

        const nextValues = [...values];
        // gõ 1 ký tự thì điền vào ô hiện tại, dán nhiều ký tự thì trải từ ô hiện tại
        digits
            .slice(0, OTP_LENGTH - index)
            .split("")
            .forEach((digit, offset) => {
                nextValues[index + offset] = digit;
            });

        const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
        emit(nextValues, nextIndex);
    };

    const handleKeyDown = (
        index: number,
        event: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Backspace") {
            event.preventDefault();
            const nextValues = [...values];
            if (nextValues[index]) {
                nextValues[index] = "";
                emit(nextValues, index);
                return;
            }
            if (index > 0) {
                nextValues[index - 1] = "";
                emit(nextValues, index - 1);
            }
            return;
        }

        if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            focusAt(index - 1);
            return;
        }

        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            event.preventDefault();
            focusAt(index + 1);
        }
    };

    const handlePaste = (
        index: number,
        event: ClipboardEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();
        handleChange(index, event.clipboardData.getData("text"));
    };

    return (
        <div className="flex w-full items-center justify-center gap-x-2 md:gap-x-3">
            {values.map((value, index) => (
                <input
                    // các ô OTP là danh sách cố định nên dùng index làm key
                    key={index}
                    ref={(element) => {
                        inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    aria-label={`OTP ${index + 1}`}
                    maxLength={OTP_LENGTH}
                    value={value}
                    disabled={disabled}
                    onChange={(event) =>
                        handleChange(index, event.target.value)
                    }
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={(event) => handlePaste(index, event)}
                    onFocus={(event) => event.target.select()}
                    className={`bg-bgc-app/60 h-12 w-11 rounded-lg border text-center text-xl font-semibold transition-colors outline-none disabled:opacity-60 md:h-14 md:w-12 ${
                        error
                            ? "border-text-error"
                            : "border-bdc-muted focus:border-text-highlight"
                    }`}
                />
            ))}
        </div>
    );
};

export default OtpCodeInput;
