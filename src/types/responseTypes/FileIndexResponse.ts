import FileIndex from "../FileIndex";

type FileIndexResponse = {
  documents: FileIndex[];
  total: number;
};

export default FileIndexResponse;
