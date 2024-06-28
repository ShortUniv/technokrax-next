//@ts-nocheck
'use client'

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const Topup = ({ handlepopup, content }:any) => {
  const [iframeError, setIframeError] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById("contentIframe");

    const handleIframeError = () => {
      setIframeError(true);
      window.open(content, "_blank");
    };

    const handleIframeLoad = () => {
      try {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDocument) {
          throw new Error("iframe document is null");
        }
        setIframeError(false);
      } catch (e) {
        handleIframeError();
      }
    };

    iframe?.addEventListener("load", handleIframeLoad);
    iframe?.addEventListener("error", handleIframeError);

    const detectAdBlocker = () => {
      const adUrl =
        "https://ads.pubmatic.com/AdServer/js/pwt/158451/3767/pwt.js";
      fetch(adUrl, { method: "HEAD", mode: "no-cors" })
        .then(() => setAdBlockDetected(false))
        .catch(() => setAdBlockDetected(true));
    };

    detectAdBlocker();

    return () => {
      iframe?.removeEventListener("load", handleIframeLoad);
      iframe?.removeEventListener("error", handleIframeError);
    };
  }, [content]);

  return (
    <div>
      <div className="absolute top-2 right-3 justify-center">
        <button
          onClick={handlepopup}
          className="text-4xl hover:text-[#d56b01] text-gray-400"
        >
          <IoMdClose />
        </button>
      </div>
      <div>
        {adBlockDetected && (
          <div className="text-red-500 text-center mb-4">
            Some content may not load correctly due to ad blockers. Please
            disable your ad blocker for this site.
          </div>
        )}
        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden mt-10">
          {!iframeError ? (
            <iframe
              id="contentIframe"
              src={content}
              className="absolute top-0 left-0 w-full h-full border-0 pl-10 pr-10"
              title="Article"
            ></iframe>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center border-0 pl-10 pr-10 text-red-500">
              Failed to load content. Please disable your ad blocker and try
              again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topup;
