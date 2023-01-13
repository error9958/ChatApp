import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import "react-toastify/dist/ReactToastify.css";
import add from "../img/add.png";
import { createUser, findUser, getError } from "../UtilityMethods";

const Container = styled.div`
  height: 100vh;
  background-color: #a7b7ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  box-shadow: 2px 2px 4px grey;
  display: flex;
  flex-direction: column;
  padding: 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 20px 60px;
`;
const Form = styled.form`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  outline: none;
  border-bottom: 1px solid #a7b7ff;
  ::placeholder {
    color: rgb(175, 175, 175);
  }
`;
const Button = styled.button`
  padding: 8px;
  background-color: #7b96ec;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
`;
const Logo = styled.span`
  color: #5d5b8d;
  font-size: 4vh;
  font-weight: bolder;
`;
const Title = styled.span`
  font-size: 2vh;
  color: #5d5b8d;
  font-weight: bold;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 30px;
`;
const Span = styled.span`
  font-size: ${(props) => props.size || "20px"};
  color: #5d5b8d;
`;

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    var target = e.target;
    const [displayName, email, password, imgFile] = [
      target[0].value,
      target[1].value,
      target[2].value,
      target[3].files[0],
    ];

    // createUser method
    findUser(displayName).then((e) => {
      if (e) {
        toast.error("Username already taken !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      } else {
        createUser(displayName, email, password, imgFile).then((v) => {
          setLoading(false);
          v === "Success"
            ? navigate("/", { replace: true })
            : toast.error(getError(v), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        });
      }
    });
  };
  return (
    <Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading ? <LoadingScreen /> : null}
      <Wrapper>
        <Logo>CHAT APP</Logo>
        <Title>Register</Title>
        <Form onSubmit={submitHandler}>
          <Input type="text" placeholder="Enter display name" required />
          <Input type="email" placeholder="Enter email address" required />
          <Input type="password" placeholder="Enter password" required />
          <Input type="file" style={{ display: "none" }} id="file" required />
          <Label htmlFor="file">
            <Image src={add} alt="Avatar" />
            <Span size="15px">Add an avatar</Span>
          </Label>
          <Button type="submit">Register</Button>
        </Form>
        <p style={{ marginTop: "15px", color: "#5d5b8d" }}>
          Already have an account ?
          <Link to="/login" replace>
            SignIn
          </Link>
        </p>
      </Wrapper>
    </Container>
  );
}

export default Register;
