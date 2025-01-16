import { useEffect, useState } from "react";
import { HumanMessage } from "@langchain/core/messages";
import { initializeAgent, runChatMode } from "./chatbot";

const ChatComponent = () => {
  const [agent, setAgent] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { agent, config } = await initializeAgent();
        setAgent(agent);
        setConfig(config);
      } catch (error) {
        console.error("Failed to initialize agent:", error);
      }
    };
    init();
  }, []);

  const handleChat = async () => {
    try {
      if (agent && config) {
        await runChatMode(agent, config);
        const userInput = "Hello, please give me wallet details"; // Replace with user input
        const stream = await agent.stream(
          { messages: [new HumanMessage(userInput)] },
          config
        );
        // Process the response from the chatbot stream
        for await (const chunk of stream) {
          if ("agent" in chunk) {
            console.log(chunk.agent.messages[0].content);
          } else if ("tools" in chunk) {
            console.log(chunk.tools.messages[0].content);
          }
          // ... display the chatbot response in your UI
        }
      } else {
        console.error("Agent not initialized");
      }
    } catch (error) {
      console.error("Error during chat interaction:", error);
    }
  };

  return (
    <div>
      <button onClick={handleChat}>Chat with the Agent</button>
      {/* ... rest of your component */}
    </div>
  );
};

export default ChatComponent;
