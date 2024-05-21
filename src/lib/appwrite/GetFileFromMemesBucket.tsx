import { storage } from "./ClientConnection";

export const getFilePreviewFromID = async (FileId: string) => {
  try {
    const file = storage.getFilePreview(
      (import.meta as any).env.VITE_MEMES_BUCKET_ID || "",
      FileId,
      0,
      0,
      undefined,
      50,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "webp"
    );
    return file;
  } catch (error) {
    console.error(error);
  }
};

export const getFileViewFromID = async (FileId: string) => {
  try {
    const file = storage.getFileView(
      (import.meta as any).env.VITE_MEMES_BUCKET_ID || "",
      FileId
    );
    return file;
  } catch (error) {
    console.error(error);
  }
};
