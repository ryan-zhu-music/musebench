import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addUser = async (user: any, name: any, email: any) => {
  await setDoc(doc(db, "users", user.email), {
    name: name,
    email: email,
  });
};

export const updateScores = async (
  email: string,
  score: any,
  test: string,
  data: any
) => {
  let scores = { ...data };
  if (score > scores[test].highScore) {
    scores[test].highScore = score;
  }
  scores[test].attempts = scores[test].attempts + 1;
  scores[test].total = scores[test].total + score;
  console.log(scores);
  await updateDoc(doc(db, "users", email), {
    scores: scores,
  }).catch((error) => {
    console.log("Update error:", error);
  });
};

export const getScores = async (email: string) => {
  const docRef = doc(db, "users", email);
  try {
    const docSnap = await getDoc(docRef);
    const res = docSnap.data();
    if (!res || !res.scores) {
      throw "No data found";
    }
    return res;
  } catch (error) {
    console.log("Retrieve error:", error);
    let scores = <any>{};
    [
      "tuning",
      "perfect",
      "relative",
      "interval",
      "chord",
      "count",
      "tempo",
      "bpm",
    ].forEach((key) => {
      scores[key] = {
        highScore: 0,
        total: 0,
        attempts: 0,
      };
    });
    return scores;
  }
};
