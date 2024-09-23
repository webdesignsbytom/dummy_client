import React, { useEffect, useState } from 'react';
import { IoSendOutline } from 'react-icons/io5';
// Style
import { ChatWindow, InputStyle } from '../../utils/Styles';
import ChatBotHeader from './ChatBotHeader';

export const ChatBot = ({ flow, steps, setIsChatOpen }) => {
  const [currentStep, setCurrentStep] = useState(steps[0]); // Track the current step in the flow

  const [userInput, setUserInput] = useState(''); // Track user input fron text input

  const [conversation, setConversation] = useState([]); // Store conversation history

  console.log('currentStep', currentStep);

  // Get the current step from the flow
  const currentFlowStep = flow?.[currentStep];
  console.log('currentFlowStep', currentFlowStep);

  // Handle starup 
  useEffect(() => {}, [])
  // User input
  const handleSendInput = () => {
    console.log('currentFlowStep.path', currentFlowStep.path);
    setCurrentStep(currentFlowStep.path)
  };

  // useEffect(() => {
  //   // Load initial messages and handle function-based messages
  //   const botMessage =
  //     typeof currentFlowStep.message === 'function'
  //       ? currentFlowStep.message({ userInput }) // Call function if message is a function
  //       : currentFlowStep.message;
  //   setConversation([...conversation, { owner: BotName, message: botMessage }]);
  // }, [currentStep]); // Make sure it updates whenever the current step changes

  // // Handle sending user input
  // const handleSendInput = () => {
  //   console.log('-- IN --');
  //   console.log('userInput', userInput);
  //   // Add current bot message and user input to the conversation
  //   setConversation([...conversation, { owner: 'you', message: userInput }]);
  //   // Call the function associated with the current step if it exists
  //   if (currentFlowStep?.function) {
  //     currentFlowStep.function({ userInput });
  //   }
  //   // Move to the next step in the flow if a path is provided
  //   if (currentFlowStep?.path) {
  //     setCurrentStep(currentFlowStep.path);
  //   }
  //   // Clear the input field after the message is sent
  //   setUserInput('');
  // };

  return (
    <section className={ChatWindow}>
      <div className='grid grid-rows-a1a h-full overflow-hidden'>
        {/* Header */}
        <ChatBotHeader setIsChatOpen={setIsChatOpen} />

        {/* Conversation container */}
        <section className='grid h-full max-h-full overflow-hidden bg-red-300'>
          <section className='grid max-h-full overflow-y-auto bg-blue-400'>

            <div className='grid h-fit max-h-full'>
              {/* Render the conversation */}
              <div>
                <p>{typeof currentFlowStep.message === 'function' ? console.log('AAAAA') : currentFlowStep.message}</p>
              </div>
              {conversation.map((chat, index) => (
                <div key={index} className='grid h-fit px-1 py-1'>
                  <p>
                    <strong className='capitalize'>{chat.owner}:</strong>{' '}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* User inputs container */}
        <section className='grid items-center h-fit overflow-hidden'>
          <div className='grid grid-cols-rev gap-2 py-1 px-2'>
            <input
              type='text'
              className={InputStyle}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='Type your message...'
            />
            {/* Send button */}
            <div className=''>
              <button
                onClick={handleSendInput}
                className='bg-slate-200 text-orange-600'
              >
                <IoSendOutline size={30} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ChatBot;
