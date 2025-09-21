import { ChevronDown, RotateCw, X } from "lucide-react";
import Input from "./Input/Input";
import Button from "../Button/Button";
import { useRef, useState } from "react";
import { EmojiPicker, EmojiPickerSearchProps } from "frimousse";

function Settings({
  dimensions,
  setDimensions,
  brush,
  setBrush,
}: {
  dimensions: { rows: number; cols: number };
  setDimensions: any;
  brush: string;
  setBrush: any;
}) {
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);

  return (
    <>
      <Title title="Dimensions" />
      <div className="w-full flex flex-col justify-start items-center">
        <div className="h-15 flex mx-5">
          <Input
            value={dimensions.rows}
            changeFn={(val: number) => {
              setDimensions((p: typeof dimensions) => ({
                ...p,
                rows: val,
              }));
            }}
          />
          <div className="h-full w-30 flex justify-center items-center">
            <X className="text-[#4b4b4b]" size={30} />
          </div>
          <Input
            value={dimensions.cols}
            changeFn={(val: number) => {
              setDimensions((p: typeof dimensions) => ({
                ...p,
                cols: val,
              }));
            }}
          />
        </div>
      </div>
      <Title title="Character" />
      <div className="grid grid-cols-[7.5rem_1fr] mx-5 gap-3">
        <CharSelect brush={brush} setBrush={setBrush} />
        <div className="h-full w-full flex flex-col gap-2">
          <Button
            text="Nerd Font"
            onclick={() => {
              window.open(
                "https://www.nerdfonts.com/cheat-sheet",
                "_blank",
                "noopener,noreferrer",
              );
            }}
          />

          <Button
            onclick={() => {
              setIsEmojiOpen(!isEmojiOpen);
            }}
            text="Emoji"
          />
          {isEmojiOpen && (
            <EmojiPicker.Root
              onEmojiSelect={(emoji) => {
                setBrush(emoji.emoji);
              }}
              className="isolate absolute border-1 border-[#3b3b3b] rounded-2xl z-1000 right-2 translate-y-[8em] flex h-[368px] w-fit flex-col bg-white dark:bg-neutral-900"
            >
              <EmojiPicker.Search className="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-sm dark:bg-neutral-800" />
              <EmojiPicker.Viewport className="relative flex-1 outline-hidden">
                <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
                  Loading…
                </EmojiPicker.Loading>
                <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
                  No emoji found.
                </EmojiPicker.Empty>
                <EmojiPicker.List
                  className="select-none pb-1.5"
                  components={{
                    CategoryHeader: ({ category, ...props }) => (
                      <div
                        className="bg-white px-3 pt-3 pb-1.5 font-medium text-neutral-600 text-xs dark:bg-neutral-900 dark:text-neutral-400"
                        {...props}
                      >
                        {category.label}
                      </div>
                    ),
                    Row: ({ children, ...props }) => (
                      <div className="scroll-my-1.5 px-1.5" {...props}>
                        {children}
                      </div>
                    ),
                    Emoji: ({ emoji, ...props }) => (
                      <button
                        className="flex size-8 items-center justify-center rounded-md text-lg data-[active]:bg-neutral-100 dark:data-[active]:bg-neutral-800"
                        {...props}
                      >
                        {emoji.emoji}
                      </button>
                    ),
                  }}
                />
              </EmojiPicker.Viewport>
            </EmojiPicker.Root>
          )}
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
          <div className="font-[Geist] relative grid grid-cols-2 grid-rows-2 p-1 h-full aspect-square bg-[#111111] shadow-[0_0_10px_rgba(0,0,0,0.1)] border-1 border-[#4b4b4b] rotate-45 scale-120 rounded-[1.5rem]">
            <div className="cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-b-[0]">
              │
            </div>
            <div className="cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-l-[0]">
              ─
            </div>
            <div className="cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-r-[0]">
              ─
            </div>
            <div className="cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-t-[0]">
              │
            </div>
            <div className="cursor-pointer bg-[#2b2b2b] border-1 border-[#3b3b3b] rounded-full w-11 aspect-square absolute left-[50%] translate-x-[-50%] translate-y-[50%] bottom-[50%] rotate-[-45deg] flex justify-center items-center">
              ┾
            </div>
          </div>
        </div>
      </div>
      <Title title="Colors" />
      <div className="flex flex-col justify-around items-center h-20 mx-5 border-1 py-3 bg-[#121212] border-[#3b3b3b] rounded-4xl gap-2 p-1 overflow-hidden">
        <p className="font-[Geist]">Foreground</p>
        <div className="flex w-full justify-around px-5">
          {[
            "black",
            "red",
            "green",
            "yellow",
            "blue",
            "magenta",
            "cyan",
            "white",
          ].map((item) => {
            return (
              <div
                style={{ backgroundColor: item }}
                className="w-5 aspect-square rounded-full border-1"
              ></div>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-around items-center h-20 mx-5 border-1 py-3 bg-[#121212] border-[#3b3b3b] rounded-4xl gap-2 p-1 overflow-hidden">
        <p className="font-[Geist]">Background</p>
        <div className="flex w-full justify-around px-5">
          {[
            "black",
            "red",
            "green",
            "yellow",
            "blue",
            "magenta",
            "cyan",
            "white",
          ].map((item) => {
            return (
              <div
                style={{ backgroundColor: item }}
                className="w-5 aspect-square rounded-full border-1"
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Settings;

const CharSelect = ({ brush, setBrush }: { brush: string; setBrush: any }) => {
  const iref = useRef<any>(null);
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <div
        onClick={() => {
          iref.current?.focus();
        }}
        className="w-30 aspect-square bg-[rgba(0,0,0,0.3)] border-3 border-[#2b2b2b] focus-within:border-blue-600 overflow-hidden cursor-pointer rounded-3xl flex justify-center items-center text-7xl font-[Hack] transition-all duration-200"
      >
        <div className="w-full flex justify-center border-y-1 border-[#2b2b2b]">
          <div className="w-[calc(1ch_+_2px)] h-fit border-x-1 border-[#2b2b2b]">
            <input
              ref={iref}
              placeholder="#"
              className="w-[calc(7.5rem_-_1ch_-_2px)] caret-transparent cursor-pointer"
              value={brush}
              onChange={(e) => {
                if (e.target.value == "") {
                  setBrush(" ");
                } else {
                  setBrush(e.target.value[e.target.value.length - 1]);
                }
              }}
            />
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
