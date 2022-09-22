import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Button from "../Button";

interface Props {
  onClose: () => void;
  signedIn: boolean;
}

const testLinks = [
  {
    name: "Tuning",
    href: "/tuning",
  },
  {
    name: "Perfect",
    href: "/perfect",
  },
  {
    name: "Relative",
    href: "/relative",
  },
  {
    name: "Interval",
    href: "/interval",
  },
  {
    name: "Chord",
    href: "/chord",
  },
  {
    name: "Rhythm",
    href: "/rhythm",
  },
];
const Drawer: React.FC<Props> = ({ onClose, signedIn }) => {
  return (
    <nav className="h-screen w-[400px] float-left fixed flex flex-col bg-slate-800/30 backdrop-blur-sm p-6">
      <button className="w-full flex justify-end items-end" onClick={onClose}>
        <IoClose size={40} />
      </button>
      <ul className="w-full h-full flex flex-col justify-evenly items-start pl-4">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="h-1/2">
          <a className="mb-2">Tests</a>
          <ul className="flex flex-col justify-evenly items-start pl-10">
            {testLinks.map((link) => (
              <li>
                <Link href={link.href}>
                  <a className="text-lg">{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Button
            text={signedIn ? "sign out" : "sign in"}
            onClick={() => console.log("Sign in/out")}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Drawer;
