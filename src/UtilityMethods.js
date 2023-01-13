import { auth, db, storage } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
//Function to return error statement
export function getError(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email is already in use !";
    case "auth/weak-password":
      return "Weak password !";
    case "auth/wrong-password":
      return "Incorrect password !";
    case "auth/user-not-found":
      return "User not found !";
    default:
      return "Something went wrong,try again !";
  }
}

//Function for Creating User

export async function createUser(displayName, email, password, imgFile) {
  let downloadURL = "";
  try {
    const user = (await createUserWithEmailAndPassword(auth, email, password))
      .user;

    // Uploading file and getting download URL.

    const fileRef = ref(storage, `Avatars/${user.uid}`);
    await uploadBytes(fileRef, imgFile);
    await getDownloadURL(fileRef).then((url) => {
      downloadURL = url;
    });

    // Setting displayName and photoURL

    await updateProfile(user, {
      displayName: displayName,
      photoURL: downloadURL,
    });

    // Adding userInfo to database

    await setDoc(doc(db, "Users", user.uid), {
      uid: user.uid,
      displayName,
      email,
      imageUrl: downloadURL,
    });

    // Adding user to userChats Collection

    await setDoc(doc(db, "userChats", user.uid), {});

    return "Success";
  } catch (e) {
    return e.code;
  }
}

//Function for LogIn
export async function signIn(email, password) {
 
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "Success";
  } catch (e) {
    return e.code;
  }
}

//function for Searching user

export async function findUser(userName) {
  try {
    const collectionRef = collection(db, "Users");
    const q = query(collectionRef, where("displayName", "==", userName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size) {
      return querySnapshot.docs[0].data();
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
}

//Adding user to friendList
export async function addFriend(currentUser, user, combinedId) {
  try {
    await setDoc(doc(db, "chats", combinedId), {});
    //adding user to currentUser
    updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedId + ".userInfo"]: {
        displayName: user.displayName,
        uid: user.uid,
        imageUrl: user.imageUrl,
      },
      [combinedId + ".date"]: Timestamp.now(),
    });
    //adding currentuser to user
    updateDoc(doc(db, "userChats", user.uid), {
      [combinedId + ".userInfo"]: {
        displayName: currentUser.displayName,
        uid: currentUser.uid,
        imageUrl: currentUser.photoURL,
      },
      [combinedId + ".date"]: Timestamp.now(),
    });
  } catch (e) {
    console.log(e.message);
  }
}

//Function to add Message in chats Collection
export async function sendMessage(currentUser, chatState, message, imageUrl) {
  try {
    await addDoc(collection(db, "chats", chatState.chatId, "Messages"), {
      id: uuid(),
      imageUrl,
      message,
      date: Timestamp.now(),
      senderId: currentUser.uid,
    });
  } catch (e) {
    console.log(e.message);
  }
}

//Function to upload image and get url
export async function uploadImage(image) {
  try {
    const fileRef = ref(storage, `UsersData/${uuid()}`);
    await uploadBytes(fileRef, image);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (e) {
    console.log(e.message);
  }
}

//Function to add last message
export async function addLastMessage(currentUser, uid, combinedId, message) {
  try {
    // adding last message in user
    await updateDoc(doc(db, "userChats", uid), {
      [combinedId + ".lastMessage"]: message,
      [combinedId + ".date"]: Timestamp.now(),
    });
    //adding last message in currentUser
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedId + ".lastMessage"]: message,
      [combinedId + ".date"]: Timestamp.now(),
    });
  } catch (e) {
    console.log(e.message);
  }
}
