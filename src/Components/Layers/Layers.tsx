import { Eye, EyeClosed, GripVertical, Layers2, Plus, X } from "lucide-react";

function Layers({
  layers,
  setLayers,
  selectedLayer,
  setSelectedLayer,
}: {
  layers: {
    name: string;
    show: boolean;
    g: { c: string; bg: string; fg: string }[][];
  }[];
  setLayers: any;
  selectedLayer: number;
  setSelectedLayer: any;
}) {
  return (
    <>
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)] rounded-[0.75rem] overflow-hidden border-1 border-black">
        {layers.map((item, i) => (
          <Layer
            i={i}
            selected={selectedLayer}
            setSelected={setSelectedLayer}
            setLayers={setLayers}
            layer={item}
          />
        ))}
      </div>
      <div className="w-full h-10 flex justify-around">
        <div className="flex justify-center items-center gap-2 hover:bg-[#2b2b2b] cursor-pointer px-3 rounded-full">
          <X />
          <p>Delete</p>
        </div>
        <div className="flex justify-center items-center gap-2 hover:bg-[#2b2b2b] cursor-pointer px-3 rounded-full">
          <Plus />
          <p>New Layer</p>
        </div>
      </div>
    </>
  );
}

const Layer = ({
  layer,
  i,
  setLayers,
  selected,
  setSelected,
}: {
  layer: {
    name: string;
    show: boolean;
    g: { c: string; bg: string; fg: string }[][];
  };
  i: number;
  setLayers: any;
  selected: number;
  setSelected: any;
}) => {
  return (
    <div
      onClick={() => {
        setSelected(i);
      }}
      style={{
        color: layer.show ? "white" : "#ababab",
        backgroundColor:
          selected === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
      }}
      className="font-[Geist] px-2 h-10 w-full border-b-1 border-black flex justify-between items-center"
    >
      <div className="flex gap-2">
        <Layers2 size={23} />
        <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-[14ch]">
          {layer.name}
        </p>
      </div>
      <div className="flex gap-2">
        <div
          onClick={() => {
            setLayers((prev: any[]) =>
              prev.map((l, idx) => (idx === i ? { ...l, show: !l.show } : l)),
            );
          }}
        >
          {layer.show ? <Eye /> : <EyeClosed />}
        </div>
        <GripVertical color="rgba(255,255,255,0.2)" />
      </div>
    </div>
  );
};

export default Layers;
