import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Assuming you put the ChatBot component in this file

function ChatBotComponent() {
  const [userform, setUserform] = useState({
    requestTypes: null,
    name: '',
    age: null,
  });

  console.log('CHATBOT');

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

  return <ChatBot flow={flow} />;
}

export default ChatBotComponent;
