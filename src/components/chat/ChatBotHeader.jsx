import React from 'react'
// Constants
import { CompanyName } from '../../utils/Constants';
// Icons
import { IoMdClose } from 'react-icons/io';

function ChatBotHeader({ setIsChatOpen }) {
  return (
    <header className='flex justify-between items-center bg-alt-background text-white py-1 px-1 h-fit'>
    <div>Chat with {CompanyName}</div>
    <div className='grid items-center'>
      {/* Close button to hide the chat window */}
      <button onClick={() => setIsChatOpen(false)}>
        <IoMdClose />
      </button>
    </div>
  </header>
  )
}

export default ChatBotHeader