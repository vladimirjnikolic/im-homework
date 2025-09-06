import { IFileProcessing } from "./IFileProcessing";

export interface IUpload {
  uploadId: string;
  size: string;
  files: IFileProcessing[];
}
