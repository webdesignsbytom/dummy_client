import React, { useState } from 'react';
import ChatBot from './ChatBot'; // Assuming you put the ChatBot component in this file

function ChatBotComponent() {
  const [userform, setUserform] = useState({
    name: '',
    age: null,
  });
  console.log('userform', userform);
  const flow = {
    start: {
      message: 'Online',
      path: 'second',
    },
    second: {
      message: 'Hello there! What is your name?',
      function: (params) =>
        setUserform({ ...userform, name: params.userInput }),
      path: 'ask_age',
    },
    ask_age: {
      message: (params) =>
        `Nice to meet you ${params.userInput}, what is your age?`,
      function: (params) =>
        setUserform({ ...userform, age: params.userInput }),
      path: 'end',
    },
    end: {
      message: 'Thank you for your input!',
    },
  };

  return <ChatBot flow={flow} />;
}

export default ChatBotComponent;