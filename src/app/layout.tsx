"use client";
import "./globals.css";
import "../styles/index.css";
import "../components/index.css";
// import "./editor.css";
import { Inter } from "next/font/google";
import {
  Alegreya,
  Aref_Ruqaa,
  Quintessential,
  Petrona,
} from "next/font/google";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducers from "../components/store";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const alegreya = Alegreya({ subsets: ["latin"], weight: ["400", "700"] });
const arefRuqaa = Aref_Ruqaa({ subsets: ["latin"], weight: ["400", "700"] });
const quintessential = Quintessential({ subsets: ["latin"], weight: ["400"] });
const petrona = Petrona({ subsets: ["latin"] });

// export const metadata = {
//   title: 'Technokrax',
//   description: 'Learning is fun when you learn the right way. Our platform combines AI-driven personalization to ensure that every learning journey is both fun and uniquely tailored to meet individual needs and preferences. So join us in revolutionizing the way we learn.',
// };

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quintessential&family=Petrona&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} ${alegreya.className} ${arefRuqaa.className} ${quintessential.className} ${petrona.className}`}
      >
        <Provider store={store}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
