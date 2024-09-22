import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Assuming you put the ChatBot component in this file
import ChatBotButton from './ChatBotButton'; // Assuming you put the ChatBot component in this file

function ChatBotComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Track if the chat window is open
  const [userform, setUserform] = useState({
    requestTypes: null,
    name: '',
    age: null,
  });

  const steps = ['start', 'ask_age', 'end'];

  const requestTypes = ['project', 'contact', 'gallery', 'help'];

  const flow = {
    start: {
      message: 'Hello there! What is your name?',
      function: (params) => {
        console.log('START FUNCTION >>>', params);
        setUserform({ ...userform, name: params.userInput });
      },
      path: 'ask_age',
    },
    ask_age: {
      message: (params) =>
        `Nice to meet you ${params.userInput}, what is your age?`,
      function: (params) => {
        console.log('AGE FUNCTION >>>');
        setUserform({ ...userform, age: params.userInput });
      },
      path: 'end',
    },
    end: {
      message: 'Thank you for your input!',
    },
  };

  return (
    <>
      {isChatOpen ? (
        <ChatBot flow={flow} steps={steps} setIsChatOpen={setIsChatOpen} />
      ) : (
        <ChatBotButton setIsChatOpen={setIsChatOpen} />
      )}
    </>
  );
}

export default ChatBotComponent;
