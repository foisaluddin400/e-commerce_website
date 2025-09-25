import React from "react";

const fontOptions = [
  "Arial",
  "Times New Roman",
  "Helvetica",
  "Courier New",
  "Georgia",
  "Verdana",
  "Trebuchet MS",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Oswald",
  "Lobster",
];

const textShapeOptions = [
  "normal",
  "curve",
  "upward",
  "cone",
  "pointed",
  "bulge",
  "bridge",
];

export default function Font({ texts, selectedTextId, updateText, addNewText, removeText }) {
  const selectedText = texts.find((t) => t.id === selectedTextId);

  if (!selectedText) return null;

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Text Settings</h3>
      <input
        type="text"
        value={selectedText.text}
        onChange={(e) =>
          updateText(selectedText.id, { text: e.target.value })
        }
        className="border p-2 w-full mb-2"
        placeholder="Edit Text"
      />
      <select
        value={selectedText.fontFamily}
        onChange={(e) =>
          updateText(selectedText.id, { fontFamily: e.target.value })
        }
        className="border p-2 w-full mb-2"
      >
        {fontOptions.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      <input
        type="color"
        value={selectedText.color}
        onChange={(e) =>
          updateText(selectedText.id, { color: e.target.value })
        }
        className="w-full h-8 mb-2"
      />
      <input
        type="range"
        min={0}
        max={360}
        value={selectedText.rotation}
        onChange={(e) =>
          updateText(selectedText.id, {
            rotation: Number(e.target.value),
          })
        }
        className="w-full mb-2"
      />
      <input
        type="color"
        value={selectedText.outlineColor}
        onChange={(e) =>
          updateText(selectedText.id, { outlineColor: e.target.value })
        }
        className="w-full h-8 mb-2"
        placeholder="Outline Color"
      />
      <input
        type="range"
        min={0}
        max={5}
        value={selectedText.outlineThickness}
        onChange={(e) =>
          updateText(selectedText.id, {
            outlineThickness: Number(e.target.value),
          })
        }
        className="w-full mb-2"
      />
      <select
        value={selectedText.textShape}
        onChange={(e) =>
          updateText(selectedText.id, { textShape: e.target.value })
        }
        className="border p-2 w-full mb-2"
      >
        {textShapeOptions.map((shape) => (
          <option key={shape} value={shape}>
            {shape.charAt(0).toUpperCase() + shape.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="range"
        min={12}
        max={72}
        value={selectedText.size}
        onChange={(e) =>
          updateText(selectedText.id, { size: Number(e.target.value) })
        }
        className="w-full mb-2"
      />
      <div className="flex gap-2 mb-2">
        <button
          className={`border p-1 ${
            selectedText.bold ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() =>
            updateText(selectedText.id, { bold: !selectedText.bold })
          }
        >
          B
        </button>
        <button
          className={`border p-1 ${
            selectedText.italic ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() =>
            updateText(selectedText.id, { italic: !selectedText.italic })
          }
        >
          I
        </button>
        <button
          className={`border p-1 ${
            selectedText.underline ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() =>
            updateText(selectedText.id, {
              underline: !selectedText.underline,
            })
          }
        >
          U
        </button>
      </div>
      <button
        className="border p-2 w-full bg-gray-200 mb-2"
        onClick={addNewText}
      >
        Add New Text
      </button>
      <button
        className="border p-2 w-full bg-red-500 text-white"
        onClick={() => removeText(selectedText.id)}
      >
        Delete Selected Text
      </button>
    </div>
  );
}