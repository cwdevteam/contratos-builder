"use client"

import { NextResponse } from "next/server";
import { useState } from "react";
import Popup from "reactjs-popup";

export default function Agent(){
    //const message = "If I sample a song in my song, do I need to report this?";
    const [message, setMessage] = useState("");
    const [agentAnswer, setAgentAnswer] = useState("");
    const [isOpen, setIsOpen] = useState(false);

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
      };

    const askAgent = async (message: string) => {
        try {
            const response = await fetch('https://contract-builder-git-agent-mesa.vercel.app/en/api/pineconeAgent', {
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
        <div>
        {!isOpen && (
                <Popup
                trigger={
                    <button className="font-share absolute right-0 bottom-0">
                    ?
                    </button>
                }
                position="bottom right"
                modal
                nested
                className=""
                closeOnDocumentClick
                >
                    <div
                        className="modal border-2 border-white"
                        style={{
                        height: "80vh",
                        width: "90vw",
                        maxWidth: "600px",
                        overflowY: "scroll",
                        }}
                    >
                <div className=" p-4 sm:p-8 flex flex-col justify-between">
                    <label className="text-[.5rem] sm:text-sm block font-share">
                        If confused, ask your music AI agent:
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
                <button
                    onClick={() => {
                    setIsOpen(true);
                    setTimeout(() => {
                        setIsOpen(false);
                    }, 200);
                    }}
                    className="popup_button text-white hover:text-gray-300"
                >
                    &times;
              </button>
                </div>
            </Popup>
        )}
        </div>
    );

}