"use client";
import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Image as ImageIcon, Trash2 } from "lucide-react";

interface ReportFormFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  imageUrl: string | undefined;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  t: (key: string) => string;
}

export function ReportFormFields({
  title,
  setTitle,
  description,
  setDescription,
  imageUrl,
  handleImageChange,
  handleRemoveImage,
  fileInputRef,
  t,
}: ReportFormFieldsProps) {
  return (
    <>
      {/* Title input */}
      <div className="space-y-1">
        <label className="text-text-contrast text-sm font-semibold block">
          {t("fieldTitle")} <span className="text-red-500">*</span>
        </label>
        <TextField
          fullWidth
          size="small"
          placeholder={t("titlePlaceholder")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          slotProps={{
            input: {
              className: "text-text-contrast bg-bgc-page",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": { borderColor: "var(--color-bdc-primary)" },
              "&:hover fieldset": { borderColor: "var(--color-bdc-muted)" },
            },
          }}
        />
      </div>

      {/* Description input */}
      <div className="space-y-1">
        <label className="text-text-contrast text-sm font-semibold block">
          {t("fieldDescription")} <span className="text-red-500">*</span>
        </label>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder={t("descriptionPlaceholder")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          slotProps={{
            input: {
              className: "text-text-contrast bg-bgc-page",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": { borderColor: "var(--color-bdc-primary)" },
              "&:hover fieldset": { borderColor: "var(--color-bdc-muted)" },
            },
          }}
        />
      </div>

      {/* Image Upload Input */}
      <div className="space-y-2">
        <label className="text-text-contrast text-sm font-semibold block">
          {t("fieldImage")}
        </label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {!imageUrl ? (
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="outlined"
            startIcon={<ImageIcon className="h-4 w-4" />}
            sx={{
              textTransform: "none",
              borderColor: "var(--color-bdc-primary)",
              color: "var(--color-text-contrast)",
              borderRadius: "8px",
              "&:hover": {
                borderColor: "var(--color-bdc-muted)",
                bgcolor: "var(--color-hbgc-app)",
              },
            }}
          >
            {t("uploadImageBtn")}
          </Button>
        ) : (
          <div className="flex items-start gap-4 p-3 border border-bdc-primary rounded-lg bg-bgc-page max-w-full">
            <Box
              component="img"
              src={imageUrl}
              alt={t("imageAttached")}
              sx={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "6px",
                border: "1px solid var(--color-bdc-primary)",
              }}
            />
            <div className="flex-1 flex flex-col justify-between h-[80px]">
              <Typography variant="caption" className="text-text-muted truncate max-w-[200px]">
                {t("imageAttached")}
              </Typography>
              <Button
                type="button"
                onClick={handleRemoveImage}
                variant="text"
                color="error"
                size="small"
                startIcon={<Trash2 className="h-3.5 w-3.5" />}
                sx={{
                  textTransform: "none",
                  alignSelf: "flex-start",
                  p: 0,
                  minWidth: "auto",
                  fontWeight: "bold",
                }}
              >
                {t("removeBtn")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ReportFormFields;
