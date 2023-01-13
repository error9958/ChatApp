import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";

export const chatContext = createContext();

function ChatContext({ children }) {
  const { user } = useContext(AuthContext);
  const defaultState = {
    chatId: "",
    user: {},
    exist: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "changeUser":
        return {
          exist: true,
          user: action.payload,
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };
      case "resetState":
        return defaultState;
      default:
        return state;
    }
  };

  const [chatState, dispatch] = useReducer(reducer, defaultState);
  return (
    <chatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </chatContext.Provider>
  );
}

export default ChatContext;
