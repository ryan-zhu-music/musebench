interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      className="border-glow grow h-[50px] w-full text-white font-medium lg:text-lg sm:text-md tracking-widest rounded-full uppercase py-2 px-5"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
