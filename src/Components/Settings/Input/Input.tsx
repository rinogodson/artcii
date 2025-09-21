import { useState, useEffect } from "react";

function Input({
  value,
  changeFn,
}: {
  value: number;
  changeFn: (val: number) => void;
}) {
  const [ivalue, setIValue] = useState<number>(value);

  useEffect(() => {
    setIValue(value);
  }, [value]);

  const commitChange = () => {
    changeFn(ivalue < 50 ? ivalue : 50);
  };

  return (
    <input
      key={String(changeFn)}
      value={ivalue}
      onChange={(e) => setIValue(Number(e.target.value))}
      onBlur={commitChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commitChange();
          (e.target as HTMLInputElement).blur();
        }
      }}
      type="text"
      className="font-[Geist_Mono] bg-[rgba(0,0,0,0.3)] w-full h-full rounded-2xl border-1 border-[#2b2b2b] text-3xl text-center"
    />
  );
}

export default Input;
