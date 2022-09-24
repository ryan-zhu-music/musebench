interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      className="border-glow grow h-[50px] text-white font-medium text-lg tracking-widest rounded-full uppercase py-2 px-5"
      onClick={onClick}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
