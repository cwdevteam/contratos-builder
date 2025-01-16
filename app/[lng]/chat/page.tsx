// pages/chat.tsx
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit } from "@coinbase/cdp-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { useState, useEffect } from "react";

dotenv.config();

const WALLET_DATA_FILE = "wallet_data.txt";

const ChatPage = () => {
  // eslint-disable-next-line
  const [agent, setAgent] = useState<any>(null);
  // eslint-disable-next-line
  const [messages, setMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const initialize = async () => {
      try {
        const { agent } = await initializeAgent();
        setAgent(agent);
      } catch (error) {
        console.error("Failed to initialize agent:", error);
      }
    };
    initialize();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userInput.trim() !== "") {
      setMessages([...messages, { role: "user", content: userInput }]);
      setUserInput("");

      if (agent) {
        const stream = await agent.stream({
          messages: [new HumanMessage(userInput)],
        });
        for await (const chunk of stream) {
          if ("agent" in chunk) {
            setMessages([
              ...messages,
              { role: "assistant", content: chunk.agent.messages[0].content },
            ]);
          }
        }
      }
    }
  };

  const initializeAgent = async () => {
    try {
      // Initialize LLM with xAI configuration
      const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        apiKey: process.env.OPENAI_API_KEY,
      });

      let walletDataStr: string | null = null;

      //so a new wallet is created each time
      fs.unlinkSync(WALLET_DATA_FILE);

      // Read existing wallet data if available
      if (fs.existsSync(WALLET_DATA_FILE)) {
        try {
          walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
        } catch (error) {
          console.error("Error reading wallet data:", error);
          // Continue without wallet data
        }
      }

      // Configure CDP Agentkit
      const config = {
        cdpWalletData: walletDataStr || undefined,
        networkId: process.env.NETWORK_ID || "base-sepolia",
      };

      // Initialize CDP agentkit
      const agentkit = await CdpAgentkit.configureWithWallet(config);

      // Initialize CDP Agentkit Toolkit and get tools
      const cdpToolkit = new CdpToolkit(agentkit);
      const tools = cdpToolkit.getTools();

      // Store buffered conversation history in memory
      const memory = new MemorySaver();
      const agentConfig = {
        configurable: { thread_id: "CDP Agentkit Chatbot Example!" },
      };

      // Create React Agent using the LLM and CDP Agentkit tools
      const agent = createReactAgent({
        llm,
        tools,
        checkpointSaver: memory,
        messageModifier:
          "You are a helpful agent that can interact onchain using the Coinbase Developer Platform Agentkit. You are empowered to interact onchain using your tools. If you ever need funds, you can request them from the faucet if you are on network ID `base-sepolia`. If not, you can provide your wallet details and request funds from the user. If someone asks you to do something you can't do with your currently available tools, you must say so, and encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to docs.cdp.coinbase.com for more informaton. Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.",
      });

      // Save wallet data
      const exportedWallet = await agentkit.exportWallet();
      fs.writeFileSync(WALLET_DATA_FILE, exportedWallet);

      return { agent, config: agentConfig };
    } catch (error) {
      console.error("Failed to initialize agent:", error);
      throw error; // Re-throw to be handled by caller
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div>
        {messages.map(
          (
            message: any, // eslint-disable-line
            index: number
          ) => (
            <div key={index}>
              <strong>{message.role}:</strong> {message.content}
            </div>
          )
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
