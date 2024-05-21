import { Client, Databases, Storage } from "appwrite";

export const client = new Client();

client
  .setEndpoint(
    (import.meta as any).env.VITE_PROJECT_ENDPOINT ||
      "https://cloud.appwrite.io/v1"
  )
  .setProject((import.meta as any).env.VITE_PROJECT_ID || "");

export const database = new Databases(client);

export const storage = new Storage(client);
