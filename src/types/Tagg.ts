import FileIndex from "./FileIndex";

type Tagg = {
  $id: string;
  $createdAt: Date;
  $updatedAt: Date;
  Name: string;
  File: FileIndex[];
};

export default Tagg;
