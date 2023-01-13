import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../AuthContext";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  height: 100vh;
  background-color: #a7b7ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  overflow: hidden;
  width: 65%;
  height: 80%;
  background-color: #8599f0;
  border-radius: 8px;
  display: flex;
  box-shadow: 2px 2px 4px grey;
`;
function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/", { replace: true });
  }, [user,navigate]);

  return (
    <Container>
      <Wrapper>
        <Sidebar />
        <Chat />
      </Wrapper>
    </Container>
  );
}

export default Home;
