import React from "react";
import { getFileFromId } from "../lib/appwrite/GetFileFromId";
import FileIndex from "../types/FileIndex";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tagg from "../types/Tagg";
import { getTaggsFromSearch } from "../lib/appwrite/GetTaggsFromSearch";
import FileView from "../components/FileView";
import { getDownloadFromImageId } from "../lib/appwrite/GetDownloadFromImageId";
import { getFileViewFromID } from "../lib/appwrite/GetFileFromMemesBucket";

const View = () => {
  const [file, setFile] = React.useState<FileIndex>();
  const [fileURL, setFileURL] = React.useState<URL>();
  const [downloadURL, setDownloadURL] = React.useState<URL>();
  const [inputQuery, setInputQuery] = React.useState<string>("");
  const [recomended, setRecomended] = React.useState<string[]>([]);
  const [canClickRecomended, setCanClickRecomended] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("q");
    if (id) {
      getFileFromId(id).then((result) => {
        setFile(result);
      });
    }
  }, []);

  React.useEffect(() => {
    const fetchFilePreview = async () => {
      if (file) {
        const preview: URL = (await getFileViewFromID(file.FileID)) as URL;
        setFileURL(preview);
        const result: URL = (await getDownloadFromImageId(file.FileID)) as URL;
        setDownloadURL(result);
      }
    };
    fetchFilePreview();
  }, [file]);

  React.useEffect(() => {
    const fetchRecomended = async () => {
      const response: Tagg[] = (await getTaggsFromSearch(inputQuery)) as Tagg[];
      if (response) {
        setRecomended(response.map((tag) => tag.Name));
      }
    };
    fetchRecomended();
  }, [inputQuery]);

  return (
    <div className="relative flex flex-col items-center justify-start bg-[#0b010d] w-dvw min-h-dvh h-fit">
      <div className="absolute h-full w-full bg-[radial-gradient(#161616_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <a
        className="absolute z-20 flex flex-col items-start justify-center h-10 left-2 top-4"
        href="/"
      >
        <h1 className="text-2xl font-bold text-white">MemeFindr</h1>
      </a>

      <a
        className="absolute z-20 flex items-center justify-center w-24 h-10 mx-auto text-white no-underline bg-black border rounded-md top-4 right-2 border-violet-900 hover:bg-violet-900"
        href="/upload"
      >
        Upload
      </a>

      <div className="relative z-10 flex flex-col mt-4 h-fit w-fit">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Search for meme tags..."
          className="h-10 p-2 mr-12 bg-black border rounded-md text-slate-200 w-80 border-violet-950 focus:outline-none focus:border-violet-8"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = `/search?q=${inputQuery}`;
            }
          }}
          onFocus={() => {
            setCanClickRecomended(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setCanClickRecomended(false);
            }, 100);
          }}
        />
        <a
          className="absolute top-0 right-0 flex items-center justify-center h-10 bg-black border rounded-md text-slate-200 aspect-square border-violet-950 hover:bg-violet-950"
          href={`/search?q=${inputQuery}`}
        >
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </a>
        {recomended.length > 0 && inputQuery.length > 0 && (
          <div
            className={`absolute left-0 flex flex-col items-start justify-start ${
              canClickRecomended ? "visible" : "invisible"
            } w-full gap-2 p-2 bg-black border rounded-md top-11 border-violet-950 z-20`}
          >
            {recomended.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  console.log("clicked");
                  setInputQuery(tag);
                  window.location.href = `/search?q=${tag}`;
                }}
                className="flex flex-row items-center justify-start w-full gap-1 p-1 pl-2 rounded-md text-slate-300 hover:bg-white/5"
              >
                <FontAwesomeIcon icon={faSearch} size="xs" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {file ? (
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center pt-16 w-dvw h-dvh">
          <div className="flex flex-row w-2/3 gap-4 h-fit">
            <FileView file={file} />
            <div className="flex flex-col w-2/3 h-full gap-2">
              <h1 className="text-3xl font-bold text-white">{file.Name}</h1>
              <div className="flex flex-row flex-wrap w-full gap-2 grow">
                {file.Taggs.map((tagg) => (
                  <p
                    key={tagg.$id}
                    className="h-4 px-2 text-xs font-bold text-black rounded-full bg-slate-400 w-fit"
                  >
                    {tagg.Name.toLocaleUpperCase()}
                  </p>
                ))}
              </div>
              <div className="flex flex-row w-full h-12 gap-4 mt-auto">
                <a
                  className="flex flex-col items-center justify-center w-full text-white bg-black border rounded-lg border-violet-900"
                  href={downloadURL?.href}
                  target="_blank"
                >
                  Download
                </a>
                <button
                  className="w-full text-white rounded-lg bg-violet-900"
                  onClick={() => {
                    if (fileURL) {
                      navigator.clipboard.writeText(fileURL.href);
                    }
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default View;
