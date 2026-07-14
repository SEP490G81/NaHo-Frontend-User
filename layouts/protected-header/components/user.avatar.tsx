import { Avatar } from "@mui/material";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use.current.user";
import { getFirstCharacter, getUserAvatarUrl } from "@/layouts/protected-header/utils/header.util";
import AccountMenu from "@/layouts/protected-header/components/account.menu";

const UserAvatar = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { data: user } = useCurrentUser();

    return (
        <>
            <button
                className="border-l-bdc-muted cursor-pointer"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <Avatar
                    src={getUserAvatarUrl(user)}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        width: "40px",
                        height: "40px",
                    }}
                >
                    {getFirstCharacter(user)}
                </Avatar>

            </button>

            <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
    );
};

export default UserAvatar;
