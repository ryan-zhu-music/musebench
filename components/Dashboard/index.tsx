import Navbar from "../Navbar";
import { tests } from "../../data/tests";
interface Props {
  auth: any;
  user: any;
  signIn: () => void;
}

const Dashboard: React.FC<Props> = ({ auth, user, signIn }) => {
  return (
    <main
      className="w-screen h-screen"
      style={{
        background:
          "linear-gradient(117.92deg, #17181B 4.93%, #3C3D70 47.36%, #1E1F48 57.8%, #05061F 92.37%)",
        boxShadow: "inset 0px 0px 250px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Navbar auth={auth} signedIn={!!user} signIn={signIn} />
      <div className="flex flex-wrap w-screen justify-center items-center px-20">
        {tests.map((test) => (
          <div
            className="flex flex-col items-center justify-center w-[350px] h-[180px] border-glow m-2"
            key={test.title}
          >
            <div className="flex flex-col items-center justify-center h-1/2 p-4">
              <h3 className="text-center text-white">{test.title}</h3>
              <h4 className="text-center text-white">{test.subtitle}</h4>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
