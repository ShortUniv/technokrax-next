

'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleIcon from '@mui/icons-material/People';
import StyleIcon from "@mui/icons-material/Style";
const SearchBar = ({ SearchBar }: any) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState({
    topResults: [],
    recentResults: [],
    popularResults: [],
    categories: [],
    users: []
  });
  const searchInputRef = useRef<any>(null);

  useEffect(() => {
    if (SearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [SearchBar]);

  const fetchSuggestions = async (input: any) => {
    try {
      const response = await axios.get(
        // `http://localhost:5001/nodejs-aws-lambda/server/api/articles/suggestions?input=${input}`
        `https://kpp1td2yze.execute-api.us-west-2.amazonaws.com/dev/nodejs-aws-lambda/server/api/articles/suggestions?input=${input}`
      );

      console.log("suggestions:", response.data);

      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedFetchSuggestions = debounce((input) => {
    fetchSuggestions(input);
  }, 200);

  const handleInputChange = (event: any) => {
    const inputText = event.target.value;
    setSearchInput(inputText);
    debouncedFetchSuggestions(inputText);
  };

  const highlightText = (text: any, highlight: any) => {
    if (!text) return "";

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part: any, index: any) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const renderSuggestions = (results: any[], title: string, IconComponent: any, isUser: boolean = false) => (
    <ul className="py-2">
      <li className="px-4 py-2 text-md text-gray-900 font-semibold items-center">
        <span className="pt-[2px]">{title}</span>
        <span className="px-3 w-5 h-5">
          <IconComponent />
        </span>
      </li>
      {results.map((suggestion: any, index: number) => (
        <Link
          href={isUser ? `/profile/${suggestion.userId}` : (suggestion.index === "refer_articles" ? suggestion.link : `/articles/${suggestion.tagId}`)}
          key={index}
          target={suggestion.index === "refer_articles" ? "_blank" : "_self"}
          rel={suggestion.index === "refer_articles" ? "noopener noreferrer" : ""}
        >
          <div className="flex justify-between items-center my-1 hover:bg-gray-100 py-1">
            <li className="px-4 py-2 text-sm cursor-pointer flex justify-between">
              {isUser ? highlightText(suggestion.name, searchInput) : highlightText(suggestion.title, searchInput)}
            </li>
            {suggestion.index === "refer_articles" && (
              <span className="px-4 py-0 bg-gray-200 rounded-xl text-xs flex items-center justify-center mx-2 h-[1.7rem]">
                Referred
              </span>
            )}
          </div>
        </Link>
      ))}
    </ul>
  );

  return (
    <div className={`relative ${!SearchBar && "hidden"} origin-left duration-300`}>
      <div className="absolute right-2 md:right-[6%] 2xl:right-56 top-3 z-30 2xl:w-[40vw] flex">
        <input
          ref={searchInputRef}
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          className="pl-4 py-2 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 w-[90vw] md:w-[70vw] xl:w-[40vw] lg:w-[50vw] lg:right-[20%] text-sm text-gray-900"
          placeholder="Search..."
          autoFocus
        />
        <button
          type="submit"
          className="text-white absolute right-0 top-[1px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      <div className="origin-top-right z-30 absolute md:w-[70vw] md:right-[6%] lg:w-[50vw] w-[90vw] xl:w-[40vw] top-11 2xl:w-[40vw] mt-2 2xl:right-56 right-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <ul className="divide-y divide-gray-200">
          {suggestions.topResults.length > 0 && renderSuggestions(suggestions.topResults, "Top Results", StarIcon)}
          {suggestions.recentResults.length > 0 && renderSuggestions(suggestions.recentResults, "Recent", AccessTimeIcon)}
          {suggestions.popularResults.length > 0 && renderSuggestions(suggestions.popularResults, "Popular", LocalFireDepartmentIcon)}
          {suggestions.users.length > 0 && renderSuggestions(suggestions.users, "People", PeopleIcon, true)}
          {suggestions.categories.length > 0 && (
            <ul className="py-2">
              <li className="px-4 py-2 text-md text-gray-900 font-semibold">
                <span className="pt-[2px]">Topics</span>
                <span className="px-3 w-5 h-5">
                  <StyleIcon />
                </span>
              </li>
              {suggestions.categories.map((category: any, index: number) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between"
                >
                  <span>{highlightText(category.category, searchInput)}</span>
                  <span className="px-4 py-1 bg-gray-200 rounded-xl text-xs">
                    Topic
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
