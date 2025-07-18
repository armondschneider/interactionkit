'use client';
import React from 'react';
import TextInput from './TextInput';
import SendButton from '../Button/SendButton';

const Message: React.FC = () => (
  <div className="relative w-full max-w-sm">
    <TextInput
      placeholder="Type your message..."
      className="pr-4 pb-4"
    />
    <SendButton className="absolute bottom-4 right-2" />
  </div>
);

export default Message;

//   <div className="relative w-full max-w-sm">
//     <TextInput
//       placeholder="Type your message..."
//       className="pr-4 pb-4"
//     />
//     <SendButton className="absolute bottom-4 right-2" />
//   </div>
