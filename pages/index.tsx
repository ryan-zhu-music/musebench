import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import Dashboard from "../components/Dashboard";
import PageHead from "../components/PageHead";

import { auth } from "../utils/firebase";

const Home: NextPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [user]);

  return (
    <main className="w-screen min-h-screen flex flex-col justify-start">
      <PageHead />
      <Dashboard auth={auth} user={user} />
    </main>
  );
};

export default Home;
