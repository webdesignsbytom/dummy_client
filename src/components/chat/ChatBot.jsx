import React, { useState } from 'react';
import { IoSendOutline } from 'react-icons/io5';
// Style
import { ChatWindow, InputStyle } from '../../utils/Styles';
import ChatBotHeader from './ChatBotHeader';

export const ChatBot = ({ flow, steps, setIsChatOpen }) => {
  const [currentStep, setCurrentStep] = useState(steps[0]); // Track the current step in the flow
  const [userInput, setUserInput] = useState(''); // Track user input from text input
  const [messages, setMessages] = useState([]); // Store chat messages

  console.log('currentStep', currentStep);

  // Get the current step from the flow
  const currentFlowStep = flow?.[currentStep];
  console.log('currentFlowStep', currentFlowStep);

  // User input
  const handleSendInput = () => {
    const params = { userInput };

    // Call the function for the current step, passing the params
    if (currentFlowStep.function) {
      currentFlowStep.function(params);  // Call the function associated with the current step
    }

    // Prepare the next step
    const nextFlowStep = flow?.[currentFlowStep.path];
    console.log('nextFlowStep', nextFlowStep);

    if (nextFlowStep) {
      // Add the current step's message to the chat
      const nextMessage =
        typeof currentFlowStep.message === 'function'
          ? currentFlowStep.message(params)  // Call the message function with params
          : currentFlowStep.message;
      setMessages([...messages, nextMessage]);

      // Transition to the next step
      setCurrentStep(currentFlowStep.path);
    }

    setUserInput('');  // Clear the user input after submission
  };

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
              {messages.map((msg, index) => (
                <div key={index}>
                  <p>{msg}</p>
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
