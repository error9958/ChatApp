import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 5px;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
`;
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: right;
`;
const Title = styled.span`
  color: white;
  font-weight: ${(props) => props.fw};
  font-size: ${(props) => props.fs};
`;

function User({ user, lastchat, imgUrl, onClick }) {
  return (
    <Container onClick={onClick}>
      <Image src={imgUrl} />
      <Wrapper>
        <Title fw="bold">{user}</Title>
        <Title fs="12px">{lastchat}</Title>
      </Wrapper>
    </Container>
  );
}

export default User;
