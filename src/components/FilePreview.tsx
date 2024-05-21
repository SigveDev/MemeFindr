import React from "react";
import { getFilePreviewFromID } from "../lib/appwrite/GetFileFromMemesBucket";
import FileIndex from "../types/FileIndex";
import ImageSkeleton from "./ImageSkeleton";
import Tagg from "../types/Tagg";
import { getFileTaggsFromId } from "../lib/appwrite/GetFileTaggsFromId";

const FilePreview = ({ file, tagg }: { file: FileIndex; tagg: Tagg }) => {
  const [filePreview, setFilePreview] = React.useState<URL>();
  const [taggs, setTaggs] = React.useState<Tagg[]>([]);

  React.useEffect(() => {
    const fetchFilePreview = async () => {
      const preview: URL = (await getFilePreviewFromID(file.FileID)) as URL;
      setFilePreview(preview);
    };
    fetchFilePreview();
  }, [file.FileID]);

  React.useEffect(() => {
    const getTaggs = async () => {
      const taggs: Tagg[] = (await getFileTaggsFromId(
        file.$id
      )) as unknown as Tagg[];
      setTaggs(taggs);
    };
    getTaggs();
  }, [file]);

  return (
    <a
      className="relative w-full no-underline h-fit group/file-preview"
      href={`/view?q=${file.$id}`}
    >
      {filePreview ? (
        <img
          src={filePreview.href}
          alt={file.Name}
          className="w-full rounded-lg"
        />
      ) : (
        <ImageSkeleton />
      )}
      {filePreview && (
        <div className="absolute bottom-0 left-0 flex-col w-full h-1/4 bg-gradient-to-t from-black/90 via-black/50 via-75% to-transparent hidden group-hover/file-preview:flex justify-center items-start">
          <p className="ml-2 text-lg font-bold text-slate-200">{file.Name}</p>
          <div className="flex flex-row mx-2 mb-1 overflow-hidden w-[calc(100%_-_1rem)] gap-1 h-4">
            <p className="h-4 px-2 text-xs font-bold text-white bg-purple-700 rounded-full w-fit">
              {tagg.Name.toLocaleUpperCase()}
            </p>
            {taggs.map((tagg2: Tagg) => {
              if (tagg2.Name === tagg.Name || tagg2.Name === "Meme") {
                return null;
              }
              return (
                <p
                  key={tagg2.$id}
                  className="h-4 px-2 text-xs font-semibold text-black rounded-full opacity-70 bg-slate-400 py w-fit text-nowrap"
                >
                  {tagg2.Name.toLocaleUpperCase()}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </a>
  );
};

export default FilePreview;
