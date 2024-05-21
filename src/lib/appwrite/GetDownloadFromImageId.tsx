import { storage } from "./ClientConnection";

export const getDownloadFromImageId = async (FileId: string) => {
  try {
    const file = storage.getFileDownload(
      (import.meta as any).env.VITE_MEMES_BUCKET_ID || "",
      FileId
    );
    return file;
  } catch (error) {
    console.error(error);
  }
};
