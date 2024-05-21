import FileIndexResponse from "../../types/responseTypes/FileIndexResponse";
import { database } from "./ClientConnection";
import { Query } from "appwrite";

export const getFilesFromSearch = async (query: string) => {
  try {
    const searchResults: FileIndexResponse = (await database.listDocuments(
      (import.meta as any).env.VITE_MAIN_DB_ID || "",
      (import.meta as any).env.VITE_FILEINDEXING_COLLECTION_ID || "",
      [Query.search("Name", query)]
    )) as unknown as FileIndexResponse;
    if (searchResults.documents) {
      return searchResults.documents;
    }
  } catch (error) {
    console.error(error);
  }
};
