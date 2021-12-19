import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelList } from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { useCookies } from "react-cookie";

import ChatContainer from "./components/CharMessegerContainer/ChatContainer";
import Auth from "./components/Auth";
import Video from "./components/Video/Video";
const client = StreamChat.getInstance("cdrs6vst5auz");

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  const authToken = cookies.AuthToken;
  console.log(cookies);
  console.log(authToken);

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: cookies.UserId,
            name: cookies.name,
            hashPassword: cookies.hashedhPassword,
          },
          authToken
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
