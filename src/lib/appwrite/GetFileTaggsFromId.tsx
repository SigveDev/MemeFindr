import FileIndex from "../../types/FileIndex";
import { database } from "./ClientConnection";

export const getFileTaggsFromId = async (id: string) => {
  try {
    const results: FileIndex = (await database.getDocument(
      (import.meta as any).env.VITE_MAIN_DB_ID || "",
      (import.meta as any).env.VITE_FILEINDEXING_COLLECTION_ID || "",
      id
    )) as unknown as FileIndex;
    const taggs = results.Taggs;
    return taggs;
  } catch (error) {
    console.error(error);
  }
};
