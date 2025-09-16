// import React, { useRef, useEffect, useState } from "react";
// import { Stage, Layer, Text, Image } from "react-konva";
const Testing = () => {
// const stageRef = useRef(null);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const img = new window.Image();
//     img.src = "https://via.placeholder.com/100";
//     img.onload = () => setImage(img);
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new window.Image();
//         img.onload = () => setImage(img);
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  return (
    <div>
      {/* <Stage width={600} height={400} ref={stageRef}>
        <Layer>
          <Text
            text="Editable Text"
            x={50}
            y={50}
            fontSize={20}
            draggable
            fill="black"
          />
          {image && (
            <Image
              image={image}
              x={200}
              y={100}
              width={100}
              height={100}
              draggable
            />
          )}
        </Layer>
      </Stage>
      <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
    </div>
  );
};

export default Testing;