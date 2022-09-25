import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import Button from "../Button";
import Drawer from "./drawer";
import { signOut } from "../../utils/firebase";

interface Props {
  auth: any;
  signedIn: boolean;
  signIn: () => void;
}

const Navbar: React.FC<Props> = ({ auth, signedIn, signIn }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main>
      <Drawer
        auth={auth}
        onClose={() => setDrawerOpen(false)}
        signedIn={signedIn}
        signIn={signIn}
        isOpen={drawerOpen}
      />

      <nav className="w-screen flex items-center justify-between flex-no-wrap bg-transparent py-10 px-20">
        <button
          className="flex w-1/4 items-center justify-start flex-shrink-0 text-white"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu size={40} className="glow" />
        </button>
        <div className="flex w-1/2 items-center justify-center flex-shrink-0 text-white">
          <span className="font-semibold text-xl tracking-tight">
            <Link href="/">
              <Image
                src="/assets/Logo.png"
                alt="MuseBench"
                layout="intrinsic"
                width={300}
                height={32}
              />
            </Link>
          </span>
        </div>
        <div className="flex w-1/4 items-center justify-end flex-shrink-0 text-white px-10">
          <Button
            text={signedIn ? "sign out" : "sign in"}
            onClick={() => (signedIn ? signOut(auth) : signIn())}
          />
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
