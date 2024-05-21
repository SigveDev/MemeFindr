import React from "react";
import { getFileViewFromID } from "../lib/appwrite/GetFileFromMemesBucket";
import FileIndex from "../types/FileIndex";
import ImageSkeleton from "./ImageSkeleton";

const FileView = ({ file }: { file: FileIndex }) => {
  const [filePreview, setFilePreview] = React.useState<URL>();

  React.useEffect(() => {
    const fetchFilePreview = async () => {
      const preview: URL = (await getFileViewFromID(file.FileID)) as URL;
      setFilePreview(preview);
    };
    fetchFilePreview();
  }, [file.FileID]);

  return (
    <div className="relative w-full no-underline h-fit group/file-preview">
      {filePreview ? (
        <img
          src={filePreview.href}
          alt={file.Name}
          className="w-full rounded-lg"
        />
      ) : (
        <ImageSkeleton />
      )}
    </div>
  );
};

export default FileView;
