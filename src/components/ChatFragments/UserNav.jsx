import { useContext } from "react";
import styled from "styled-components";
import { chatContext } from "../../ChatContext";
const Container = styled.div`
  flex: 1;
  gap: 10px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  background-color: #433f80;
`;
const Image = styled.img`
  width: 30px;
  height: 30px;

  border-radius: 50%;
`;
const Title = styled.span`
  color: white;
  font-weight: ${(props) => props.fw};
  font-size: ${(props) => props.fs};
`;

function UserNav() {
  const { chatState } = useContext(chatContext);
  return (
    <Container>
      <Image src={chatState.user.imageUrl} />
      <Title fs="15px">{chatState.user.displayName}</Title>
    </Container>
  );
}

export default UserNav;
