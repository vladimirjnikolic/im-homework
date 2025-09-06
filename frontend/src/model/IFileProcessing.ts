export interface IFileProcessing {
  uploadId: string;
  fileName: string;
  downloadUrl?: string;
  status: "processing" | "completed" | "failed";
}
