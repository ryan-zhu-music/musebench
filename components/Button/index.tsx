interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      className="w-3/5 h-[50px] text-white font-medium text-lg tracking-widest rounded-full uppercase py-2 border-glow"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
