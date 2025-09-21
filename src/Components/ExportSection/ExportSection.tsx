import { useState } from "react";
import Button from "../Button/Button";

export const ExportSection = () => {
  const [openExport, setOpenExport] = useState<boolean>(false);
  return (
    <div
      style={{ height: openExport ? "240px" : "5rem" }}
      className="font-[Geist] border-1 border-neutral-800 absolute flex justify-end flex-col bottom-10 left-5 w-50 bg-neutral-900 z-1000 p-2 rounded-[2.5rem]"
    >
      {openExport && (
        <>
          <p className="w-full text-xl border-b-1 border-neutral-700 h-12 flex justify-center items-center hover:bg-neutral-800 rounded-t-4xl active:bg-neutral-900">
            Echo Command
          </p>
          <p className="w-full text-xl border-b-1 border-neutral-700 h-12 flex justify-center items-center hover:bg-neutral-800 active:bg-neutral-900">
            Copy Text
          </p>
          <p className="w-full text-xl mb-3 h-12 flex justify-center items-center hover:bg-neutral-800 rounded-b-4xl active:bg-neutral-900">
            Export Image
          </p>
        </>
      )}
      <button
        onClick={() => setOpenExport(!openExport)}
        className="flex justify-center items-center w-full h-16 active:scale-95 bg-linear-to-b to-[#0a0a0a] from-[#121212] text-[#cbcbcb] border-1 border-[#2b2b2b] rounded-full text-2xl transition-all duration-200"
      >
        <p>EXPORT</p>
      </button>
    </div>
  );
};
