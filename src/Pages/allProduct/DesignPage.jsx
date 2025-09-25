import React, { useState } from "react";
import { Link } from "react-router-dom";
import Font from "./Font";
import UploadPhoto from "./UploadPhoto";
import DesignPart from "./DesignPart";
import IconsPanel from "./IconsPanel";
import { Eye, RotateCcw } from "lucide-react";

export default function TShirtDesigner() {
  const [activeTab, setActiveTab] = useState("uploads");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [tshirtColor, setTshirtColor] = useState("#ffffff");

  const [texts, setTexts] = useState([
    {
      id: 1,
      text: "Your Text",
      size: 24,
      color: "#000000",
      bold: false,
      italic: false,
      underline: false,
      rotation: 0,
      x: 50,
      y: 50,
      fontFamily: "Arial",
      outlineColor: "#000000",
      outlineThickness: 1,
      textShape: "normal",
      width: null,
      height: null,
    },
  ]);
  const [icons, setIcons] = useState([]); // New state for icons
  const [selectedTextId, setSelectedTextId] = useState(1);

  const handleImageUpload = (file) => {
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const updateText = (id, newProps) => {
    setTexts(texts.map((t) => (t.id === id ? { ...t, ...newProps } : t)));
  };

  const addNewText = () => {
    const newId = texts.length ? Math.max(...texts.map((t) => t.id)) + 1 : 1;
    setTexts([
      ...texts,
      {
        id: newId,
        text: "New Text",
        size: 24,
        color: "#000000",
        bold: false,
        italic: false,
        underline: false,
        rotation: 0,
        x: 50,
        y: 50,
        fontFamily: "Arial",
        outlineColor: "#000000",
        outlineThickness: 1,
        textShape: "normal",
        width: null,
        height: null,
      },
    ]);
    setSelectedTextId(newId);
  };

  const removeText = (id) => {
    setTexts(texts.filter((t) => t.id !== id));
    if (selectedTextId === id && texts.length > 1)
      setSelectedTextId(texts[0].id);
  };

  const addIcon = (iconName) => {
    const newId = icons.length ? Math.max(...icons.map((i) => i.id)) + 1 : 1;
    setIcons([
      ...icons,
      {
        id: newId,
        name: iconName,
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        rotation: 0,
      },
    ]);
  };

  const updateIcon = (id, newProps) => {
    setIcons(icons.map((i) => (i.id === id ? { ...i, ...newProps } : i)));
  };

  const removeIcon = (id) => {
    setIcons(icons.filter((i) => i.id !== id));
  };

  const tabs = [
    { id: "uploads", label: "Uploads" },
    { id: "colors", label: "Colors" },
    { id: "text", label: "Text" },
    { id: "icons", label: "Icons" }, // New tab for icons
  ];

  return (
    <div className="flex h-screen container mx-auto">
      {/* Sidebar */}
      <div className="w-16 bg-gray-800 flex flex-col">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`h-16 w-16 flex flex-col items-center justify-center text-xs ${
              activeTab === tab.id
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="w-80 bg-white border-r border-gray-300 overflow-y-auto p-4">
        {activeTab === "uploads" && <UploadPhoto onUpload={handleImageUpload} />}
        {activeTab === "colors" && (
          <div>
            <h3 className="text-lg font-bold mb-2">T-shirt Colors</h3>
            <div className="grid grid-cols-6 gap-2">
              {[
                "#000000",
                "#ffffff",
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
                "#00ffff",
                "#ffa500",
                "#800080",
                "#008000",
                "#ffc0cb",
              ].map((color) => (
                <button
                  key={color}
                  className="h-8 w-8 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color }}
                  onClick={() => setTshirtColor(color)}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === "text" && (
          <Font
            texts={texts}
            selectedTextId={selectedTextId}
            updateText={updateText}
            addNewText={addNewText}
            removeText={removeText}
          />
        )}
        {activeTab === "icons" && (
          <IconsPanel
            onAddIcon={addIcon}
          />
        )}
      </div>

      {/* Canvas */}
      <DesignPart
        tshirtColor={tshirtColor}
        uploadedImage={uploadedImage}
        texts={texts}
        icons={icons}
        selectedTextId={selectedTextId}
        setSelectedTextId={setSelectedTextId}
        updateText={updateText}
        updateIcon={updateIcon}
        removeIcon={removeIcon}
      />

      {/* Product Preview */}
      <div className="w-80 bg-white border-l border-gray-300 p-6">
        <div className="space-y-4">
          <div className="relative overflow-hidden">
            <img
              src="/person-beige-tshirt.png"
              alt="T-shirt preview"
              className="w-full h-auto"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 border p-2 flex items-center justify-center gap-1">
              <Eye className="h-4 w-4" /> Front
            </button>
            <button className="flex-1 border p-2 flex items-center justify-center gap-1">
              <RotateCcw className="h-4 w-4" /> Back
            </button>
          </div>
          <button className="w-full border p-2 flex items-center justify-center gap-1">
            <Eye className="h-4 w-4" /> Zoom
          </button>
          <div className="pt-4 border-t border-gray-300">
            <h3 className="font-bold">Gildan Softstyle Jersey T-shirt</h3>
            <p className="text-sm text-gray-600 mt-1">
              Step up your game in this winning style! Dominate sweat like a
              champ and amp up your team's performance level.
            </p>
            <div className="flex gap-2 mt-2">
              <Link to={"/allProduct/productDetails/design/saveDesign"}>
                <button className="flex-1 bg-gray-800 text-white p-2">
                  Save / Share
                </button>
              </Link>
              <Link to={"/allProduct/productDetails/design/getPrice"}>
                <button className="flex-1 border p-2">Get Price</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}