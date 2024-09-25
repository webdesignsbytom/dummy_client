import React, { useState } from 'react';
import ChatBot from './ChatBot';
import ChatBotButton from './ChatBotButton';

function ChatBotComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Track if the chat window is open
  const [userform, setUserform] = useState({
    requestTypes: null,
    name: '',
    age: null,
  });

  console.log('userform', userform);

  const steps = ['start', 'ask_age', 'end'];

  const flow = {
    start: {
      message: 'Hello there! What is your name?',
      function: (params) => {
        console.log('START FUNCTION >>>', params);
        setUserform((prevForm) => ({ ...prevForm, name: params.userInput }));  // Store the name in userform
      },
      path: 'ask_age',
    },
    ask_age: {
      // Using params to access the user input
      message: (params) => `Nice to meet you, ${params.userInput}! What is your age?`,
      function: (params) => {
        console.log('AGE FUNCTION >>>', params);
        setUserform((prevForm) => ({ ...prevForm, age: params.userInput }));  // Store the age in userform
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
