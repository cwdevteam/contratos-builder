"use client"

import { NextResponse } from "next/server";
import { useState } from "react";

export default function Test(){
    //const message = "If I sample a song in my song, do I need to report this?";
    const [message, setMessage] = useState("");
    const [agentAnswer, setAgentAnswer] = useState("");

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
      };

    const askAgent = async (message: string) => {
        try {
            const response = await fetch('http://localhost:3000/en/api/pineconeAgent', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: message }),
            });
            const data = await response.json();
            console.log(data.message.content);
            setAgentAnswer(data.message.content);
            } catch (error) {
                console.error("Error with agent:", error);
                return NextResponse.json(
                    { error: "Error with agent" },
                    { status: 500 }
                );
                }
            };
            const handleAgentButton = () => {
                setAgentAnswer("generating answer...")
                askAgent(message);
              };

    return (
        <div className=" p-4 sm:p-8 flex flex-col justify-between">
            <label className="text-[.5rem] sm:text-sm block font-share">
                Ask our helpful agent something:
              </label>
              <input
                type="text"
                placeholder="What is an ipi number?"
                value={message}
                onChange={handleInputChange}
                className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full p-2 font-rubik"
                required
              />

            <button
              onClick={handleAgentButton}
              className=" text-white py-2 px-4 rounded  transition-colors font-rubik py-1 button-height"
            >
              Ask
            </button>
            {agentAnswer}
        </div>
      );

}