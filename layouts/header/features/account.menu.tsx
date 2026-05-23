import { Avatar, Divider, Popover } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const AccountMenu = ({
    anchorEl,
    setAnchorEl,
}: {
    anchorEl: HTMLButtonElement | null;
    setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
}) => {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <div>
                <div className="flex items-center gap-x-3 p-3.5">
                    <Avatar
                        sx={{
                            width: "56px",
                            height: "56px",
                        }}
                    >
                        T
                    </Avatar>
                    <div className="text-left">
                        <h2 className="text-sm font-semibold">
                            {"Nguyen Truc"}
                        </h2>
                        <p className="text-tc-muted text-sm font-semibold">
                            {"vuongtruc2004@gmail.com"}
                        </p>
                    </div>
                </div>

                <Divider />
            </div>
        </Popover>
    );
};

export default AccountMenu;
