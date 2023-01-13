import styled from "styled-components";
import AppIcon from "../../img/AppIcon.png";

const Container = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 60%;
`;
const Image = styled.img`
  height: 90%;
`;
const Title = styled.span`
  color: white;
  font-weight: ${(props) => props.fw};
  font-size: ${(props) => props.fs};
`;

function ChatFront() {
  return (
    <Container>
      <Wrapper>
        <Image src={AppIcon} />
        <Title fw="bold" fs="20px">
          Chat App
        </Title>
        <Title fs="15px">Send and receive messages with ease .</Title>
      </Wrapper>
    </Container>
  );
}

export default ChatFront;
