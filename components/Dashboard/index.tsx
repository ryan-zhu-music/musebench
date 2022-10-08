import Navbar from "../Navbar";
import Image from "next/image";
import { tests } from "../../data/tests";
import Link from "next/link";
interface Props {
  auth: any;
  user: any;
}

const Dashboard: React.FC<Props> = ({ auth, user }) => {
  return (
    <main
      className="w-screen min-h-screen pt-28 pb-10 flex flex-col justify-center items-center"
      style={{
        background:
          "linear-gradient(117.92deg, #17181B 4.93%, #3C3D70 47.36%, #1E1F48 57.8%, #05061F 92.37%)",
        boxShadow: "inset 0px 0px 250px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="h-full flex flex-wrap w-screen justify-center items-center py-10 px-20">
        {tests.map((test) => (
          <Link
            href={
              test.underConstruction
                ? "/"
                : `/tests/${test.title.toLowerCase()}`
            }
            key={test.title}
          >
            <div
              className="relative flex flex-col items-center justify-center h-[250px] w-[275px] md:h-[275px] border-glow m-2 px-4 py-3 cursor-pointer hover:bg-indigo-300/20"
              key={test.title}
            >
              <div className={`${test.underConstruction && "blur-md"}`}>
                <div className="h-1/2 flex flex-col justify-end">
                  <Image
                    src={test.image}
                    alt={test.title}
                    className="object-contain"
                    layout="intrinsic"
                    width={140}
                    height={140}
                  />
                </div>
                <div className="h-1/2 flex flex-col items-center justify-start">
                  <h3 className="text-center text-white">{test.title}</h3>
                  <h4 className="text-center text-white">{test.subtitle}</h4>
                </div>
              </div>
              {test.underConstruction && (
                <p className="absolute text-white text-xl italic font-bold">
                  Coming soon!
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
      <Navbar auth={auth} signedIn={!!user} />
      {/*Navbar must go below image for blur to work*/}
    </main>
  );
};

export default Dashboard;
