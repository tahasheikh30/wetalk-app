import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import assets from "../assets/assets";

const firebaseConfig = {
  apiKey: "AIzaSyC6FvltdNfWw4AqQwLynLdRq9mg706dEDo",
  authDomain: "wetalk-app-gs.firebaseapp.com",
  projectId: "wetalk-app-gs",
  storageBucket: "wetalk-app-gs.appspot.com",
  messagingSenderId: "919037661011",
  appId: "1:919037661011:web:272814fc665f8c0cdf5ba6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      name,
      username: username.toLowerCase(),
      email,
      avatar: assets.avatar_icon,
      bio: "Hello Everyone, I am using WeTalk",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const resetPassword = async (email) => {
  if (!email) {
    toast.error("Enter your email");
    return null;
  }
  try {
    const userRef = collection(db,"users");
    const q = query(userRef,where("email","==",email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email");
    }
    else{
      toast.error("Email not found");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
};

export { signup, login, logout, auth, db, resetPassword };
