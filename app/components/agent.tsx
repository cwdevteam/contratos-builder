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
                if(message==''){
                    document.getElementById("noMessage")!.innerText = "Enter a question";
                }else{
                    setAgentAnswer("generating answer...")
                }
                
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
                <iframe
                    src="https://www.chatbase.co/chatbot-iframe/3pO14yLU-QxsoZ9ZTRXmW"
                    width="100%"
                    height="100%"
                ></iframe>
                </div>

            </Popup>
        )}
        </div>
    );

}