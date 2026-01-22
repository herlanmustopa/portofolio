import { motion } from "framer-motion";

interface IButton {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ text, onClick, className }: IButton) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }} // Tombol akan membesar 5% saat di-hover
      whileTap={{ scale: 0.95 }} // Tombol akan sedikit mengecil saat ditekan
      transition={{ type: "spring", stiffness: 400, damping: 17 }} // Membuat animasi terasa lebih natural
      className={` ${className} border border-gold text-white px-4 py-2 rounded-full hover:bg-gold hover:text-navy`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
}
