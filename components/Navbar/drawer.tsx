import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Button from "../Button";
import { signOutUser } from "../../utils/firebase";

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
    <>
      <nav
        className={`float-left absolute bg-slate-800/30 transition-all duration-700 ease-out z-50 ${
          isOpen ? "left-0 backdrop-blur-md" : "-left-full bg-transparent"
        }`}
      >
        <div className="h-screen w-screen md:w-[400px] flex flex-col p-6">
          <div className="w-full flex justify-end items-center">
            <button onClick={onClose}>
              <IoClose size={40} className="glow" />
            </button>
          </div>
          <ul className="w-full h-full flex flex-col justify-evenly items-start pl-4">
            <li>
              <Link href="/">
                <a className="glow text-2xl lg:text-3xl">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a className="glow text-2xl lg:text-3xl">Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="glow text-2xl lg:text-3xl">About</a>
              </Link>
            </li>
            <li className="h-1/2">
              <a className="mb-2 glow text-2xl lg:text-3xl">Tests</a>
              <ul className="flex flex-col h-4/5 justify-evenly items-start pl-10 pt-2">
                {tests.map((test) => (
                  <li key={test.title}>
                    <Link href={"/tests" + test.link}>
                      <a className="text-lg lg:text-2xl glow">{test.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="w-1/2">
              <Button
                text={signedIn ? "sign out" : "sign in"}
                onClick={() => (signedIn ? signOutUser(auth) : signIn())}
              />
            </li>
          </ul>
        </div>
      </nav>
      {isOpen && (
        <button
          className="w-screen h-screen absolute z-10 cursor-default"
          onClick={() => onClose()}
        />
      )}
    </>
  );
};

export default Drawer;
