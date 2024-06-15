"use client"
import React, { useState, useEffect, useRef } from "react";
import SkeletonLoader from "./SkeletonLoader";
import "./Chatbot.css";
import Image from "next/image";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import logo from "../../assets/tut1.svg";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBkYpKLn3WGDRQn63CXbFOZPIZ9_tfuL10";

const Chattop = ({
  text,
  setChatText,
  chatOpen,
  setChatOpen,
  articleTitle,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([
    { text: "Hii, I am Rex, how can I assist you?", sender: "GEMINI" },
  ]);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedText("");
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(messages.length % 2 === 0);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString();
    if (!selectedText) return;

    setSelectedText(selectedText);
    const range = selection?.getRangeAt(0);
    if (!range) return;

    const rect = range.getBoundingClientRect();
    setMenuPosition({ top: rect.top, left: rect.left });
  };

  useEffect(() => {
    if (text) {
      sendMessage();
      setChatText("");
    }
  }, [text]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    let textToSend = text ? `${text} (related to: ${articleTitle})` : message;

    let textForChat = text ? text : message;

    setMessages([...messages, { text: textForChat, sender: "user" }]);
    setMessage("");

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });
    const result = await chat.sendMessage(textToSend);
    console.log("summary",result)

    let responseArray = result.response.text().split("**");
    // console.log("summary",responseArray)
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += `<b>${responseArray[i]}</b>`;
      }
    }

    let pattern = /\*/g;
    let replacement = "<br/><b>•</b> "; // Replacement string
    let newResponse2 = newResponse.replace(pattern, replacement);
    pattern = /(\r?\n\s*){2,}/g;
    replacement = "<br/>";

    newResponse2 = newResponse2.replace(pattern, replacement);
    pattern = /- <b>/g;
    replacement = "<br/> - <b> ";
    newResponse2 = newResponse2.replace(pattern, replacement);

    // Add the processed response to the message state
    setMessages([
      ...messages,
      { text: textForChat, sender: "user" },
      { text: newResponse2, sender: "gemini" },
    ]);

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div className="w-[40%]">
        <div className="fixed bottom-24 right-4 z-50">
          {chatOpen && (
            <div className="chat-window duration-300">
              <div className="chat-container rounded-3xl ml-10 mr-3 md:mr-10 border-[5px] border-[#1c55b8] bg-neutral-200">
                <div className="chat-content flex flex-col justify-between mt-10 overflow-y-scroll text-white h-[60vh]  2xl:w-[35vw] md:w-[60vw] w-[85vw] sm:w-[70vw] lg:w-[40vw] scrollable-container mb-20">
                  <div
                    className="chat-messages flex flex-col gap-4 pt-4 pl-8 pr-8 pb-4"
                    onMouseUp={handleTextSelection}
                  >
                    {messages.map((msg: any, index: number) => (
                      <div key={index}>
                        {msg.sender === "user" ? (
                          <div className="flex justify-end">
                            <p className="ml-16 bg-white text-gray-900 pl-4 pr-4 pt-2 pb-2 rounded-lg">
                              {msg.text}
                            </p>
                          </div>
                        ) : (
                          <div className="flex">
                            <div
                              className="bot-reply bg-white text-gray-900 font-light pl-4 pr-4 pt-2 pb-2 rounded-lg mr-16"
                              dangerouslySetInnerHTML={{ __html: msg.text }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                    {loading && <SkeletonLoader />}
                  </div>
                  <div className=" fixed bottom-24 w-[85vw]  sm:w-[70vw] md:w-[60vw]  lg:w-[40vw] 2xl:w-[35vw] input-container flex text-white bg-[#1c55b8] rounded-b-2xl pt-5 pb-2  pr-3 ">
                    <input
                      type="text"
                      value={message}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 outline-none text-black"
                    />
                    <button onClick={sendMessage} className="bg-white">
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {selectedText && (
                  <div
                    className="menu-bot fixed z-25"
                    style={{
                      top: menuPosition.top - 50,
                      left: menuPosition.left + 50,
                    }}
                  ></div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-3 md:right-10 z-20">
        <button
          onClick={() => {
            setChatOpen(!chatOpen);
          }}
          className="group cursor-pointer outline-none"
        >
          <div className="w-16 bg-[#f79c14] h-16 rounded-full flex justify-center items-center">
            {!chatOpen ? (
              <Image
                className="pl-[7px] pt-[8px] fill-black group-active:duration-0 duration-300 hover:scale-110"
                src={logo}
                alt="Chat Icon"
              />
            ) : (
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                className="stroke-gray-900 rotate-45 fill-none group-hover:fill-white group-hover:stroke-[#f79c14] group-active:stroke-[#b68d4f] group-active:[#d3180a] group-active:duration-0 duration-300"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  strokeWidth="1.5"
                ></path>
                <path d="M8 12H16" strokeWidth="1.5"></path>
                <path d="M12 16V8" strokeWidth="1.5"></path>
              </svg>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default Chattop;
