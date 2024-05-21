import TaggResponse from "../../types/responseTypes/TaggResponse";
import { database } from "./ClientConnection";
import { Query } from "appwrite";

export const getTaggsFromSearch = async (query: string) => {
  try {
    const searchResults: TaggResponse = (await database.listDocuments(
      (import.meta as any).env.VITE_MAIN_DB_ID || "",
      (import.meta as any).env.VITE_TAGGS_COLLECTION_ID || "",
      [Query.search("Name", query)]
    )) as unknown as TaggResponse;
    if (searchResults.documents) {
      return searchResults.documents;
    }
  } catch (error) {
    console.error(error);
  }
};
