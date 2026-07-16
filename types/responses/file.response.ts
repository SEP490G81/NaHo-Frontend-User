export interface FileResponse {
    id: number;
    /** URL công khai của file (BE trả trực tiếp URL CloudFront). */
    objectKey: string;
    /** Các trường cũ (giữ optional để tương thích ngược). */
    fileUrl?: string;
    previewUrl?: string;
    originalName: string;
    contentType: string;
    size: number;
}
