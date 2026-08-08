"use client";
import React from "react";
import NotificationButton from "@/layouts/protected-header/features/notification.button";
import SettingsButton from "./settings.button";
import { Button, Divider } from "@mui/material";
import { useUiStore } from "@/store/uiStore";
import { PanelLeftClose } from "lucide-react";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { useTranslations } from "next-intl";
import FuriganaSwitchButton from "./furigana.switch.button";
import HeaderDecoration from "./header.decoration";
import { ReportModal } from "@/modules/protected/report/features/report-modal";
import DailyRewardCalendar from "@/layouts/protected-header/features/daily.reward.calendar";
import DailyMissionButton from "@/layouts/protected-header/features/daily.mission.button";
import DailyStreakButton from "@/layouts/protected-header/features/daily.streak.button";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

const ProtectedHeader = () => {
    const t = useTranslations();
    const { toggleSidebarCollapse, isSidebarCollapsed } = useUiStore();

    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-between overflow-hidden border-b px-3 py-3.5">
            <HeaderDecoration />

            {/* Left: collapse toggle (desktop) + mobile menu button */}
            <div className="z-10 flex min-w-0 items-center justify-start gap-x-3">
                <TooltipCustom
                    arrow
                    title={
                        isSidebarCollapsed
                            ? t("common.layout.header.expandSidebar")
                            : t("common.layout.header.collapseSidebar")
                    }
                    placement="bottom"
                >
                    <Button
                        onClick={toggleSidebarCollapse}
                        variant="outlined"
                        color="primary"
                        sx={{
                            width: "40px",
                            minWidth: "40px",
                            height: "40px",
                            display: { xs: "none", md: "inline-flex" },
                        }}
                    >
                        {isSidebarCollapsed ? (
                            <KeyboardDoubleArrowLeftOutlinedIcon className="h-5 w-5" />
                        ) : (
                            <KeyboardDoubleArrowRightOutlinedIcon className="h-5 w-5" />
                        )}
                    </Button>
                </TooltipCustom>
            </div>

            <div className="flex items-center justify-center gap-x-3">
                <DailyStreakButton />

                <DailyRewardCalendar />

                <DailyMissionButton />
            </div>

            {/* Right */}
            <div className="z-10 flex items-center gap-x-3">
                <FuriganaSwitchButton />
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        height: 24,
                        my: "auto",
                        borderColor: "var(--color-bdc-primary)",
                    }}
                />
                <NotificationButton />
                <SettingsButton />
                <ReportModal />
            </div>
        </div>
    );
};

export default ProtectedHeader;
