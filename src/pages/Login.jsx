import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import { getError, signIn } from "../UtilityMethods";
import "react-toastify/dist/ReactToastify.css";

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

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const [email, password] = [e.target[0].value, e.target[1].value];
    setLoading(true);

    // Login using email and password

    signIn(email, password).then((v) => {
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
  };
  return (
    <>
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
          <Title>Login</Title>
          <Form onSubmit={submitHandler}>
            <Input type="email" placeholder="Enter email address" required />
            <Input type="password" placeholder="Enter password" required />

            <Button type="submit">SignIn</Button>
          </Form>
          <p style={{ marginTop: "15px", color: "#5d5b8d" }}>
            Don't have an account ?
            <Link to="/register" replace>
              Register{" "}
            </Link>
          </p>
        </Wrapper>
      </Container>
    </>
  );
}

export default Login;
