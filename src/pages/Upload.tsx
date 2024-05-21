import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDropzone } from "react-dropzone";
import { getTaggsFromSearch } from "../lib/appwrite/GetTaggsFromSearch";
import Tagg from "../types/Tagg";

const Upload = () => {
  const [newFile, setNewFile] = React.useState<File>();
  const [tempFile, setTempFile] = React.useState<URL>();

  const [title, setTitle] = React.useState<string>("");
  const [taggs, setTaggs] = React.useState<string[]>([]);

  const [query, setQuery] = React.useState<string>("");
  const [recomended, setRecomended] = React.useState<string[]>([]);
  const [canClickRecomended, setCanClickRecomended] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchRecomended = async () => {
      const response: Tagg[] = (await getTaggsFromSearch(query)) as Tagg[];
      if (response) {
        setRecomended(
          response
            .map((tag) => tag.Name)
            .filter((name) => !taggs.includes(name))
        );
      }
    };
    fetchRecomended();
  }, [query]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "image/JPG": [],
      "image/JPEG": [],
      "image/PNG": [],
      "image/gif": [],
    },
    maxSize: 5368709120,
    maxFiles: 1,
    onDrop: (acceptedFile) => {
      setNewFile(acceptedFile[0]);
      setTempFile(URL.createObjectURL(acceptedFile[0]) as unknown as URL);
    },
  });

  return (
    <div className="relative flex flex-col items-center justify-start bg-[#0b010d] w-dvw min-h-dvh h-fit">
      <div className="absolute h-full w-full bg-[radial-gradient(#161616_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <a
        className="absolute z-20 flex flex-col items-start justify-center h-10 left-2 top-4"
        href="/"
      >
        <h1 className="text-2xl font-bold text-white">MemeFindr</h1>
      </a>

      <div className="absolute top-0 left-0 flex flex-col items-center justify-center pt-16 w-dvw h-dvh">
        <div className="flex flex-row w-2/3 gap-4 h-fit min-h-96">
          {newFile === undefined ? (
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center w-1/2 bg-transparent border border-dashed rounded-lg cursor-pointer h-96 border-violet-900"
            >
              <input {...getInputProps()} />
              <p className="text-center text-white">
                Drag and drop files here, or click to select files
              </p>
            </div>
          ) : (
            <>
              {tempFile && (
                <img
                  src={tempFile.toString()}
                  alt="Preview"
                  className="w-1/2 my-auto rounded-lg cursor-pointer h-fit"
                  onClick={() => {
                    setNewFile(undefined);
                    setTempFile(undefined);
                  }}
                />
              )}
            </>
          )}
          <div className="flex flex-col w-1/2 h-full gap-2">
            <input
              type="text"
              placeholder="Title"
              className="w-full h-12 p-4 text-white bg-black border rounded-lg border-violet-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex flex-col w-full gap-2 grow">
              <div className="relative w-full h-full ">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for meme tags..."
                  className="w-full h-10 p-2 bg-black border rounded-md text-slate-200 border-violet-950 focus:outline-none focus:border-violet-8"
                  onFocus={() => {
                    setCanClickRecomended(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setCanClickRecomended(false);
                    }, 100);
                  }}
                />
                {recomended.length > 0 && query.length > 0 && (
                  <div
                    className={`absolute left-0 flex flex-col items-start justify-start ${
                      canClickRecomended ? "visible" : "invisible"
                    } w-full gap-2 p-2 bg-black border rounded-md top-11 border-violet-950`}
                  >
                    {recomended.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          console.log("clicked");
                          setQuery("");
                          setTaggs([...taggs, tag]);
                        }}
                        className="flex flex-row items-center justify-start w-full gap-1 p-1 pl-2 rounded-md text-slate-300 hover:bg-white/5"
                      >
                        <FontAwesomeIcon icon={faSearch} size="xs" />
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex flex-row flex-wrap w-full gap-2 mt-2 grow">
                  {taggs.map((tagg) => (
                    <button
                      key={tagg}
                      className="h-4 px-2 text-xs font-bold text-black rounded-full cursor-pointer bg-slate-400 w-fit hover:bg-slate-500 hover:text-white"
                      onClick={() => {
                        setTaggs(taggs.filter((tag) => tag !== tagg));
                      }}
                    >
                      {tagg.toLocaleUpperCase()}
                      <FontAwesomeIcon icon={faX} size="xs" className="ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="w-full h-12 text-white rounded-lg bg-violet-900">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
