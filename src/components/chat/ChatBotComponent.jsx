import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Assuming you put the ChatBot component in this file

function ChatBotComponent() {
  const [userform, setUserform] = useState({});

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      path: "ask_age",
    },
    ask_age: {
      message: (params) => `Nice to meet you ${params.userInput}, what is your age?`,
      path: "end",
    },
    end: {
      message: "Thank you for your input!",
    },
  };


  return <ChatBot flow={flow} />;
}

export default ChatBotComponent;
