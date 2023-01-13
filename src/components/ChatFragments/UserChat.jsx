import styled from "styled-components";
import ChatBox from "./ChatBox";
import img from "../../img/img.png";
import { Send } from "@mui/icons-material";
import { useContext, useState } from "react";
import { addLastMessage, sendMessage, uploadImage } from "../../UtilityMethods";
import { chatContext } from "../../ChatContext";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../AuthContext";

const Container = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }

  overflow-y: scroll;
  background-color: #9e9cb7;
  flex: 10;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
`;
const Input = styled.input`
  border: none;
  width: 80%;
  outline: none;
  color: #b3afaf;
  font-weight: bold;
  padding: 5px 16px;
`;
const Image = styled.img``;
const Form = styled.form`
  display: flex;
  flex: 1;
  background-color: white;
  align-items: center;
  padding: 6px 12px;
  box-sizing: border-box;
  justify-content: space-between;
`;
const Time = styled.span`
  align-self: center;
  font-size: 8px;
  border-radius: 5%;
  background-color: white;
  color: grey;
  padding: 4px;
  margin: 4px 0px;
`;
const Button = styled.button``;

function UserChat() {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState();
  const [messages, setMessages] = useState([]);
  const { chatState } = useContext(chatContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (text || image) {
      if (image) {
        uploadImage(image).then((e) => {
          sendMessage(user, chatState, text, e);
          if (!(text === "")) {
            addLastMessage(user, chatState.user.uid, chatState.chatId, text);
          }
        });
      } else {
        sendMessage(user, chatState, text, "");
        addLastMessage(user, chatState.user.uid, chatState.chatId, text);
      }
    }
    setText("");
    setImage();
  };
  // useEffect to fetch chat
  useEffect(() => {
    const collectionRef = collection(db, "chats", chatState.chatId, "Messages");
    const q = query(collectionRef, orderBy("date"));
    const unsub = onSnapshot(q, (docs) => {
      var mes = [];
      docs.forEach((doc) => {
        mes = [...mes, doc.data()];
      });
      setMessages(mes);
    });
    return () => {
      unsub();
    };
  }, [chatState]);

  return (
    <>
      <Container>
        {messages.map((doc) => {
          const date = new Date(doc.date.seconds * 1000);
          const [hour, min, am_pm] = [
            date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
            date.getMinutes(),
            date.getHours() >= 12 ? "pm" : "am",
          ];

          const time = hour + ":" + min + am_pm;
          const isOwner = doc.senderId === user?.uid ? true : false;

          return (
            <>
              <ChatBox
                isOwner={isOwner}
                image={doc.imageUrl}
                chat={doc.message}
              />
              <Time>{time}</Time>
            </>
          );
        })}
      </Container>
      <Form onSubmit={submitHandler}>
        <Input
          placeholder="Type a message "
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
          id="fileInput"
          style={{ display: "none" }}
        />
        <Button type="submit" id="btn" style={{ display: "none" }}></Button>
        <label htmlFor="fileInput">
          <Image src={img} />
        </label>
        <label htmlFor="btn">
          <Send style={{ color: "gray" }} />
        </label>
      </Form>
    </>
  );
}

export default UserChat;
