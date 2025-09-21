import { Eye, GripVertical, Layers2, Plus, X } from "lucide-react";

function Layers() {
  return (
    <>
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)] rounded-[0.75rem] overflow-hidden border-1 border-black">
        <Layer />
        <Layer />
        <Layer />
        <Layer />
        <Layer />
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

const Layer = () => {
  return (
    <div className="hover:bg-[rgba(255,255,255,0.15)] px-2 bg-[rgba(255,255,255,0.1)] h-10 w-full border-b-1 border-black flex justify-between items-center">
      <div className="flex gap-2">
        <Layers2 size={23} />
        <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-[14ch]">
          Layer 1 adhfkjsdhfjlhsdjlfhdsjlhghafslkhgflhsaljfhjldsfhdjlsh
        </p>
      </div>
      <div className="flex gap-2">
        <Eye />
        <GripVertical color="rgba(255,255,255,0.2)" />
      </div>
    </div>
  );
};

export default Layers;
