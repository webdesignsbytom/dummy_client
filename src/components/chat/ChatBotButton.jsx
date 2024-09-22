import React from 'react';

function ChatBotButton({ setIsChatOpen }) {
  const chatButton =
    'fixed bottom-4 right-4 bg-alt-background rounded-full w-12 h-12 hover:brightness-125 text-orange-600 font-medium z-10';

  return (
    <button
      id='chatbot_button'
      className={chatButton}
      onClick={() => setIsChatOpen(true)}
    >
      Chat
    </button>
  );
}

export default ChatBotButton;
