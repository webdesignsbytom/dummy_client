import React, { useEffect, useState } from 'react';
// Constants
import { BotName, CompanyName } from '../../utils/Constants';
// Icons
import { IoMdClose } from 'react-icons/io';
import { IoSendOutline } from 'react-icons/io5';
// Style
import { InputStyle } from '../../utils/Styles';

export const ChatBot = ({ flow, settings, styles, themes }) => {
  const [currentStep, setCurrentStep] = useState('start'); // Track the current step in the flow

  const [userInput, setUserInput] = useState(''); // Track user input fron text input
  const [conversation, setConversation] = useState([]); // Store conversation history
  const [isChatOpen, setIsChatOpen] = useState(false); // Track if the chat window is open

  console.log('userInput', userInput);
  console.log('conversation', conversation);
  // Get the current step from the flow
  const currentFlowStep = flow?.[currentStep];
  console.log('current step: ', currentFlowStep);

  useEffect(() => {
    // Load initial messages and handle function-based messages
    const botMessage =
      typeof currentFlowStep.message === 'function'
        ? currentFlowStep.message({ userInput })  // Call function if message is a function
        : currentFlowStep.message;
  
    setConversation([
      ...conversation,
      { owner: BotName, message: botMessage },
    ]);
  }, [currentStep]);  // Make sure it updates whenever the current step changes

// Handle sending user input
const handleSendInput = () => {
  // Add current bot message and user input to the conversation
  console.log('-- IN --');

  console.log('userInput', userInput);

  setConversation([
    ...conversation,
    { owner: 'you', message: userInput },
  ]);
  
  // Call the function associated with the current step if it exists
  if (currentFlowStep?.function) {
    currentFlowStep.function({ userInput });
  }

  // Move to the next step in the flow if a path is provided
  if (currentFlowStep?.path) {
    setCurrentStep(currentFlowStep.path);
  }

  // Clear the input field after the message is sent
  setUserInput('');
};


  const chatButton =
    'fixed bottom-4 right-4 bg-alt-background rounded-full w-12 h-12 hover:brightness-125 text-orange-600 font-medium';
  const chatWindow =
    'fixed grid bottom-4 right-4 h-full bg-main-background border border-orange-600 border-solid shadow-xl min-h-[calc(100vh/2.2)] max-h-[calc(100vh/2.2)] ml-4 sm:ml-0 sm:max-w-[calc((100vh/2.2)*2.2/3)] rounded-lg overflow-hidden';

  return (
    <section>
      {/* Render "Chat" button if the chat window is closed */}
      {!isChatOpen && (
        <button id='chatbot_button' className={chatButton} onClick={() => setIsChatOpen(true)}>
          Chat
        </button>
      )}

      {/* Render the chat window if isChatOpen is true */}
      {isChatOpen && (
        <section className={chatWindow}>
          <div className='grid grid-rows-a1a h-full overflow-hidden'>
            {/* Header */}
            <header className='flex justify-between items-center bg-alt-background text-white py-1 px-1 h-fit'>
              <div>Chat with {CompanyName}</div>
              <div className='grid items-center'>
                {/* Close button to hide the chat window */}
                <button onClick={() => setIsChatOpen(false)}>
                  <IoMdClose />
                </button>
              </div>
            </header>

            {/* Main chat component */}
            <section className='grid h-full max-h-full overflow-hidden bg-red-300'>
              <section className='grid max-h-full overflow-y-auto bg-blue-400'>
                {/* Render the conversation */}
                <div className='grid h-fit max-h-full'>
                  {conversation.map((chat, index) => (
                    <div key={index} className='grid h-fit px-1 py-1'>
                      <p>
                        <strong className='capitalize'>{chat.owner}:</strong>{' '}
                        {typeof chat.bot === 'function'
                          ? chat.bot()
                          : chat.message}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </section>

            {/* User inputs */}
            <section className='grid items-center h-fit overflow-hidden'>
              <div className='grid grid-cols-rev gap-2 py-1 px-2'>
                <input
                  type='text'
                  className={InputStyle}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder='Type your message...'
                />
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
      )}
    </section>
  );
};

export default ChatBot;
