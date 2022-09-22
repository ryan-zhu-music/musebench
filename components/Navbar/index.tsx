import { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import Button from "../Button";
import Drawer from "./drawer";

interface Props {
  signedIn: boolean;
  home: boolean;
}

const Navbar: React.FC<Props> = ({ signedIn, home }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main>
      {drawerOpen && (
        <Drawer onClose={() => setDrawerOpen(false)} signedIn={signedIn} />
      )}

      <nav className="w-screen flex items-center justify-between flex-no-wrap bg-transparent py-10 px-20">
        <button
          className="flex w-1/4 items-center justify-start flex-shrink-0 text-white"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu size={40} />
        </button>
        <div className="flex w-1/2 items-center justify-center flex-shrink-0 text-white">
          <span className="font-semibold text-xl tracking-tight">
            <Link href="/">
              <img src="./Logo.png" alt="MuseBench" />
            </Link>
          </span>
        </div>
        <div className="flex w-1/4 items-center justify-end flex-shrink-0 text-white">
          <Button
            text={signedIn ? "sign out" : "sign in"}
            onClick={() => console.log("Sign in/out")}
          />
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
