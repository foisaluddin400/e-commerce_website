"use client"

import React, { useState, useRef } from "react"
import { Rnd } from "react-rnd"
import { Upload, Type, Palette, X, Eye, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"

export default function TShirtDesigner() {
  const [activeTab, setActiveTab] = useState("uploads")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [tshirtColor, setTshirtColor] = useState("#ffffff")

  const [texts, setTexts] = useState([
    { id: 1, text: "Your Text", size: 24, color: "#000000", bold: false, italic: false, underline: false, rotation: 0, x: 50, y: 50 },
  ])
  const [selectedTextId, setSelectedTextId] = useState(1)
  const textRef = useRef(null)

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedImage(URL.createObjectURL(file))
    }
  }

  // Update a text
  const updateText = (id, newProps) => {
    setTexts(texts.map(t => t.id === id ? { ...t, ...newProps } : t))
  }

  // Add new text
  const addNewText = () => {
    const newId = texts.length ? Math.max(...texts.map(t => t.id)) + 1 : 1
    setTexts([...texts, { id: newId, text: "New Text", size: 24, color: "#000000", bold: false, italic: false, underline: false, rotation: 0, x: 50, y: 50 }])
    setSelectedTextId(newId)
  }

  // Delete text
  const removeText = (id) => {
    setTexts(texts.filter(t => t.id !== id))
    if (selectedTextId === id && texts.length > 1) setSelectedTextId(texts[0].id)
  }

  // Rotate
  const startRotate = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = textRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - centerX
      const dy = moveEvent.clientY - centerY
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      updateText(id, { rotation: angle })
    }

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  const selectedText = texts.find(t => t.id === selectedTextId)

  const tabs = [
    { id: "uploads", label: "Uploads" },
    { id: "colors", label: "Colors" },
    { id: "text", label: "Text" },
  ]

  return (
    <div className="flex h-screen  container mx-auto">
      {/* Sidebar */}
      <div className="w-16 bg-gray-800 flex flex-col">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`h-16 w-16 flex flex-col items-center justify-center text-xs ${
              activeTab === tab.id ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="w-80 bg-white border-r border-gray-300 overflow-y-auto p-4">
        {activeTab === "uploads" && (
          <div>
            <h3 className="text-lg font-bold mb-2">Upload Image</h3>
            <input type="file" onChange={handleImageUpload} className="border p-2 w-full" />
          </div>
        )}

        {activeTab === "colors" && (
          <div>
            <h3 className="text-lg font-bold mb-2">T-shirt Colors</h3>
            <div className="grid grid-cols-6 gap-2">
              {["#000000","#ffffff","#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff","#ffa500","#800080","#008000","#ffc0cb"].map(color => (
                <button key={color} className="h-8 w-8 rounded-full border-2 border-gray-300" style={{ backgroundColor: color }} onClick={() => setTshirtColor(color)} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "text" && selectedText && (
          <div>
            <h3 className="text-lg font-bold mb-2">Text Settings</h3>
            <input
              type="text"
              value={selectedText.text}
              onChange={e => updateText(selectedText.id, { text: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="range"
              min={12} max={72}
              value={selectedText.size}
              onChange={e => updateText(selectedText.id, { size: Number(e.target.value) })}
              className="w-full mb-2"
            />
            <div className="flex gap-2 mb-2">
              <button
                className={`border p-1 ${selectedText.bold ? "bg-gray-800 text-white" : ""}`}
                onClick={() => updateText(selectedText.id, { bold: !selectedText.bold })}
              >B</button>
              <button
                className={`border p-1 ${selectedText.italic ? "bg-gray-800 text-white" : ""}`}
                onClick={() => updateText(selectedText.id, { italic: !selectedText.italic })}
              >I</button>
              <button
                className={`border p-1 ${selectedText.underline ? "bg-gray-800 text-white" : ""}`}
                onClick={() => updateText(selectedText.id, { underline: !selectedText.underline })}
              >U</button>
            </div>
            <input
              type="color"
              value={selectedText.color}
              onChange={e => updateText(selectedText.id, { color: e.target.value })}
              className="w-full h-8 mb-2"
            />
            <button className="border p-2 w-full bg-gray-200 mb-2" onClick={addNewText}>Add New Text</button>
            <button className="border p-2 w-full bg-red-500 text-white" onClick={() => removeText(selectedText.id)}>Delete Selected Text</button>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center">
        <div className="relative w-full h-[90vh] bg-white border-2 border-gray-300">
          <div className="absolute inset-0" style={{ backgroundColor: tshirtColor }}></div>

          {uploadedImage && (
            <Rnd default={{ x: 50, y: 50, width: 100, height: 100 }} bounds="parent">
              <img src={uploadedImage} alt="Custom" className="w-full h-full object-contain" />
            </Rnd>
          )}

          {texts.map(t => (
            <Rnd
              key={t.id}
              default={{ x: t.x, y: t.y, width: t.text.length * t.size * 0.6, height: t.size + 10 }}
              bounds="parent"
              onDragStop={(e, d) => updateText(t.id, { x: d.x, y: d.y })}
              onClick={() => setSelectedTextId(t.id)}
            >
              <div
                ref={t.id === selectedTextId ? textRef : null}
                style={{
                  fontSize: t.size,
                  color: t.color,
                  fontWeight: t.bold ? "bold" : "normal",
                  fontStyle: t.italic ? "italic" : "normal",
                  textDecoration: t.underline ? "underline" : "none",
                  textAlign: "center",
                  userSelect: "none",
                  cursor: "move",
                  transform: `rotate(${t.rotation}deg)`,
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {t.text}
                {t.id === selectedTextId && (
                  <div
                    onMouseDown={(e) => startRotate(e, t.id)}
                    style={{
                      width: 12, height: 12, borderRadius: "50%", background: "red",
                      position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", cursor: "grab"
                    }}
                  />
                )}
              </div>
            </Rnd>
          ))}
        </div>
      </div>

      {/* Product Preview */}
      <div className="w-80 bg-white border-l border-gray-300 p-6">
        <div className="space-y-4">
          <div className="relative overflow-hidden">
            <img src="/person-beige-tshirt.png" alt="T-shirt preview" className="w-full h-auto" />
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
              Step up your game in this winning style! Dominate sweat like a champ and amp up your team's performance
              level.
            </p>
            <div className="flex gap-2 mt-2">
              <Link to={'/allProduct/productDetails/design/saveDesign'}><button className="flex-1 bg-gray-800 text-white p-2">Save / Share</button></Link>
              <Link to={'/allProduct/productDetails/design/getPrice'}><button className="flex-1 border p-2">Get Price</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
