interface Props {
  signIn: () => void;
}

const Login: React.FC<Props> = ({ signIn }) => {
  return (
    <main className="w-screen h-screen flex items-center justify-center px-6">
      <div className="w-screen h-screen absolute top-0 left-0 opacity-20"></div>

      <div className="w-full sm:w-auto p-8 rounded-lg border-[1px] border-slate-300 bg-white/20 z-10 backdrop-blur-sm flex flex-col items-center justify-start">
        <h1 className="text-slate-700 font-bold text-lg mb-6">Login</h1>
        <button onClick={() => signIn()}>Log In With Google</button>
      </div>
    </main>
  );
};

export default Login;
