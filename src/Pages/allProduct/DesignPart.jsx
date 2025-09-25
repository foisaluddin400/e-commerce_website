import React, { useRef, useState } from "react";
import { Rnd } from "react-rnd";

export default function DesignPart({
  tshirtColor,
  uploadedImage,
  texts,
  icons,
  selectedTextId,
  setSelectedTextId,
  updateText,
  updateIcon,
  removeIcon,
}) {
  const textRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const getShapeDimensions = (text, size, textShape) => {
    const baseWidth = text.length * size * 0.6;
    const baseHeight = size + 10;
    switch (textShape) {
      case "curve":
      case "bridge":
        return { width: baseWidth * 1.5, height: baseHeight * 1.5 };
      case "cone":
      case "pointed":
        return { width: baseWidth * 1.2, height: baseHeight * 1.5 };
      case "bulge":
        return { width: baseWidth * 1.3, height: baseHeight * 1.3 };
      case "upward":
        return { width: baseWidth, height: baseHeight * 1.2 };
      default:
        return { width: baseWidth, height: baseHeight };
    }
  };

  const startRotate = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = textRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - centerX;
      const dy = moveEvent.clientY - centerY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      updateText(id, { rotation: angle });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center">
      <div className="relative w-full h-[90vh] bg-white border-2 border-gray-300">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: tshirtColor }}
        ></div>

        {uploadedImage && (
          <Rnd
            default={{ x: 50, y: 50, width: 100, height: 100 }}
            bounds="parent"
          >
            <img
              src={uploadedImage}
              alt="Custom"
              className="w-full h-full object-contain"
            />
          </Rnd>
        )}

        {/* Render Texts */}
        {texts.map((t) => {
          const { width, height } = getShapeDimensions(
            t.text,
            t.size,
            t.textShape
          );
          const isSelected = t.id === selectedTextId;

          return (
            <Rnd
              key={t.id}
              default={{ x: t.x, y: t.y, width: t.width || width, height: t.height || height }}
              bounds="parent"
              enableResizing={isSelected}
              dragHandleClassName={isSelected ? "drag-handle" : ""}
              onResizeStart={() => setIsResizing(true)}
              onResizeStop={(e, direction, ref, delta, position) => {
                setIsResizing(false);
                const newWidth = ref.offsetWidth;
                const newHeight = ref.offsetHeight;
                const currentSize = t.size;
                const widthFactor = newWidth / (t.text.length * currentSize * 0.6);
                const heightFactor = newHeight / (currentSize + 10);
                const newSize = Math.round(currentSize * ((widthFactor + heightFactor) / 2));
                const clampedSize = Math.min(Math.max(newSize, 12), 72);
                updateText(t.id, {
                  x: position.x,
                  y: position.y,
                  width: newWidth,
                  height: newHeight,
                  size: clampedSize,
                });
              }}
              onDragStop={(e, d) => updateText(t.id, { x: d.x, y: d.y })}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTextId(t.id);
              }}
              style={{
                border: (isSelected || isResizing) ? "1px dashed #000" : "none",
                background: "transparent",
              }}
            >
              <div
                ref={t.id === selectedTextId ? textRef : null}
                className={isSelected ? "drag-handle" : ""}
                style={{
                  fontSize: t.size,
                  color: t.color,
                  fontFamily: t.fontFamily,
                  fontWeight: t.bold ? "bold" : "normal",
                  fontStyle: t.italic ? "italic" : "normal",
                  textDecoration: t.underline ? "underline" : "none",
                  textAlign: "center",
                  WebkitTextStroke: `${t.outlineThickness}px ${t.outlineColor}`,
                  userSelect: "none",
                  cursor: "move",
                  transform: `rotate(${t.rotation}deg)`,
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "visible",
                }}
              >
                <span
                  style={{
                    display: "block",
                    ...(t.textShape === "curve" && {
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50% / 50%",
                      transform: "scaleX(1.5) translateY(-30%)",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                    }),
                    ...(t.textShape === "upward" && {
                      transform: `rotate(${t.rotation}deg) scaleY(-1)`,
                    }),
                    ...(t.textShape === "cone" && {
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                      width: "100%",
                      height: "100%",
                    }),
                    ...(t.textShape === "pointed" && {
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                      width: "100%",
                      height: "100%",
                    }),
                    ...(t.textShape === "bulge" && {
                      borderRadius: "50%",
                      padding: "5px",
                      width: "100%",
                      height: "100%",
                    }),
                    ...(t.textShape === "bridge" && {
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50% / 20%",
                      transform: `rotate(${t.rotation}deg) perspective(500px) rotateX(20deg)`,
                      overflow: "visible",
                    }),
                  }}
                >
                  {t.text}
                </span>
                {isSelected && (
                  <div
                    onMouseDown={(e) => startRotate(e, t.id)}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "red",
                      position: "absolute",
                      top: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      cursor: "grab",
                    }}
                  />
                )}
              </div>
            </Rnd>
          );
        })}

        {/* Render Icons */}
        {icons.map((icon) => (
          <Rnd
            key={icon.id}
            default={{ x: icon.x, y: icon.y, width: icon.width, height: icon.height }}
            bounds="parent"
            onDragStop={(e, d) => updateIcon(icon.id, { x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
              updateIcon(icon.id, {
                x: position.x,
                y: position.y,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
              });
            }}
            onClick={() => {/* Handle icon selection if needed */ }}
            style={{
              border: "1px dashed #ccc", // Optional: border for icons
              background: "transparent",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px", // Adjust size based on icon
                transform: `rotate(${icon.rotation}deg)`,
                cursor: "move",
              }}
            >
              {icon.name.split('-')[1] || icon.name} {/* Extract emoji or icon name */}
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}