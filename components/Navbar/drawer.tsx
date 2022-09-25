import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Button from "../Button";
import { signOut } from "../../utils/firebase";

import { tests } from "../../data/tests";
interface Props {
  auth: any;
  onClose: () => void;
  signedIn: boolean;
  signIn: () => void;
  isOpen: boolean;
}

const Drawer: React.FC<Props> = ({
  auth,
  onClose,
  signedIn,
  signIn,
  isOpen,
}) => {
  return (
    <nav
      className={`float-left absolute bg-slate-800/30 backdrop-blur-sm transition-all duration-700 ease-out z-20 ${
        isOpen ? "left-0" : "-left-[400px]"
      }`}
    >
      <div className="h-screen w-[400px] flex flex-col p-6">
        <button className="w-full flex justify-end items-end" onClick={onClose}>
          <IoClose size={40} className="glow" />
        </button>
        <ul className="w-full h-full flex flex-col justify-evenly items-start pl-4">
          <li>
            <Link href="/">
              <a className="glow">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="glow">Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="glow">About</a>
            </Link>
          </li>
          <li className="h-1/2">
            <a className="mb-2 glow">Tests</a>
            <ul className="flex flex-col justify-evenly items-start pl-10">
              {tests.map((test) => (
                <li className="mb-1" key={test.title}>
                  <Link href={"/tests" + test.link}>
                    <a className="text-lg glow">{test.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Button
              text={signedIn ? "sign out" : "sign in"}
              onClick={() => (signedIn ? signOut(auth) : signIn())}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Drawer;
