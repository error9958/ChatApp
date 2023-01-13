import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../AuthContext";
import { chatContext } from "../../ChatContext";
import { db } from "../../firebase";
import User from "./User";

const Container = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: transparent;
  flex: 10;
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  gap: 12px;
`;
function UserList() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(chatContext);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "userChats", user?.uid), (data) => {
        setFriends(Object.entries(data.data()));
      });
      return () => {
        unsub();
      };
    }
  }, [user]);

  return (
    <Container>
      {friends
        ?.sort((a, b) => {
          return b[1].date.seconds - a[1].date.seconds;
        })
        .map((e) => {
          return (
            <User
              onClick={() => {
                dispatch({ type: "changeUser", payload: e[1].userInfo });
              }}
              key={e[0]}
              user={e[1].userInfo.displayName}
              imgUrl={e[1].userInfo.imageUrl}
              lastchat={e[1].lastMessage}
            />
          );
        })}
    </Container>
  );
}

export default UserList;
