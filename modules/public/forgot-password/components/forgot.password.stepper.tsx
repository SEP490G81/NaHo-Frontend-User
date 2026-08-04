import {
    FORGOT_PASSWORD_STEPS,
    ForgotPasswordStep,
} from "@/modules/public/forgot-password/constants/forgot.password.constant";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

const ForgotPasswordStepper = ({ step }: { step: ForgotPasswordStep }) => {
    const t = useTranslations();

    // "done" nằm ngoài 3 bước hiển thị nên coi như đã qua hết
    const currentIndex =
        step === "done"
            ? FORGOT_PASSWORD_STEPS.length
            : FORGOT_PASSWORD_STEPS.indexOf(step);

    return (
        <div className="flex w-full items-center justify-center gap-x-1">
            {FORGOT_PASSWORD_STEPS.map((name, index) => {
                const isDone = index < currentIndex;
                const isActive = index === currentIndex;

                return (
                    <Fragment key={name}>
                        {index > 0 && (
                            <span
                                className={`h-px w-8 md:w-10 ${
                                    isDone || isActive
                                        ? "bg-bgc-highlight"
                                        : "bg-bdc-muted"
                                }`}
                            />
                        )}
                        <div className="flex flex-col items-center gap-y-1">
                            <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                                    isDone
                                        ? "border-bgc-highlight bg-bgc-highlight text-text-pure"
                                        : isActive
                                          ? "border-bgc-highlight text-text-highlight"
                                          : "border-bdc-muted text-text-muted"
                                }`}
                            >
                                {isDone ? (
                                    <CheckIcon sx={{ fontSize: 16 }} />
                                ) : (
                                    index + 1
                                )}
                            </span>
                            <span
                                className={`text-[11px] ${
                                    isActive
                                        ? "text-text-highlight font-semibold"
                                        : "text-text-muted"
                                }`}
                            >
                                {t(`forgotPassword.steps.${name}`)}
                            </span>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default ForgotPasswordStepper;
