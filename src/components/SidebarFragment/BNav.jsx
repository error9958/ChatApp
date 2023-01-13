import { signOut } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import add from "../../img/add.png";
import logout from "../../img/logout.png";
import { addFriend, findUser } from "../../UtilityMethods";
import { doc } from "firebase/firestore";
import { useContext } from "react";
import { chatContext } from "../../ChatContext";
import { AuthContext } from "../../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
  box-sizing: border-box;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: white;
  border: none;
`;
const IconBox = styled.img`
  height: 30px;
  width: 30px;
  object-fit: contain;
  scale: 0.8;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
const Form = styled.form`
  padding: 20px;
  background-color: #3e3c61;
  gap: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  align-items: center;
`;
const Input = styled.input`
  padding: 5px 16px;
  outline: none;
`;

function BNav() {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(chatContext);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    var userName = e.target[0].value;
    findUser(userName).then(async (User) => {
      if (User) {
        const combinedId =
          user.uid > User.uid ? user.uid + User.uid : User.uid + user.uid;
        await setDoc(doc(db, "chats", combinedId), {});
        addFriend(user, User, combinedId);
      } else {
        toast.info("User not found !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setPopup(false);
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container>
        <Button
          onClick={() => {
            setPopup(true);
          }}
        >
          <IconBox src={add} />
          ADD USER
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: "resetState" });
            signOut(auth).then(navigate("/login", { replace: true }));
          }}
        >
          {" "}
          <IconBox src={logout} />
          LOGOUT
        </Button>
        {popup && (
          <>
            <Overlay
              onClick={() => {
                setPopup(false);
              }}
            />
            <Form onSubmit={submitHandler}>
              <Input type="text" placeholder="search for user" />
              <Button
                type="submit"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                ADD
              </Button>
            </Form>
          </>
        )}
      </Container>
    </>
  );
}

export default BNav;
