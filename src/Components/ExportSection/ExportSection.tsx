import { useState } from "react";

export const ExportSection = ({
  grid,
  imageFn,
}: {
  grid: { c: string; bg: string; fg: string }[][];
  imageFn: any;
}) => {
  const [openExport, setOpenExport] = useState<boolean>(false);

  function gridToEcho(g: typeof grid): string {
    function colorCode(fg: string, bg: string): string {
      const fgCode = fg.startsWith("#")
        ? `\x1b[38;2;${parseInt(fg.slice(1, 3), 16)};${parseInt(fg.slice(3, 5), 16)};${parseInt(fg.slice(5, 7), 16)}m`
        : `\x1b[${({ black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37 } as Record<string, number>)[fg] || 37}m`;

      const bgCode = bg.startsWith("#")
        ? `\x1b[48;2;${parseInt(bg.slice(1, 3), 16)};${parseInt(bg.slice(3, 5), 16)};${parseInt(bg.slice(5, 7), 16)}m`
        : `\x1b[${({ black: 40, red: 41, green: 42, yellow: 43, blue: 44, magenta: 45, cyan: 46, white: 47 } as Record<string, number>)[bg] || 40}m`;

      return fgCode + bgCode;
    }

    let result = 'echo "';

    for (const row of g) {
      for (const cell of row) {
        result += `${colorCode(cell.fg, cell.bg)}${cell.c}`;
      }
      result += "\x1b[0m\\n";
    }

    result += '"';
    return result;
  }
  return (
    <div
      style={{ height: openExport ? "240px" : "5rem" }}
      className="font-[Geist] border-1 border-neutral-800 absolute flex justify-end flex-col bottom-10 left-5 w-50 bg-neutral-900 z-1000 p-2 rounded-[2.5rem]"
    >
      {openExport && (
        <>
          <p
            onClick={() => {
              navigator.clipboard.writeText(gridToEcho(grid));
              setOpenExport(false);
              window.alert(
                "echo command copied, paste it on a terminal or make it a bash script.",
              );
            }}
            className="w-full text-xl border-b-1 border-neutral-700 h-12 flex justify-center items-center hover:bg-neutral-800 rounded-t-4xl active:bg-neutral-900"
          >
            Echo Command
          </p>
          <p
            onClick={() => {
              navigator.clipboard.writeText(
                grid
                  .map((row) => row.map((cell) => cell.c).join(""))
                  .join("\n"),
              );
              setOpenExport(false);
            }}
            className="w-full text-xl border-b-1 border-neutral-700 h-12 flex justify-center items-center hover:bg-neutral-800 active:bg-neutral-900"
          >
            Copy Text
          </p>
          <p
            onClick={() => {
              imageFn();
              setOpenExport(false);
            }}
            className="w-full text-xl mb-3 h-12 flex justify-center items-center hover:bg-neutral-800 rounded-b-4xl active:bg-neutral-900"
          >
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
