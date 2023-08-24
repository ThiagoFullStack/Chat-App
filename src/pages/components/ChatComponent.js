import { useState, useEffect } from "react";
import {FaComment} from 'react-icons/fa'
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // criação de uma instancia do Socket.io conectada ao servidor

const ChatComponent = () => {
  const [messages, setMessages] = useState([]); // estado para armazenar as mensagens exibidas no chat
  const [inputMessage, setInputMessage] = useState(""); // estado para armazenar a mensagem digitada pelo usuario

  useEffect(() => {
    // Efeito para escutar o evento 'chat message' envidado pelo servidor e atualizar o estado 'message
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = async (message) => {
    if (inputMessage.trim() !== "") {
      try {
        await fetch("http://localhost:3001/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputMessage }),
        });
        setMessages(state => [...state, inputMessage])
        setInputMessage("");
      } catch (error) {
        console.log("Error sending message:", error);
      }
    }
  };
  
  return (
    <div className="container">
      <ul>
        {messages.map((message, index) => (
          <li key={index} className={index % 2 === 0 ? 'right' : 'left'}>
            <FaComment /> - {message}
          </li>
        ))}
      </ul>
      <hr />
     <div className="chatForm">
     <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Enviar</button>
     </div>
    </div>
  );
  
};

export default ChatComponent;
