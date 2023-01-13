import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthContextProvider from "./AuthContext";
import ChatContext from "./ChatContext";

function Protected({ children }) {
  const user = JSON.parse(localStorage.getItem("userState"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthContextProvider>
      <ChatContext>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ChatContext>
    </AuthContextProvider>
  );
}

export default App;
