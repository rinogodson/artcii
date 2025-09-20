import { ChevronDown, RotateCw, X } from "lucide-react";
import Input from "./Input/Input";
import Button from "../Button/Button";

function Settings() {
  return (
    <>
      <Title title="Dimensions" />
      <div className="w-full flex flex-col justify-start items-center">
        <div className="h-15 flex mx-5">
          <Input />
          <div className="h-full w-30 flex justify-center items-center">
            <X className="text-[#4b4b4b]" size={30} />
          </div>
          <Input />
        </div>
      </div>
      <Title title="Character" />
      <div className="grid grid-cols-[7.5rem_1fr] mx-5 gap-3">
        <CharSelect />
        <div className="h-full w-full flex flex-col gap-2">
          <Button text="Nerd Font" />
          <Button text="Emoji" />
        </div>
      </div>
      <Title title="Box Drawing" />
      <div className="grid grid-cols-[10rem_1fr] items-center h-40">
        <div className="grid grid-cols-3 grid-rows-3 h-40 aspect-square mx-5 border-1 bg-[#121212] border-[#3b3b3b] rounded-4xl gap-1 p-3 overflow-hidden">
          <BoxChar c="╭" />
          <BoxChar c="─" />
          <BoxChar c="╮" />
          <BoxChar c="│" />
          <BoxChar c="╰" />
          <div className="[grid-area:2/2/3/4] overflow-hidden w-full grid grid-cols-[3fr_1.6fr] h-full hover:bg-[#252525] cursor-pointer bg-[#222222] text-[Hack] text-2xl rounded-[1.6em]">
            <div className="w-full h-full flex justify-center items-center">
              █
            </div>
            <div className="w-full h-full flex justify-center items-center border-l-1 border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)]">
              <ChevronDown size={17} />
            </div>
          </div>
          <div className="w-full bg-[#121212]">
            <button className="flex justify-center items-center w-full h-full active:scale-95 bg-linear-to-b to-[#0a0a0a] from-[#121212] text-[#cbcbcb] border-1 border-[#2b2b2b] rounded-3xl text-xl transition-all duration-200">
              <RotateCw />
            </button>
          </div>
          <BoxChar c="╯" />
        </div>
        <div className="justify-end flex h-26 mx-5 border-1 border-l-0 bg-[#121212] border-[#3b3b3b] rounded-4xl rounded-l-[0] gap-1 p-2">
          <div className="font-[Geist] relative grid grid-cols-2 grid-rows-2 p-1 h-full aspect-square bg-[#111111] shadow-xl border-1 border-[#4b4b4b] rotate-45 scale-120 rounded-[1.5rem]">
            <div className="bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg]">
              │
            </div>
            <div className="bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg]">
              ─
            </div>
            <div className="bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg]">
              ─
            </div>
            <div className="bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg]">
              │
            </div>
            <div className="cursor-pointer bg-[#2b2b2b] border-1 border-[#3b3b3b] rounded-full w-11 aspect-square absolute left-[50%] translate-x-[-50%] translate-y-[50%] bottom-[50%] rotate-[-45deg] flex justify-center items-center">
              ┾
            </div>
          </div>
        </div>
      </div>
      <Title title="Colors" />
    </>
  );
}

export default Settings;

const CharSelect = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <div className="w-30 aspect-square bg-[rgba(0,0,0,0.3)] border-3 border-[#2b2b2b] rounded-3xl flex justify-center items-center text-7xl font-[Hack]">
        <div className="w-full flex justify-center border-y-1 border-[#2b2b2b]">
          <div className="w-[calc(1ch_+_2px)] overflow-visible h-fit border-x-1 border-[#2b2b2b]">
            <input placeholder="#" className="w-[2ch]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BoxChar = ({ c }: { c: string }) => {
  return (
    <div className="w-full h-full hover:bg-[#252525] cursor-pointer bg-[#222222] flex justify-center items-center text-[Hack] text-2xl rounded-[1.6em]">
      {c}
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return (
    <div className="font-[Geist] w-full h-8 bg-[rgba(0,0,0,0.2)] border-y-1 border-[#2b2b2b] flex justify-center items-center my-5 text-[#ABABAB]">
      {title}
    </div>
  );
};
