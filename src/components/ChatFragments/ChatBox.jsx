import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  max-width: 50%;
  flex-direction: column;
  justify-content: start;
  align-self: ${(props) => {
    return props.isOwner ? "flex-end" : "flex-start";
  }};
  width: fit-content;
  background-color: #827fc4;
  color: white;
  padding: 4px 8px;

`;
const Image = styled.img`
  width: 50%;
  max-width: 50%;
  align-self: ${(props) => {
    return props.isOwner ? "flex-end" : "flex-start";
  }};
`;

function ChatBox({ isOwner, image, chat }) {
  const ref = useRef();
  const imageExist = image ? true : false;
  const chatExist = chat ? true : false;
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={ref} style={{ display: "inherit", flexDirection: "inherit" }}>
      {chatExist ? <Container isOwner={isOwner}>{chat}</Container> : null}
      {imageExist ? <Image isOwner={isOwner} src={image} /> : null}
    </div>
  );
}

export default ChatBox;
