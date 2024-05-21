import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilePreview from "../components/FilePreview";
import ImageSkeleton from "../components/ImageSkeleton";
import { getTaggsFromSearch } from "../lib/appwrite/GetTaggsFromSearch";
import Tagg from "../types/Tagg";

const Search = () => {
  const [inputQuery, setInputQuery] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>();
  const [searchResults, setSearchResults] = React.useState<Tagg[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const query = params.get("q") ?? "";
    setQuery(query);
    setInputQuery(query);
  }, []);
  const [recomended, setRecomended] = React.useState<string[]>([]);
  const [canClickRecomended, setCanClickRecomended] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      if (query === undefined) return;
      setLoading(true);
      const results: Tagg[] = (await getTaggsFromSearch(query)) as Tagg[];
      if (results.length === 0 || results === undefined) {
        setError("No results found");
        setSearchResults([]);
      } else {
        setError("");
        setSearchResults(results);
      }
      setLoading(false);
    };
    fetchSearchResults();
  }, [query]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", inputQuery);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, "", newUrl);
    setQuery(inputQuery);
  };

  React.useEffect(() => {
    const fetchRecomended = async () => {
      const response: Tagg[] = (await getTaggsFromSearch(inputQuery)) as Tagg[];
      if (response) {
        setRecomended(response.map((tag) => tag.Name));
      }
    };
    fetchRecomended();
  }, [inputQuery]);

  console.log(searchResults);
  console.log(error);

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

      {query !== undefined && (
        <div className="z-10 flex flex-col items-center justify-start w-dvw min-h-dvh">
          <div className="relative z-10 flex flex-col mt-4 h-fit w-fit">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for meme tags..."
              className="h-10 p-2 mr-12 bg-black border rounded-md text-slate-200 w-80 border-violet-950 focus:outline-none focus:border-violet-8"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
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
            <button
              className="absolute top-0 right-0 flex items-center justify-center h-10 bg-black border rounded-md text-slate-200 aspect-square border-violet-950 hover:bg-violet-950"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
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
          <div className="grid w-full grid-cols-2 gap-2 px-2 mt-8 lg:grid-cols-4 md:grid-cols-3 h-fit">
            {!loading ? (
              error === "" ? (
                searchResults.length > 0 &&
                searchResults[0].File.map((file) => (
                  <FilePreview
                    key={file.$id}
                    file={file}
                    tagg={searchResults[0]}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full col-span-4">
                  <img
                    src="/images/notfound.gif"
                    alt="Not Found"
                    className="rounded-lg w-96 h-72"
                  />
                  <h4 className="text-xl font-bold text-white">{error}</h4>
                </div>
              )
            ) : (
              <>
                <ImageSkeleton />
                <ImageSkeleton />
                <ImageSkeleton />
                <ImageSkeleton />
                <ImageSkeleton />
                <ImageSkeleton />
                <ImageSkeleton />
                <ImageSkeleton />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
