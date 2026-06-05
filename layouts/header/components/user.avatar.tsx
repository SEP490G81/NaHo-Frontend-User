import { Avatar } from "@mui/material";
import { useState } from "react";
import AccountMenu from "@/layouts/header/components/account.menu";
import { useAuth } from "@/features/providers/auth.provider";

const UserAvatar = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { user } = useAuth();

    const initials = user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U";

    return (
        <>
            <button
                className="border-l-bdc-muted cursor-pointer"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <Avatar
                    src={user?.avatarFileUrl || undefined}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        width: "40px",
                        height: "40px",
                    }}
                >
                    {initials}
                </Avatar>
            </button>

            <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
    );
};

export default UserAvatar;
