import styled from "styled-components";
import { chatContext } from "../ChatContext";
import UserChat from "./ChatFragments/UserChat";
import UserNav from "./ChatFragments/UserNav";
import ChatFront from "./ChatFragments/ChatFront";
import { useContext } from "react";

const Container = styled.div`
  box-sizing: border-box;
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function Chat() {
  const { chatState } = useContext(chatContext);
  return chatState.exist ? (
    <>
      <Container>
        <UserNav />
        <UserChat />
      </Container>
    </>
  ) : (
    <ChatFront />
  );
}

export default Chat;
