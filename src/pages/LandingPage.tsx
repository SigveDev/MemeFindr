import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getTaggsFromSearch } from "../lib/appwrite/GetTaggsFromSearch";
import Tagg from "../types/Tagg";

const LandingPage = () => {
  const [query, setQuery] = React.useState<string>("");
  const [recomended, setRecomended] = React.useState<string[]>([]);
  const [canClickRecomended, setCanClickRecomended] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchRecomended = async () => {
      const response: Tagg[] = (await getTaggsFromSearch(query)) as Tagg[];
      if (response) {
        setRecomended(response.map((tag) => tag.Name));
      }
    };
    fetchRecomended();
  }, [query]);

  return (
    <div className="relative flex flex-col items-center justify-start bg-[#0b010d] w-dvw min-h-dvh h-fit">
      <div className="absolute h-full w-full bg-[radial-gradient(#161616_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="z-10 flex flex-col gap-6 mt-64 text-center">
        <div>
          <h1 className="text-4xl font-bold text-white">MemeFindr</h1>
          <p className="text-slate-400">The best place to find memes.</p>
        </div>
        <div className="relative flex flex-col h-fit w-fit">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for meme tags..."
            className="h-10 p-2 mr-12 bg-black border rounded-md text-slate-200 w-80 border-violet-950 focus:outline-none focus:border-violet-8"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/search?q=${query}`;
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
            href={`/search?q=${query}`}
          >
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </a>
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
                    setQuery(tag);
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
        <div>
          <h3 className="font-bold text-slate-300 text-md">Discover:</h3>
          <div className="flex flex-row gap-4 mx-auto w-fit">
            <a href="/popular" className="text-slate-600 hover:underline">
              Popular
            </a>
            <a href="/new" className="text-slate-600 hover:underline">
              New
            </a>
          </div>
        </div>
        <a
          className="flex items-center justify-center w-40 h-10 mx-auto mt-4 text-white no-underline bg-black border rounded-md border-violet-900 hover:bg-violet-900"
          href="/upload"
        >
          Upload
        </a>
      </div>

      <div className="absolute w-full text-sm text-center bottom-1 text-slate-800">
        <p>
          Made by{" "}
          <a href="https://github.com/SigveDev" className="underline">
            SigveDev
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
