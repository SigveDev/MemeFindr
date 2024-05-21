import Tagg from "./Tagg";

type FileIndex = {
  $id: string;
  $createdAt: Date;
  $updatedAt: Date;
  FileID: string;
  Name: string;
  Stars: number;
  ShowUploader: boolean;
  Uploader: string;
  Taggs: Tagg[];
};

export default FileIndex;
