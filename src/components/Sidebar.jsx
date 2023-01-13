import styled from "styled-components";
import Navbar from "./SidebarFragment/Navbar";

import UserList from "./SidebarFragment/UserList";
import BNav from "./SidebarFragment/BNav";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: right;
  background-color: #3e3c61;
  overflow: hidden;
`;

function Sidebar() {
  return (
    <Container>
      <Navbar />

      <UserList />
      <BNav />
    </Container>
  );
}

export default Sidebar;
