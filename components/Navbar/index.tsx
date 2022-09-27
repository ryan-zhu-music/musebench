import { useState } from "react";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import Button from "../Button";
import Drawer from "./drawer";
import { signIn, signOutUser } from "../../utils/firebase";

interface Props {
  auth: any;
  signedIn: boolean;
}

const Navbar: React.FC<Props> = ({ auth, signedIn }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className={`absolute top-0 left-0`}>
      <Drawer
        auth={auth}
        onClose={() => setDrawerOpen(false)}
        signedIn={signedIn}
        signIn={signIn}
        isOpen={drawerOpen}
      />
      <nav
        className={`w-screen flex items-center justify-between flex-no-wrap py-10 px-5 md:px-10 lg:px-20 sticky `}
      >
        <button
          className="flex w-1/5 md:w-1/4 items-center justify-start flex-shrink-0 text-white"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu className="glow text-4xl md:text-5xl" />
        </button>
        <div className="flex w-3/5 md:w-1/2 items-center justify-center flex-shrink-0 text-white">
          <Image
            src="/assets/Logo.png"
            alt="MuseBench"
            layout="intrinsic"
            width={300}
            height={30}
          />
        </div>
        <div className="flex w-1/5 md:w-1/4 items-center justify-end flex-shrink-0 text-white px-5 md:visible invisible">
          <Button
            text={signedIn ? "sign out" : "sign in"}
            onClick={() => (signedIn ? signOutUser(auth) : signIn())}
          />
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
