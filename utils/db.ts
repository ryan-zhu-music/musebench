import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addUser = async (user: any, name: any, email: any) => {
  await setDoc(doc(db, "users", user.email), {
    name: name,
    email: email,
  });
};

export const updateScores = async (email: string, scores: any) => {
  await updateDoc(doc(db, "users", email), {
    scores: scores,
  });
};

export const getScores = async (email: string) => {
  const docRef = doc(db, "users", email);
  try {
    const docSnap = await getDoc(docRef);
    const res = docSnap.data();
    if (!res) {
      throw "No data found";
    }
    return res;
  } catch (error) {
    console.log(error);
    return {
      tuning: 0,
      perfect: 0,
      relative: 0,
      interval: 0,
      chord: 0,
      count: 0,
      tempo: 0,
      bpm: 0,
    };
  }
};
