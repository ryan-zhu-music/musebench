import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addUser = async (user: any, name: any, email: any) => {
  await setDoc(doc(db, "users", user.email), {
    name: name,
    email: email,
  });
};

export const updateUser = async (user: any, name: any, email: any) => {
  await updateDoc(doc(db, "users", user.email), {
    name: name,
    email: email,
  });
};
