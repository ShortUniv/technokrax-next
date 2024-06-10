'use client'
import { TiptapCollabProvider } from "@hocuspocus/provider";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import * as Y from "yjs";

import { BlockEditor } from "@/components/WriteArticle/components/BlockEditor";
import { createPortal } from "react-dom";
import { Surface } from "@/components/WriteArticle/components/ui/Surface";
import { Toolbar } from "@/components/WriteArticle/components/ui/Toolbar";
import { Icon } from "@/components/WriteArticle/components/ui/Icon";
import { customAlphabet } from "nanoid";
import { useDispatch } from "react-redux";
import { getToken } from "@/actions/HomePage";
import { useSearchParams } from "next/navigation";

const useDarkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(
    () => setIsDarkMode((isDark: any) => !isDark),
    []
  );
  const lightMode = useCallback(() => setIsDarkMode(false), []);
  const darkMode = useCallback(() => setIsDarkMode(true), []);

  return {
    isDarkMode,
    toggleDarkMode,
    lightMode,
    darkMode,
  };
};

export default function Document() {
  const { isDarkMode, darkMode, lightMode } = useDarkmode();
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();

  // const searchParams = new URLSearchParams(location?.search); // Parse search params
  // const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1;
  const searchParams = useSearchParams()

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1
  
  const getNanoId = (): string => {
    const nanoid = customAlphabet("6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz", 10);

    const roomId = nanoid();
    setRoom(roomId);
    return room;
  };

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      try {
        dispatch<any>(getToken());

        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE0NTYxMTN9.TWMhnHRqcB1BmER4zXF-eyebbeslIKs2JPvB-PiL6zA";

        setCollabToken(token);
        getNanoId();
      } catch (error) {
        console.error("Error fetching collaboration data:", error);
      }
    };

    dataFetch();
  }, []);

  const ydoc = useMemo(() => new Y.Doc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
    //   const {
    //     VITE_PUBLIC_COLLAB_DOC_PREFIX,
    //     VITE_PUBLIC_TIPTAP_COLLAB_APP_ID,
    //   } = import.meta.env;

      setProvider(
        new TiptapCollabProvider({
          name: `doc_${room}`,
          appId: "8mz0zl9x" ?? "",
          token: collabToken,
          document: ydoc,
        })
      );
    }
  }, [setProvider, collabToken, ydoc, room, hasCollab]);

  if (hasCollab && (!collabToken || !provider)) return null; // Assuming you want to render nothing

  const DarkModeSwitcher = createPortal(
    <Surface className="flex items-center gap-1 fixed bottom-6 right-6 z-[99999] p-1">
      <Toolbar.Button onClick={lightMode} active={!isDarkMode}>
        <Icon name="Sun" />
      </Toolbar.Button>
      <Toolbar.Button onClick={darkMode} active={isDarkMode}>
        <Icon name="Moon" />
      </Toolbar.Button>
    </Surface>,
    document.body
  );

  return (
    <>
      {DarkModeSwitcher}
      <BlockEditor hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
    </>
  );
}
