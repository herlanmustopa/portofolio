interface IButton {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({text, onClick, className}: IButton) {
  return (
    <button
      className={` ${className} border border-teal-700  lg:text-white sm:text-green  px-4 py-2 rounded-full hover:bg-teal-700 hover:text-white transition`}>
      {text}
    </button>
  );
}
