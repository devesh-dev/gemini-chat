"use client";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "dotenv/config";

const page = () => {
  const [error, setError] = useState();
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  // const [chatHistory, setChatHistory] = useState([]);

  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const CONTENT = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };
  const HEADER = {
    "Content-Type": "application/json",
  };

  const surpriseOptions = ["good", "bad", "neutral"];
  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setPrompt(randomValue);
  };

  const clear = () => {
    toast.success("cleared");
    setPrompt("");
  };

  const generateBtn = async () => {
    try {
      toast.success("Searching....");
      const response = await axios.post(API_URL + API_KEY, CONTENT, {
        headers: HEADER,
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="app">
        <Toaster />
        <h1>Cognito</h1>
        <p className="tagline">Get smarter answers, faster.</p>
        <p>
          What do you want ?
          <button className="surprise" onClick={surprise}>
            Surprise Me
          </button>
        </p>

        <div className="input-container">
          <input
            type="text"
            value={prompt}
            placeholder="Ask me anything ?"
            onChange={(e) => setPrompt(e.target.value)}
          />
          {!error && (
            <button className="search-button" onClick={generateBtn}>
              ➡️
            </button>
          )}
          {!error && (
            <button className="clear-button" onClick={clear}>
              ❌
            </button>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        <div className="search-result">
          <div key={""}>
            <p className="answer">{answer}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
