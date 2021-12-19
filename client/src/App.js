import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelList } from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";

import ChatContainer from "./components/CharMessegerContainer/ChatContainer";
import Auth from "./components/Auth";
import Video from "./components/Video/Video";
const client = StreamChat.getInstance("cdrs6vst5auz");

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  const authToken = false;

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: "dave-matthews",
            name: "Dave Matthews",
          },
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.LCquTXyh7B_DPq1itGrRDzB2rWozq0BSOyhE2uIadJY"
        );

        const channel = await client.channel("gaming", "gamingDemo", {
          name: "Gaming Demo",
        });
        setChannel(channel);

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  const customStyles = {
    "--primary-color": "green",
    "--md-font": "1.2rem",
    "--xs-m": "1.2rem",
    "--xs-p": "1.2rem",
  };

  return (
    <>
      {!authToken && <Auth />}
      {authToken && (
        <Chat client={client} customStyles={customStyles}>
          <Channel channel={channel}>
            <Video />
            <ChatContainer />
          </Channel>
        </Chat>
      )}
    </>
  );
};

export default App;
