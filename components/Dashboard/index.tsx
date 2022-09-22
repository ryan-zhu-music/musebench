import Navbar from "../Navbar";

interface Props {
  auth: any;
  user: any;
}

const tests = [
  {
    title: "Tuning",
    subtitle: "Is the pitch higher or lower?",
    link: "/",
  },
  {
    title: "Perfect",
    subtitle: "What is the pitch of the note?",
    link: "/",
  },
  {
    title: "Relative",
    subtitle: "Play back a melody!",
    link: "/",
  },
  {
    title: "Interval",
    subtitle: "Name the harmonic and melodic intervals.",
    link: "/",
  },
  {
    title: "Chord",
    subtitle: "Identify the progressions.",
    link: "/",
  },
  {
    title: "Rhythm",
    subtitle: "Play back a rhythm!",
    link: "/",
  },
];

const Dashboard: React.FC<Props> = ({ auth, user }) => {
  return (
    <main
      className="w-screen h-screen"
      style={{
        background:
          "linear-gradient(117.92deg, #17181B 4.93%, #3C3D70 47.36%, #1E1F48 57.8%, #05061F 92.37%)",
        boxShadow: "inset 0px 0px 250px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Navbar signedIn={false} home={true} />
      <div className="flex flex-wrap w-screen justify-center items-center px-20">
        {tests.map((test) => (
          <div className="flex flex-col items-center justify-center w-[350px] h-[180px] border-glow m-2">
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
