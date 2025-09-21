function Button({ text, onclick }: { text: any; onclick: any }) {
  return (
    <button
      onClick={onclick}
      className="flex justify-center items-center w-full h-full active:scale-95 bg-linear-to-b to-[#0a0a0a] from-[#121212] text-[#cbcbcb] border-1 border-[#2b2b2b] rounded-3xl text-2xl transition-all duration-200"
    >
      {text}
    </button>
  );
}

export default Button;
