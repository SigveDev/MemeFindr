import FileIndex from "../../types/FileIndex";
import { database } from "./ClientConnection";

export const getFileFromId = async (id: string) => {
  try {
    const result: FileIndex = (await database.getDocument(
      (import.meta as any).env.VITE_MAIN_DB_ID || "",
      (import.meta as any).env.VITE_FILEINDEXING_COLLECTION_ID || "",
      id
    )) as unknown as FileIndex;
    return result;
  } catch (error) {
    console.error(error);
  }
};
