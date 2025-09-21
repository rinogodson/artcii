import { Eye, EyeClosed, GripVertical, Layers2, Plus, X } from "lucide-react";
import { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
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
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(layers);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setLayers(reordered);

    if (result.source.index === selectedLayer) {
      setSelectedLayer(result.destination.index);
    } else if (
      result.source.index < selectedLayer &&
      result.destination.index >= selectedLayer
    ) {
      setSelectedLayer((prev: number) => prev - 1);
    } else if (
      result.source.index > selectedLayer &&
      result.destination.index <= selectedLayer
    ) {
      setSelectedLayer((prev: number) => prev + 1);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)] rounded-[0.75rem] overflow-hidden border-1 border-black">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="layers">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {layers.map((item, i) => (
                  <Draggable key={i} draggableId={`layer-${i}`} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="h-10"
                      >
                        <Layer
                          i={i}
                          selected={selectedLayer}
                          setSelected={setSelectedLayer}
                          setLayers={setLayers}
                          layer={item}
                          dragprops={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="w-full h-10 flex justify-around">
        <div
          onClick={() => {
            if (layers.length <= 1) return;

            const newLayers = layers.filter((_, idx) => idx !== selectedLayer);

            let newSelected = selectedLayer;
            if (selectedLayer >= newLayers.length) {
              newSelected = newLayers.length - 1;
            }

            setLayers(newLayers);
            setSelectedLayer(newSelected);
          }}
          className="flex justify-center items-center gap-2 hover:bg-[#3b2b2b] cursor-pointer px-3 rounded-full"
        >
          <X />
          <p>Delete</p>
        </div>
        <div
          onClick={() => {
            if (layers.length === 0) return;

            const newLayer = {
              name: `Layer ${layers.length + 1}`,
              show: true,
              g: Array.from({ length: layers[0].g.length }, () =>
                Array(layers[0].g[0].length).fill({
                  c: " ",
                  bg: "transparent",
                  fg: "#ffffff",
                }),
              ),
            };

            setLayers((prev: any[]) => [...prev, newLayer]);
            setSelectedLayer(layers.length);
          }}
          className="flex justify-center items-center gap-2 hover:bg-[#2b2b2b] cursor-pointer px-3 rounded-full"
        >
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
  dragprops,
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
  dragprops: any;
}) => {
  const [readOnly, setReadOnly] = useState<boolean>(true);
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
        <input
          onClick={() => {
            setReadOnly(false);
          }}
          readOnly={readOnly}
          onBlur={() => setReadOnly(true)}
          value={layer.name}
          onChange={(e) => {
            setLayers((prev: any[]) =>
              prev.map((l, idx) =>
                idx === i ? { ...l, name: e.target.value } : l,
              ),
            );
          }}
          style={
            !readOnly
              ? {
                  background: "rgba(0,0,0,0.4)",
                  paddingInline: "0.5em",
                  width: "15ch",
                }
              : {}
          }
          className="whitespace-nowrap overflow-hidden overflow-ellipsis w-[11ch]"
        />
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
        <div {...dragprops}>
          <GripVertical color="rgba(255,255,255,0.2)" />
        </div>
      </div>
    </div>
  );
};

export default Layers;
