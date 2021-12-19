import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";

const ChatContainer = () => {
  return (
    <div className="chat-container">
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </div>
  );
};

export default ChatContainer;
