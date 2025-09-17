import { useState } from "react";

function App() {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 12 }, () => Array(20).fill(" ")),
  );

  const [brush, setBrush] = useState<string>("$");

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleDrawing = (r: number, c: number) => {
    setGrid((prev) =>
      prev.map((row, i) =>
        row.map((ch, j) => (i === r && j === c ? brush : ch)),
      ),
    );
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen w-screen sm:py-0 py-5 pb-0">
      <div className="w-full h-full flex gap-15 sm:my-0 my-10 sm:flex-col-reverse flex-col justify-center items-center">
        <div className="border-1 border-[rgba(255,255,255,0.4)] sm:px-14 px-8 sm:py-12 py-9 rounded-2xl w-fit">
          <img src="header.svg" alt="header" className="w-70" />
        </div>
        <div className="sm:w-[90%] w-[80%] aspect-square flex justify-center items-center">
          <pre
            className="text-white w-fit font-mono leading-[1em] text-3xl cursor-crosshair select-none border-1 border-[rgba(255,255,255,0.4)]"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
          >
            {grid.map((row: string[], r: number) => (
              <div key={r} className="flex">
                {row.map((ch, c) => (
                  <span
                    key={c}
                    onMouseOver={() => isDrawing && handleDrawing(r, c)}
                    onMouseDown={() => handleDrawing(r, c)}
                    onClick={() => handleDrawing(r, c)}
                    className="border-[0.001em] border-[rgba(255,255,255,0.06)] hover:bg-[#1b1b1b]"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        </div>
      </div>
      <div className="h-full w-1 bg-[#292929] sm:block hidden"></div>
      <div className="w-full h-full sm:px-10 px-0 flex justify-center items-center">
        <div className="text-white w-full sm:h-[65%] h-full border-1 sm:border-b-1 sm:border-t-1 border-t-2 border-b-0 border-[rgba(255,255,255,0.4)] rounded-3xl sm:rounded-b-3xl rounded-b-[0]"></div>
      </div>
    </div>
  );
}

export default App;
