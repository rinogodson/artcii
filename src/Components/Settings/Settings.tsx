import { ChevronDown, RotateCw, X } from "lucide-react";
import Input from "./Input/Input";
import Button from "../Button/Button";
import { useRef, useState } from "react";
import { EmojiPicker } from "frimousse";
import { boxs, intersects, specialBoxes } from "../../lib/boxes";

function Settings({
  dimensions,
  setDimensions,
  brush,
  setBrush,
  colors,
  setColors,
}: {
  dimensions: { rows: number; cols: number };
  setDimensions: any;
  brush: string;
  setBrush: any;
  colors: { fg: string; bg: string };
  setColors: any;
}) {
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
  const [isSpecialOpen, setIsSpecialOpen] = useState<boolean>(false);

  const [boxOptions, setBoxOptions] = useState({
    boxSet: 0,
    specialChar: 0,
    cornerChar: "1121",
    cornerChartype: 1,
  });

  const getCornerChar = (val: string, isVert: boolean, type: number) => {
    if (val === "0") return " ";
    if (val === "1") return isVert ? "│" : "─";
    if (val === "2") {
      if (type === 1) return isVert ? "┃" : "━";
      if (type === 2) return isVert ? "║" : "═";
    }
    return "d";
  };

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
                setIsEmojiOpen(false);
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
          <BoxChar setBrush={setBrush} c={boxs[boxOptions.boxSet].corner1} />
          <BoxChar setBrush={setBrush} c={boxs[boxOptions.boxSet].hori} />
          <BoxChar setBrush={setBrush} c={boxs[boxOptions.boxSet].corner2} />
          <BoxChar setBrush={setBrush} c={boxs[boxOptions.boxSet].vert} />
          <BoxChar setBrush={setBrush} c={boxs[boxOptions.boxSet].corner3} />
          <div className="[grid-area:2/2/3/4] overflow-hidden w-full grid grid-cols-[3fr_1.6fr] h-full hover:bg-[#252525] cursor-pointer bg-[#222222] text-[Hack] text-2xl rounded-[1.6em]">
            <div
              onClick={() => setBrush(specialBoxes[boxOptions.specialChar])}
              className="w-full h-full flex justify-center items-center"
            >
              {specialBoxes[boxOptions.specialChar]}
            </div>
            <div
              onClick={() => setIsSpecialOpen(!isSpecialOpen)}
              style={{
                background: isSpecialOpen ? "rgba(255,255,255,0.1)" : "",
              }}
              className="w-full h-full flex justify-center items-center border-l-1 border-[rgba(255,255,255,0.1)] "
            >
              <ChevronDown size={17} />
            </div>
          </div>

          {isSpecialOpen && (
            <div className="absolute overflow-scroll p-3 flex z-100 border-neutral-700 border-1 w-55 h-60 rounded-2xl translate-y-23 translate-x-12 bg-neutral-900">
              <div className="w-full h-full grid grid-cols-5 gap-2 place-items-center mb-10">
                {specialBoxes.map((item, i) => (
                  <div
                    onClick={() => {
                      setBoxOptions((p) => ({ ...p, specialChar: i }));
                      setIsSpecialOpen(false);
                      setBrush(item);
                    }}
                    className="border-1 font-[Hack] w-full p-1 rounded-[5px] hover:bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.1)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            onClick={() => {
              setBoxOptions((p) => {
                const nextSet = (p.boxSet + 1) % boxs.length;
                return { ...p, boxSet: nextSet };
              });
            }}
            className="w-full bg-[#121212]"
          >
            <button className="flex justify-center items-center w-full h-full active:scale-95 bg-linear-to-b to-[#0a0a0a] from-[#121212] text-[#cbcbcb] border-1 border-[#2b2b2b] rounded-3xl text-xl transition-all duration-200">
              <RotateCw />
            </button>
          </div>
          <BoxChar setBrush={setBrush} c={boxs[boxOptions.boxSet].corner4} />
        </div>
        <div className="justify-end flex h-26 mx-5 border-1 border-l-0 bg-[#121212] border-[#3b3b3b] rounded-4xl rounded-l-[0] gap-1 p-2">
          <div className="font-[Geist] relative grid grid-cols-2 grid-rows-2 p-1 h-full aspect-square bg-[#111111] shadow-[0_0_10px_rgba(0,0,0,0.1)] border-1 border-[#4b4b4b] rotate-45 scale-120 rounded-[1.5rem]">
            <div
              onClick={() => {
                setBoxOptions((p) => {
                  const idx = 0;
                  const nextSet = (Number(p.cornerChar[idx]) + 1) % 3;
                  const cornerc =
                    p.cornerChar.slice(0, idx) +
                    nextSet.toString() +
                    p.cornerChar.slice(idx + 1);

                  return { ...p, cornerChar: cornerc };
                });
              }}
              className="hover:bg-[#2a2a2a] hover:z-50 active:bg-[#1b1b1b] active:scale-120 transition-all duration-150 cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-b-[0]"
            >
              {getCornerChar(
                boxOptions.cornerChar[0],
                true,
                boxOptions.cornerChartype,
              )}
            </div>
            <div
              onClick={() => {
                setBoxOptions((p) => {
                  const idx = 3;
                  const nextSet = (Number(p.cornerChar[idx]) + 1) % 3;
                  const cornerc =
                    p.cornerChar.slice(0, idx) +
                    nextSet.toString() +
                    p.cornerChar.slice(idx + 1);

                  return { ...p, cornerChar: cornerc };
                });
              }}
              className="hover:bg-[#2a2a2a] hover:z-50 active:bg-[#1b1b1b] active:scale-120 transition-all duration-150 cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-l-[0]"
            >
              {getCornerChar(
                boxOptions.cornerChar[3],
                false,
                boxOptions.cornerChartype,
              )}
            </div>
            <div
              onClick={() => {
                setBoxOptions((p) => {
                  const idx = 2;
                  const nextSet = (Number(p.cornerChar[idx]) + 1) % 3;
                  const cornerc =
                    p.cornerChar.slice(0, idx) +
                    nextSet.toString() +
                    p.cornerChar.slice(idx + 1);

                  return { ...p, cornerChar: cornerc };
                });
              }}
              className="hover:bg-[#2a2a2a] hover:z-50  active:bg-[#1b1b1b] active:scale-120 transition-all duration-150 cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-r-[0]"
            >
              {getCornerChar(
                boxOptions.cornerChar[2],
                false,
                boxOptions.cornerChartype,
              )}
            </div>
            <div
              onClick={() => {
                setBoxOptions((p) => {
                  const idx = 1;
                  const nextSet = (Number(p.cornerChar[idx]) + 1) % 3;
                  const cornerc =
                    p.cornerChar.slice(0, idx) +
                    nextSet.toString() +
                    p.cornerChar.slice(idx + 1);

                  return { ...p, cornerChar: cornerc };
                });
              }}
              className="hover:bg-[#2a2a2a] hover:z-50  active:bg-[#1b1b1b] active:scale-120 transition-all duration-150 cursor-pointer bg-[#1b1b1b] rounded-[1.25em] flex justify-center items-center rotate-[-45deg] rounded-t-[0]"
            >
              {getCornerChar(
                boxOptions.cornerChar[1],
                true,
                boxOptions.cornerChartype,
              )}
            </div>
            <div
              onClick={() => {
                setBoxOptions((p: any) => ({
                  ...p,
                  cornerChartype: p.cornerChartype == 1 ? 2 : 1,
                }));
                setBrush(
                  intersects.map((item) => {
                    if (item.code === boxOptions.cornerChar) {
                      return boxOptions.cornerChartype === 1
                        ? item.char === " " || item.char === ""
                          ? " "
                          : item.char
                        : item.char2 === " " || item.char2 === ""
                          ? " "
                          : item.char2;
                    }
                  }),
                );
              }}
              className="font-[Hack] hover:scale-110 z-100 active:scale-100 transition-all duration-150 cursor-pointer bg-[#2b2b2b] border-1 border-[#3b3b3b] rounded-full w-11 aspect-square absolute left-[50%] translate-x-[-50%] translate-y-[50%] bottom-[50%] rotate-[-45deg] flex justify-center items-center"
            >
              {intersects.map((item) => {
                if (item.code === boxOptions.cornerChar) {
                  return (
                    <div>
                      {boxOptions.cornerChartype === 1
                        ? item.char === " " || item.char === ""
                          ? "no"
                          : item.char
                        : item.char2 === " " || item.char2 === ""
                          ? "no"
                          : item.char2}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <Title title="Colors" />
      <div className="flex flex-col justify-around items-center h-20 mx-5 border-1 py-3 bg-[#121212] border-[#3b3b3b] rounded-4xl gap-2 p-1 overflow-hidden">
        <p className="font-[Geist]">Foreground</p>
        <div className="flex w-full justify-around px-5">
          {[
            "white",
            "black",
            "red",
            "green",
            "yellow",
            "blue",
            "magenta",
            "cyan",
          ].map((item) => {
            return (
              <div
                style={{
                  backgroundColor: item,
                  borderColor: colors.fg == item ? "white" : "#2b2b2b",
                  scale: colors.fg == item ? 1.1 : 1,
                }}
                onClick={() => {
                  setColors((p: any) => ({ ...p, fg: item }));
                }}
                className="w-5 aspect-square rounded-full border-2 transition-all duration-100"
              ></div>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-around items-center h-20 mx-5 border-1 py-3 bg-[#121212] border-[#3b3b3b] rounded-4xl gap-2 p-1 overflow-hidden">
        <p className="font-[Geist]">Background</p>
        <div className="flex w-full justify-around px-5">
          {[
            "white",
            "transparent",
            "black",
            "red",
            "green",
            "yellow",
            "blue",
            "magenta",
            "cyan",
          ].map((item) => {
            return (
              <div
                style={{
                  backgroundColor: item,
                  borderColor: colors.bg == item ? "white" : "#2b2b2b",
                  scale: colors.bg == item ? 1.1 : 1,
                }}
                onClick={() => {
                  setColors((p: any) => ({ ...p, bg: item }));
                }}
                className="w-5 aspect-square rounded-full border-2 border-neutral-700 transition-all duration-100"
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
    <div className="font-[Hack] flex justify-center items-center flex-col gap-2">
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

const BoxChar = ({ c, setBrush }: { c: string; setBrush: any }) => {
  return (
    <div
      onClick={() => {
        setBrush(c);
      }}
      className="w-full h-full hover:bg-[#252525] cursor-pointer bg-[#222222] flex justify-center items-center text-[Hack] text-2xl rounded-[1.6em]"
    >
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
