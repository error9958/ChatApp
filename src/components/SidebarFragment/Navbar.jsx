import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../AuthContext";

const Container = styled.div`
  flex: 1;
  background-color: #2f2d52;
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #2f2d52;
`;
const Title = styled.span`
  color: white;
  font-weight: ${(props) => props.fw};
  font-size: ${(props) => props.fs};
`;
const Wrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
`;

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Title fw="bolder" fs="15px">
        CHAT APP
      </Title>
      <Wrapper>
        <Image src={user?.photoURL} />
        <Title fs="15px">{user?.displayName}</Title>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
