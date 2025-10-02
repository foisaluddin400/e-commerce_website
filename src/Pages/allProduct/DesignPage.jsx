/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { ImageIcon, Save } from "lucide-react";
import TextControls from "./TextControls";
import DrawingControls from "./DrawingControls";
import ImageIconControls from "./ImageIconControls";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveDesigns } from "../redux/store";
import { CiText } from "react-icons/ci";
import pen from '../../assets/Home/pen.png';
import art from '../../assets/Home/art.png';
import cloud from '../../assets/Home/cloud.png';
import { useGetSingleProductQuery } from "../redux/api/productApi";
import { imageUrl } from "../redux/api/baseApi";
import { toast } from "sonner";

// Load Google Fonts for Pacifico
const loadGoogleFonts = () => {
  const fonts = [
    "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Source Sans Pro",
    "PT Sans", "Ubuntu", "Noto Sans", "Rubik", "Inter", "Fira Sans", "Work Sans",
    "Nunito", "Quicksand", "Muli", "Karla", "Barlow", "Overpass", "Catamaran",
    "Josefin Sans", "Arimo", "Cabin", "Varela Round", "IBM Plex Sans", "Dosis",
    "Oxygen", "Hind", "Asap", "Prompt", "Manrope", "Public Sans", "DM Sans",
    "Jost", "Archivo", "Exo", "Chivo", "Heebo", "Mukta", "Titillium Web",
    "Yantramanav", "Red Hat Display", "Mulish", "Space Grotesk", "Urbanist",
    "Outfit", "Figtree", "Lexend", "Sora", "Merriweather", "Playfair Display",
    "Lora", "Spectral", "Crimson Text", "Bitter", "Cardo", "Vollkorn",
    "EB Garamond", "Noto Serif", "Source Serif Pro", "Libre Baskerville",
    "Domine", "Alegreya", "Cormorant", "Old Standard TT", "Baskervville",
    "Arvo", "Zilla Slab", "Literata", "Gentium Book Basic", "Ibarra Real Nova",
    "Sorts Mill Goudy", "Neuton", "Aleo", "Prata", "Cinzel", "Vidaloka",
    "Yeseva One", "Faustina", "Rosarivo", "Fanwood Text", "IM Fell English",
    "Crimson Pro", "Vesper Libre", "Bangers", "Bebas Neue", "Anton",
    "Abril Fatface", "Lobster", "Oswald", "Alfa Slab One", "Black Ops One",
    "Righteous", "Patua One", "Archivo Black", "Creepster", "Fredericka the Great",
    "Special Elite", "Monoton", "Bungee", "Changa One", "Fjalla One",
    "Passion One", "Russo One", "Teko", "Staatliches", "Squada One",
    "Paytone One", "Ultra", "Bowlby One SC", "Pacifico", "Amatic SC",
    "Shadows Into Light", "Dancing Script", "Indie Flower", "Caveat",
    "Permanent Marker", "Rock Salt", "Covered By Your Grace", "Great Vibes",
    "Sacramento", "Kaushan Script", "Satisfy", "Zeyada", "Tangerine",
    "Allura", "Parisienne", "Berkshire Swash", "Homemade Apple",
    "Cedarville Cursive", "Reenie Beanie", "Annie Use Your Telescope",
    "Coming Soon", "Just Another Hand", "Handlee", "Gochi Hand",
    "Schoolbell", "Crafty Girls", "Kalam", "Neucha", "Patrick Hand",
    "Sue Ellen Francisco", "Waiting for the Sunrise", "Marck Script",
    "Inconsolata", "Source Code Pro", "Fira Code", "Roboto Mono",
    "Space Mono", "IBM Plex Mono", "Ubuntu Mono", "Cousine", "JetBrains Mono",
    "Anonymous Pro", "Overpass Mono", "Victor Mono", "PT Mono",
    "Cutive Mono", "Share Tech Mono"
  ];
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?${fonts
    .map((font) => `family=${font.replace(/\s+/g, "+")}`)
    .join("&")}&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
};
export default function DesignPage() {
  const { id } = useParams();
  const { data: singleProduct, isLoading: isProductLoading, error: productError } = useGetSingleProductQuery({ id });
  console.log("API State:", { singleProduct, isProductLoading, productError });
  console.log(singleProduct)
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [selectedTool, setSelectedTool] = useState("text");
  const [currentSide, setCurrentSide] = useState("front");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [designs, setDesigns] = useState({});
  const [previews, setPreviews] = useState({});
  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(0);
  const [shadowBlur, setShadowBlur] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const dispatch = useDispatch();

  const frontTshirtUrl = singleProduct?.data?.variants[selectedColorIndex]?.frontImage
    ? `${imageUrl}${singleProduct.data.variants[selectedColorIndex].frontImage}`
    : "https://via.placeholder.com/700x700?text=Front+T-Shirt";
  const backTshirtUrl = singleProduct?.data?.variants[selectedColorIndex]?.backImage
    ? `${imageUrl}${singleProduct.data.variants[selectedColorIndex].backImage}`
    : "https://via.placeholder.com/700x700?text=Back+T-Shirt";
  const activeImage = currentSide === "front" ? frontTshirtUrl : backTshirtUrl;

  // Initialize canvas
  const initializeCanvas = () => {
    console.log("Attempting canvas initialization, DOM check:", !!document.querySelector("canvas"));
    if (!canvasRef.current || !document.contains(canvasRef.current)) {
      console.error("Canvas element not found in DOM");
      return null;
    }
    try {
      const canvasInstance = new fabric.Canvas(canvasRef.current, {
        width: 700,
        height: 700,
        isDrawingMode: false,
        backgroundColor: null,
      });

      if (!canvasInstance.getContext()) {
        console.error("Canvas context initialization failed");
        return null;
      }

      console.log("Canvas initialized:", canvasInstance);
      loadGoogleFonts();
      addTextToCanvas(canvasInstance, "Double click to edit");

      canvasInstance.on("selection:created", handleSelection);
      canvasInstance.on("selection:updated", handleSelection);
      canvasInstance.on("selection:cleared", () => setActiveObject(null));
      canvasInstance.on("path:created", (e) => {
        const path = e.path;
        addDeleteControl(path, canvasInstance);
        canvasInstance.renderAll();
      });

      return canvasInstance;
    } catch (error) {
      console.error("Fabric.js initialization error:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("Canvas ref at mount:", canvasRef.current, "DOM check:", !!document.querySelector("canvas"));
    if (!canvas && canvasRef.current && document.contains(canvasRef.current)) {
      const canvasInstance = initializeCanvas();
      setCanvas(canvasInstance);
    }

    return () => {
      if (canvas && canvas.getContext() && !document.contains(canvasRef.current)) {
        console.log("Disposing canvas on unmount");
        canvas.dispose();
        setCanvas(null);
      }
    };
  }, []);

  // Monitor and reinitialize canvas if lost
  useEffect(() => {
    if (!canvas || !canvas.getContext()) {
      console.log("Starting canvas retry, canvas:", !!canvas, "context:", canvas ? !!canvas.getContext() : false);
      let attempts = 0;
      const maxAttempts = 10;
      const baseDelay = 500;

      const retryCanvas = () => {
        attempts++;
        console.log(`Canvas retry attempt ${attempts}/${maxAttempts}, DOM check:`, !!document.querySelector("canvas"));
        if (!canvasRef.current || !document.contains(canvasRef.current)) {
          console.error("Canvas element not found during retry");
          if (attempts < maxAttempts) {
            setTimeout(retryCanvas, baseDelay * Math.pow(2, attempts));
          } else {
            console.error("Max canvas retry attempts reached");
            toast.error("Failed to initialize canvas. Please refresh the page.");
          }
          return;
        }

        const canvasInstance = initializeCanvas();
        if (canvasInstance && canvasInstance.getContext()) {
          setCanvas(canvasInstance);
          console.log("Canvas retry successful:", canvasInstance);
        } else {
          console.error("Canvas retry failed: Context unavailable");
          if (attempts < maxAttempts) {
            setTimeout(retryCanvas, baseDelay * Math.pow(2, attempts));
          } else {
            console.error("Max canvas retry attempts reached");
            toast.error("Failed to initialize canvas. Please refresh the page.");
          }
        }
      };

      setTimeout(retryCanvas, baseDelay);
    }
  }, [canvas]);

  // Load saved design
  useEffect(() => {
    console.log("Design load effect triggered:", { canvas: !!canvas, context: canvas ? !!canvas.getContext() : false, singleProduct: !!singleProduct, isProductLoading });
    if (!canvas || !canvas.getContext() || !singleProduct || isProductLoading) {
      console.log("Skipping design load due to invalid state");
      return;
    }

    const design = designs[selectedColorIndex]?.[currentSide];
    console.log("Loading design for color:", selectedColorIndex, "side:", currentSide, "design exists:", !!design);
    if (design) {
      canvas.loadFromJSON(design, () => {
        canvas.forEachObject((obj) => addDeleteControl(obj, canvas));
        canvas.isDrawingMode = false;
        canvas.renderAll();
        console.log("Design loaded successfully");
      }, (err) => {
        console.error("Failed to load design:", err);
        toast.error("Failed to load saved design.");
      });
    } else {
      canvas.remove(...canvas.getObjects());
      addTextToCanvas(canvas, "Double click to edit");
      canvas.isDrawingMode = false;
      canvas.renderAll();
      console.log("Initialized empty canvas with default placeholders");
    }
  }, [canvas, currentSide, selectedColorIndex, singleProduct, isProductLoading]);

  const handleSelection = (e) => {
    const obj = e.selected ? e.selected[0] : null;
    if (obj) {
      setActiveObject(obj);
      if (obj.type === "textbox") {
        setSelectedTool("text");
      } else if (obj.type === "image" || obj.type === "group") {
        setSelectedTool("imageIcon");
      } else if (obj.type === "path") {
        setSelectedTool("drawing");
      }
    } else {
      setActiveObject(null);
    }
    console.log("Selection changed:", obj ? obj.type : "none");
  };

  const addDeleteControl = (object, canvasInstance) => {
    if (!object || !canvasInstance.getContext()) {
      console.error("Cannot add delete control: Invalid object or canvas context");
      return;
    }
    object.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetX: 10,
      offsetY: -10,
      cursorStyle: "pointer",
      mouseUpHandler: (eventData, transform) => {
        const target = transform.target;
        canvasInstance.remove(target);
        canvasInstance.requestRenderAll();
        setActiveObject(null);
        console.log("Object deleted:", target.type);
      },
      render: (ctx, left, top) => {
        const size = 16;
        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(left, top, size / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("×", left, top);
        ctx.restore();
      },
      cornerSize: 16,
    });
  };

  const base64ToBlob = (base64Data) => {
    try {
      const byteString = atob(base64Data.split(",")[1]);
      const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    } catch (err) {
      console.error("Failed to convert base64 to blob:", err);
      return null;
    }
  };

  const saveDesign = () => {
    if (!canvas || !canvas.getContext()) {
      console.error("Cannot save design: Canvas context unavailable");
      toast.error("Cannot save design: Canvas not initialized.");
      return;
    }

    const toastId = toast.loading("Saving design...");

    try {
      // Force canvas to render all changes
      canvas.renderAll();

      // Save canvas JSON
      const json = canvas.toJSON();
      delete json.backgroundImage;
      setDesigns((prev) => ({
        ...prev,
        [selectedColorIndex]: {
          ...prev[selectedColorIndex],
          [currentSide]: json,
        },
      }));

      // Create temp canvas for preview
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.getWidth();
      tempCanvas.height = canvas.getHeight();
      const context = tempCanvas.getContext("2d");

      if (!context) {
        console.error("Failed to get temp canvas context");
        toast.error("Failed to save design: Temporary canvas context error.", { id: toastId });
        return;
      }

      // Draw canvas content first (ensures designs are captured)
      const canvasDataUrl = canvas.toDataURL({ format: "png", multiplier: 1 });
      const canvasImage = new window.Image();
      canvasImage.src = canvasDataUrl;

      canvasImage.onload = () => {
        context.drawImage(canvasImage, 0, 0);

        // Try to load T-shirt image
        const imgElement = new window.Image();
        imgElement.crossOrigin = "anonymous";
        imgElement.src = activeImage;

        imgElement.onload = () => {
          console.log("T-shirt image loaded:", { src: imgElement.src, width: imgElement.width, height: imgElement.height });
          context.globalCompositeOperation = "destination-over";
          context.drawImage(imgElement, 0, 0, tempCanvas.width, tempCanvas.height);
          context.globalCompositeOperation = "source-over";

          const finalImageUrl = tempCanvas.toDataURL("image/png");

          setPreviews((prev) => {
            const newPreviews = {
              ...prev,
              [selectedColorIndex]: {
                ...prev[selectedColorIndex],
                [currentSide]: finalImageUrl,
              },
            };
            console.log("Updated previews:", newPreviews);
            return newPreviews;
          });

          toast.success("Design saved successfully!", { id: toastId });
          console.log("Design saved for color:", selectedColorIndex, "side:", currentSide, "preview URL:", finalImageUrl);
        };

        imgElement.onerror = (err) => {
          console.error("Failed to load T-shirt image:", activeImage, err);
          const fallbackImageUrl = canvas.toDataURL("image/png");
          setPreviews((prev) => {
            const newPreviews = {
              ...prev,
              [selectedColorIndex]: {
                ...prev[selectedColorIndex],
                [currentSide]: fallbackImageUrl,
              },
            };
            console.log("Fallback previews:", newPreviews);
            return newPreviews;
          });
          toast.warning("Saved design without T-shirt image due to image loading error.", { id: toastId });
          console.log("Fallback design saved for color:", selectedColorIndex, "side:", currentSide, "preview URL:", fallbackImageUrl);
        };
      };

      canvasImage.onerror = (err) => {
        console.error("Failed to load canvas image for preview:", err);
        const fallbackImageUrl = canvas.toDataURL("image/png");
        setPreviews((prev) => {
          const newPreviews = {
            ...prev,
            [selectedColorIndex]: {
              ...prev[selectedColorIndex],
              [currentSide]: fallbackImageUrl,
            },
          };
          console.log("Fallback previews:", newPreviews);
          return newPreviews;
        });
        toast.warning("Saved design without T-shirt image due to rendering error.", { id: toastId });
        console.log("Fallback design saved for color:", selectedColorIndex, "side:", currentSide, "preview URL:", fallbackImageUrl);
      };
    } catch (err) {
      console.error("Save design error:", err);
      toast.error("Failed to save design: Unexpected error.", { id: toastId });
    }
  };

  const switchSide = (newSide) => {
    console.log("Switching side:", { newSide, currentSide, canvas: !!canvas, context: canvas ? !!canvas.getContext() : false });
    if (newSide === currentSide) {
      const design = designs[selectedColorIndex]?.[newSide];
      if (design && canvas && canvas.getContext()) {
        const shouldLoad = window.confirm("Do you want to load the saved design for this side? This will discard any unsaved changes.");
        if (shouldLoad) {
          canvas.loadFromJSON(design, () => {
            canvas.forEachObject((obj) => addDeleteControl(obj, canvas));
            canvas.isDrawingMode = false;
            canvas.renderAll();
            console.log("Loaded saved design for side:", newSide);
          }, (err) => {
            console.error("Failed to load design:", err);
            toast.error("Failed to load saved design.");
          });
        }
      }
      return;
    }

    if (canvas && canvas.getContext()) {
      const shouldSave = window.confirm("Are you sure you want to save the current design?");
      if (shouldSave) {
        saveDesign();
      }
    }

    setCurrentSide(newSide);
    setActiveObject(null);
    setSelectedTool("text");
    console.log("Side switched to:", newSide, "with URL:", newSide === "front" ? frontTshirtUrl : backTshirtUrl);
  };

  const selectColor = (index) => {
    console.log("Selecting color:", { index, current: selectedColorIndex, canvas: !!canvas, context: canvas ? !!canvas.getContext() : false });
    if (index === selectedColorIndex) return;

    if (canvas && canvas.getContext()) {
      const shouldSave = window.confirm("Are you sure you want to save the current design?");
      if (shouldSave) {
        saveDesign();
      }
    }

    setSelectedColorIndex(index);
    setActiveObject(null);
    setSelectedTool("text");
    console.log("Color switched to index:", index);
  };

  const addTextToCanvas = (canvasInstance, textString = "New Text") => {
    if (!canvasInstance || !canvasInstance.getContext()) {
      console.error("Cannot add text: Canvas context unavailable");
      toast.error("Cannot add text: Canvas not initialized.");
      return;
    }
    const text = new fabric.Textbox(textString, {
      left: 100,
      top: 150,
      fontSize: 24,
      fill: "black",
      fontWeight: "normal",
      fontStyle: "normal",
      fontFamily: "Arial",
      editable: true,
      stroke: "black",
      strokeWidth: 0,
      shadow: new fabric.Shadow({
        color: "rgba(0,0,0,0)",
        offsetX: 0,
        offsetY: 0,
        blur: 0,
      }),
    });

    addDeleteControl(text, canvasInstance);

    canvasInstance.add(text);
    canvasInstance.setActiveObject(text);
    canvasInstance.requestRenderAll();
    setSelectedTool("text");
    console.log("Text added to canvas:", textString);
  };

  const addImage = (e) => {
    if (!canvas || !canvas.getContext()) {
      console.error("Cannot add image: Canvas context unavailable");
      toast.error("Cannot add image: Canvas not initialized.");
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => {
        const imgElement = new Image();
        imgElement.src = f.target.result;
        imgElement.onload = () => {
          const img = new fabric.Image(imgElement, {
            left: 150,
            top: 150,
            scaleX: 0.5,
            scaleY: 0.5,
          });

          addDeleteControl(img, canvas);

          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          setSelectedTool("image");
          console.log("Uploaded image added to canvas");
        };
        imgElement.onerror = (err) => {
          console.error("Failed to load uploaded image:", err);
          toast.error("Failed to load uploaded image.");
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageFromUrl = (imageUrl, isSvg) => {
    if (!canvas || !canvas.getContext()) {
      console.error("Cannot add image from URL: Canvas context unavailable");
      toast.error("Cannot add image: Canvas not initialized.");
      return;
    }
    console.log("Adding image from URL:", imageUrl, "isSvg:", isSvg);
    if (isSvg) {
      fabric.loadSVGFromURL(imageUrl, (objects, options) => {
        const svgGroup = fabric.util.groupSVGElements(objects, {
          left: 150,
          top: 150,
          scaleX: 0.5,
          scaleY: 0.5,
          ...options,
        });

        addDeleteControl(svgGroup, canvas);

        canvas.add(svgGroup);
        canvas.setActiveObject(svgGroup);
        canvas.renderAll();
        setSelectedTool("imageIcon");
        console.log("SVG added to canvas");
      }, (error) => {
        console.error("Failed to load SVG:", imageUrl, error);
        toast.error("Failed to add SVG to canvas. Check console for details.");
      });
    } else {
      fabric.Image.fromURL(imageUrl, (img) => {
        if (img) {
          img.set({
            left: 150,
            top: 150,
            scaleX: 0.5,
            scaleY: 0.5,
          });

          addDeleteControl(img, canvas);

          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          setSelectedTool("imageIcon");
          console.log("Image added to canvas from URL:", imageUrl);
        } else {
          console.error("Failed to load image:", imageUrl);
          toast.error("Failed to load image from URL.");
        }
      }, { crossOrigin: "anonymous" });
    }
  };

  const handlePersistDesigns = () => {
    if (!canvas || !canvas.getContext()) {
      console.error("Cannot persist designs: Canvas context unavailable");
      toast.error("Cannot save order: Canvas not initialized.");
      return;
    }

    // Save the current design before persisting
    saveDesign();

    // Wait briefly to ensure previews state is updated
    setTimeout(() => {
      // Get the previews for the current color index
      const currentPreviews = previews[selectedColorIndex] || {};
      const frontPreview = currentPreviews.front || "https://via.placeholder.com/700x700?text=No+Front+Design";
      const backPreview = currentPreviews.back || "https://via.placeholder.com/700x700?text=No+Back+Design";

      // Dispatch the previews to Redux store
      dispatch(saveDesigns({ frontPreview, backPreview }));
      console.log("Designs persisted to Redux:", { frontPreview, backPreview });
      toast.success("Designs saved to persist!");
    }, 100); // Small delay to ensure state updates
  };

  if (productError) {
    return (
      <div className="flex h-screen bg-gray-100 justify-center items-center">
        <div className="text-red-500 text-center">
          <h1>Error loading product data: {productError?.data?.message || "Unknown error"}</h1>
          <p>Please check the product ID or server connection and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-24 bg-gray-50 p-2 flex flex-col items-center gap-4 border-r">
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log("Text button clicked, canvas:", !!canvas, "context:", canvas ? !!canvas.getContext() : false);
            setSelectedTool("text");
            if (canvas && canvas.getContext()) {
              addTextToCanvas(canvas);
              canvas.isDrawingMode = false;
            } else {
              console.error("Text button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${selectedTool === "text" ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-600"} ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <CiText size={44} />
        </button>
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log("Image button clicked, canvas:", !!canvas, "context:", canvas ? !!canvas.getContext() : false);
            setSelectedTool("image");
            if (canvas && canvas.getContext()) {
              canvas.isDrawingMode = false;
            } else {
              console.error("Image button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${selectedTool === "image" ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-600"} ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <img className="w-[45px]" src={cloud} alt="Upload" />
        </button>
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log("ImageIcon button clicked, canvas:", !!canvas, "context:", canvas ? !!canvas.getContext() : false);
            setSelectedTool("imageIcon");
            if (canvas && canvas.getContext()) {
              canvas.isDrawingMode = false;
            } else {
              console.error("ImageIcon button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${selectedTool === "imageIcon" ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-600"} ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <img className="w-[45px]" src={art} alt="Image Icon" />
        </button>
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log("Drawing button clicked, canvas:", !!canvas, "context:", canvas ? !!canvas.getContext() : false);
            setSelectedTool("drawing");
            if (canvas && canvas.getContext()) {
              canvas.isDrawingMode = true;
            } else {
              console.error("Drawing button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${selectedTool === "drawing" ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-600"} ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <img className="w-[55px]" src={pen} alt="Pen" />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex justify-center items-center relative">
        {isProductLoading ? (
          <div className="w-[700px] h-[700px] animate-pulse rounded bg-slate-200" />
        ) : (
          <div className="shadow-md p-4 rounded-md relative" style={{ width: 700, height: 700 }}>
            <div className="absolute top-0 -right-24 flex gap-2">
              <button
                disabled={isProductLoading}
                onClick={() => {
                  console.log("Save button clicked, canvas:", !!canvas, "context:", canvas ? !!canvas.getContext() : false);
                  if (canvas && canvas.getContext()) {
                    saveDesign();
                  } else {
                    console.error("Save button clicked but canvas unavailable");
                    toast.error("Canvas not initialized. Please wait or refresh.");
                  }
                }}
                className={`p-2 bg-green-500 text-white rounded flex items-center gap-2 ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Save size={20} />
                Save
              </button>
            </div>
            <div className="relative" style={{ width: 700, height: 700 }}>
              <img
                src={activeImage}
                alt={singleProduct?.data?.name || "T-Shirt"}
                style={{ width: 700, height: 700 }}
                className="mx-auto block"
                crossOrigin="anonymous"
              />
            </div>
            <div
              className="absolute inset-0 w-full border border-dashed border-black"
              style={{ width: 700, height: 700 }}
            >
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
        )}

        {selectedTool === "text" && activeObject?.type === "textbox" && (
          <TextControls
            activeObject={activeObject}
            canvas={canvas}
            setShadowOffsetX={setShadowOffsetX}
            setShadowOffsetY={setShadowOffsetY}
            setShadowBlur={setShadowBlur}
            setBorderWidth={setBorderWidth}
          />
        )}

        {selectedTool === "image" && (
          <div className="absolute top-0 left-0 bg-white p-4 rounded flex flex-col gap-2">
            <p>Upload Image</p>
            <label className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition">
              <ImageIcon size={18} />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={addImage}
                className="hidden"
              />
            </label>
          </div>
        )}

        <ImageIconControls selectedTool={selectedTool} onImageSelect={addImageFromUrl} />

        <DrawingControls
          canvas={canvas}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-gray-50 p-4 flex flex-col gap-4 border-l">
        <div className="border p-2">
          <h1 className="font-semibold mb-2">Select Color</h1>
         <div className="flex flex-wrap gap-1">
           {singleProduct?.data?.variants?.map((variant, index) => (
            <button
              key={variant._id}
              onClick={() => selectColor(index)}
              disabled={isProductLoading}
              className={`flex items-center gap-2  rounded-full  ${selectedColorIndex === index ? "bg-red-500 p-[2px] " : ""} ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: variant.color.hexValue }}
              ></div>
              {/* <span>{variant.color.name} ({variant.color.hexValue})</span> */}
            </button>
          ))}
         </div>
        </div>

       
        <button
          onClick={() => switchSide("front")}
          disabled={isProductLoading}
          className={`p-2 rounded ${currentSide === "front" ? "bg-red-400 text-white" : "bg-gray-200"} ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Front Image
        </button>
        <button
          onClick={() => switchSide("back")}
          disabled={isProductLoading}
          className={`p-2 rounded ${currentSide === "back" ? "bg-red-400 text-white" : "bg-gray-200"} ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Back Image
        </button>
        {previews[selectedColorIndex]?.front && (
          <div className="border p-2">
            <h1>Front Image Preview:</h1>
            <div className="flex flex-col gap-2 mt-2">
              <img src={previews[selectedColorIndex].front} alt="Front Preview" className="w-full" />
            </div>
          </div>
        )}
        {previews[selectedColorIndex]?.back && (
          <div className="border p-2">
            <h1>Back Image Preview:</h1>
            <div className="flex flex-col gap-2 mt-2">
              <img src={previews[selectedColorIndex].back} alt="Back Preview" className="w-full" />
            </div>
          </div>
        )}
        <div>
          <Link to="/allProduct/productDetails/design/saveDesign">
            <button
              onClick={() => {
                console.log("Save Order button clicked, canvas:", !!canvas, "context:", canvas ? !!canvas.getContext() : false);
                if (canvas && canvas.getContext()) {
                  handlePersistDesigns();
                } else {
                  console.error("Save Order button clicked but canvas unavailable");
                  toast.error("Canvas not initialized. Please wait or refresh.");
                }
              }}
              disabled={isProductLoading}
              className={`bg-red-500 text-white py-2 px-5 rounded ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Save Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}