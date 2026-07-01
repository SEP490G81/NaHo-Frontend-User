// "use client";
// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "@/i18n/navigation";
// import { Breadcrumbs, Typography } from "@mui/material";
// import { useTranslations } from "next-intl";

// export function CustomHeader() {
//     const t = useTranslations("communityLibrary");

//     return (
//         <div className="flex flex-wrap items-center justify-between gap-4">
//             <Breadcrumbs aria-label="breadcrumb">
//                 <Link href="/community-library">
//                     <span className="text-text-muted hover:text-bgc-highlight text-sm font-medium transition-colors">
//                         {t("title")}
//                     </span>
//                 </Link>
//                 <Typography className="text-text-contrast text-sm font-semibold">
//                     Chi tiết câu hỏi
//                 </Typography>
//             </Breadcrumbs>

//             <Link
//                 href="/community-library"
//                 className="border-bdc-primary bg-bgc-page text-text-contrast hover:bg-hbgc-app inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors cursor-pointer"
//             >
//                 <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
//                 Quay lại
//             </Link>
//         </div>
//     );
// }

// export default CustomHeader;
