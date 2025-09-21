import { useEffect, useRef, useState } from "react";
import Settings from "./Components/Settings/Settings";
import Layers from "./Components/Layers/Layers";
import { Brush, Eraser, PaintBucket } from "lucide-react";
import { ExportSection } from "./Components/ExportSection/ExportSection";

const ROWS = 12;
const COLS = 20;

function App() {
  const [dimensions, setDimensions] = useState<{ rows: number; cols: number }>({
    rows: ROWS,
    cols: COLS,
  });
  const [grid, setGrid] = useState<{ c: string; bg: string; fg: string }[][]>(
    Array.from({ length: ROWS }, () =>
      Array(COLS).fill({ c: " ", bg: "transparent", fg: "#ffffff" }),
    ),
  );

  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const [layers, setLayers] = useState<
    {
      name: string;
      show: boolean;
      g: typeof grid;
    }[]
  >([
    {
      name: "Layer 1",
      show: true,
      g: Array.from({ length: ROWS }, () =>
        Array(COLS).fill({
          c: " ",
          bg: "transparent",
          fg: "#ffffff",
        }),
      ),
    },
    {
      name: "Layer 2",
      show: true,
      g: Array.from({ length: ROWS }, () =>
        Array(COLS).fill({
          c: " ",
          bg: "transparent",
          fg: "#ffffff",
        }),
      ),
    },
  ]);

  const [tool, setTool] = useState<number>(0);

  const [wState, setWState] = useState<{
    x: number;
    y: number;
    zoom: number;
    isPanning: boolean;
    isPanningMode: boolean;
    isDrawing: boolean;
  }>({
    x: 0,
    y: 0,
    zoom: 1,
    isPanning: false,
    isPanningMode: false,
    isDrawing: false,
  });

  const [brush, setBrush] = useState<string>("#");

  const zoomRef = useRef<HTMLDivElement>(null);
  const panStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const newGrid = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill({ c: " ", bg: "transparent", fg: "#ffffff" }),
    );
    // frontside layers overlapps
    for (let layerIdx = layers.length - 1; layerIdx >= 0; layerIdx--) {
      const layer = layers[layerIdx];
      if (!layer.show) continue;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = layer.g[r][c];
          // the bg will be considered
          if (cell.c !== " " || cell.bg !== "transparent") {
            newGrid[r][c] = cell;
          }
        }
      }
    }

    setGrid(newGrid);
  }, [layers]);

  const handleDrawing = (r: number, c: number, char: string) => {
    if (wState.isPanningMode) return;

    setLayers((prevLayers) =>
      prevLayers.map((layer, idx) => {
        if (idx !== selectedLayer) return layer;
        const newGrid = layer.g.map((row, i) =>
          row.map((cell, j) =>
            i === r && j === c ? { ...cell, c: char } : cell,
          ),
        );

        return { ...layer, g: newGrid };
      }),
    );
  };

  // the rows and cols changing logic, it's a bit complicated... ye
  useEffect(() => {
    setGrid((prev) => {
      return Array.from({ length: dimensions.rows }, (_, r) =>
        Array.from(
          { length: dimensions.cols },
          (_, c) =>
            prev[r]?.[c] ?? { c: " ", bg: "transparent", fg: "#ffffff" },
        ),
      );
    });
  }, [dimensions]);

  // everything under this is either a shortcut setting or a panning and zooming control
  // don't touch it if you don't need to, do what i say..!

  //zooming logic
  useEffect(() => {
    const el = zoomRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setWState((p) => ({
        ...p,
        zoom: Math.max(0.5, p.zoom + delta),
      }));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  //panning logic
  useEffect(() => {
    const el = zoomRef.current;
    if (!el) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (!wState.isPanningMode) return;
      setWState((p) => ({ ...p, isPanning: true }));
      panStart.current = { x: e.clientX - wState.x, y: e.clientY - wState.y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!wState.isPanning) return;
      setWState((p) => ({
        ...p,
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      }));
    };

    const handleMouseUp = () => setWState((p) => ({ ...p, isPanning: false }));

    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [wState.isPanning, wState.isPanningMode, wState.x, wState.y]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setWState((p) => ({ ...p, isPanningMode: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setWState((p) => ({ ...p, isPanningMode: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  //the ctrl/cmd + +/- shortcuts useeffect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        setWState((p) => ({ ...p, zoom: Math.min(5, p.zoom + 0.1) }));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setWState((p) => ({ ...p, zoom: Math.max(0.5, p.zoom - 0.1) }));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        setWState((p) => ({ ...p, zoom: 1 }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // CAN TOUCH CODE UNDER THIS

  return (
    <>
      <div className="overflow-hidden sm:grid grid-cols-[20vw_60vw_20vw] grid-rows-[100vh] flex flex-col sm:flex-row h-[calc(100vh_-_1.5em)] w-screen sm:py-0 py-5 pb-0">
        <div className="flex flex-col w-full min-w-[20em] sm:h-full h-fit justify-start items-center z-100">
          <div className="border-1 m-10 border-[rgba(255,255,255,0.4)] bg-black sm:px-7 px-8 sm:py-7 py-9 rounded-2xl w-fit h-fit">
            <img src="header.svg" alt="header" className="w-70" />
          </div>
          <div className="gap-3 flex flex-col p-3 shadow-[0_0_50px_rgba(0,0,0,1)] bg-[rgba(40,40,40,0.6)] backdrop-blur-2xl w-[90%] h-fit min-h-100 rounded-3xl border-1 border-[rgba(255,255,255,0.2)]">
            <Layers
              selectedLayer={selectedLayer}
              setSelectedLayer={setSelectedLayer}
              layers={layers}
              setLayers={setLayers}
            />
          </div>
        </div>
        <div
          ref={zoomRef}
          className="cursor-crosshair w-full h-full flex gap-15 sm:my-0 my-10 sm:flex-col-reverse flex-col justify-center items-center"
        >
          <div className="w-[100%] h-full aspect-square flex justify-center items-center p-1">
            <div
              style={{
                transform: `translate(${wState.x}px, ${wState.y}px) scale(${wState.zoom})`,
              }}
              className="w-fit h-fit border-1 border-[rgba(255,255,255,0.3)] p-2 rounded-[0.6em] transition-all duration-1"
            >
              <div className="w-fit h-fit border-1 border-[rgba(255,255,255,0.1)]">
                <pre
                  className="w-fit font-[Hack] leading-[1em] sm:text-4xl text-3xl select-none"
                  onMouseDown={() =>
                    setWState((p) => ({ ...p, isDrawing: true }))
                  }
                  onMouseUp={() =>
                    setWState((p) => ({ ...p, isDrawing: false }))
                  }
                  onMouseLeave={() =>
                    setWState((p) => ({ ...p, isDrawing: false }))
                  }
                >
                  {grid.map((row: (typeof grid)[0], r: number) => (
                    <div key={r} className="flex">
                      {row.map((ch: (typeof grid)[0][0], c) => (
                        <span
                          key={c}
                          style={{
                            color: ch.fg,
                            background: ch.bg === "transparent" ? "" : ch.bg,
                          }}
                          onMouseOver={() =>
                            wState.isDrawing &&
                            handleDrawing(r, c, tool == 0 ? brush : " ")
                          }
                          onMouseDown={() =>
                            handleDrawing(r, c, tool == 0 ? brush : " ")
                          }
                          onClick={() =>
                            handleDrawing(r, c, tool == 0 ? brush : " ")
                          }
                          onContextMenu={(e) => {
                            e.preventDefault();
                            handleDrawing(r, c, " ");
                          }}
                          className="w-[1ch] border-[0.001em] border-[rgba(255,255,255,0.06)] hover:bg-[#1b1b1b] hover:text-[rgba(255,255,255,0.8)] transition-all duration-50"
                        >
                          {ch.c}
                        </span>
                      ))}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full sm:px-0 px-0 flex justify-end items-center">
          <div className="overflow-scroll overflow-x-hidden shadow-[0_0_50px_rgba(0,0,0,1)] w-full min-w-[20em] text-white bg-[rgba(40,40,40,0.6)] backdrop-blur-2xl z-1000 sm:mr-4 sm:h-[90%] h-full border-1 sm:border-b-1 sm:border-t-1 border-t-2 border-b-0 border-[rgba(255,255,255,0.2)] rounded-3xl sm:rounded-b-3xl rounded-b-[0]">
            <Settings
              brush={brush}
              setBrush={setBrush}
              dimensions={dimensions}
              setDimensions={setDimensions}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[1.5em] bg-[#0b0b0b] border-t-1 border-[#2b2b2b]"></div>
      <div className="shadow-[0_0_50px_rgba(0,0,0,1)] absolute top-[2em] left-[50%] translate-x-[-50%] grid grid-cols-2 place-items-center h-[4em] w-fit p-2 border-1 bg-[rgba(40,40,40,0.6)] backdrop-blur-2xl border-[#3b3b3b] rounded-[1.5rem] gap-2 overflow-hidden">
        <div
          style={{ background: tool == 0 ? "#2b2b2b" : "" }}
          onClick={() => setTool(0)}
          className="cursor-pointer h-full aspect-square flex justify-center items-center rounded-2xl"
        >
          <Brush />
        </div>
        <div
          style={{ background: tool == 1 ? "#2b2b2b" : "" }}
          onClick={() => setTool(1)}
          className="cursor-pointer h-full aspect-square flex justify-center items-center rounded-2xl"
        >
          <Eraser />
        </div>
      </div>
      <ExportSection />
    </>
  );
}

export default App;
