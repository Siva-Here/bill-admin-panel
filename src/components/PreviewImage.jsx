import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import styles from './bills/bills-page/BillsPage.module.css'


const PreviewImage = ({ image, onClose  }) => {

  console.log("image is vbvb",image);
  return (
    <div className={styles.modalBackdrop}>
    <div
      className={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
    >
      <button className={styles.modalCloseBtn} onClick={onClose}>
        &times;
      </button>
      <img src={image} alt="Preview" />
    </div>
  </div>
  );
};

export default PreviewImage;


// import React, { useState, useRef } from "react";
// import styles from "./table/UserTable.module.css";

// const PreviewImage = ({ image, onClose }) => {
//   const [scale, setScale] = useState(1);
//   const [lastTap, setLastTap] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
//   const imageRef = useRef(null);

//   const handleTap = () => {
//     const currentTime = new Date().getTime();
//     const tapInterval = currentTime - lastTap;

//     if (tapInterval < 300 && tapInterval > 0) {
//       // Double-tap detected
//       setScale((prevScale) => (prevScale === 1 ? 2 : 1)); // Toggle zoom
//       if (scale === 1) {
//         setPosition({ x: 0, y: 0 }); // Reset position when zooming out
//       }
//     }

//     setLastTap(currentTime);
//   };

//   const handleMouseDown = (e) => {
//     if (scale > 1) {
//       setIsDragging(true);
//       setLastPosition({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const deltaX = e.clientX - lastPosition.x;
//       const deltaY = e.clientY - lastPosition.y;
//       setPosition((prev) => ({
//         x: prev.x + deltaX,
//         y: prev.y + deltaY,
//       }));
//       setLastPosition({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (scale > 1 && e.touches.length === 1) {
//       setIsDragging(true);
//       setLastPosition({
//         x: e.touches[0].clientX,
//         y: e.touches[0].clientY,
//       });
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (isDragging && e.touches.length === 1) {
//       const deltaX = e.touches[0].clientX - lastPosition.x;
//       const deltaY = e.touches[0].clientY - lastPosition.y;
//       setPosition((prev) => ({
//         x: prev.x + deltaX,
//         y: prev.y + deltaY,
//       }));
//       setLastPosition({
//         x: e.touches[0].clientX,
//         y: e.touches[0].clientY,
//       });
//     }
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className={styles.modalBackdrop} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <button className={styles.modalCloseBtn} onClick={onClose}>
//           &times;
//         </button>
//         <div
//           className={styles.imageContainer}
//           onClick={handleTap}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           style={{
//             overflow: "hidden",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img
//             ref={imageRef}
//             src={image}
//             alt="Preview"
//             style={{
//               transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
//               transition: isDragging ? "none" : "transform 0.3s ease-in-out",
//               touchAction: "none",
//               cursor: scale > 1 ? "grab" : "default",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewImage;




// import React, { useState, useRef } from "react";
// import styles from "./table/UserTable.module.css";

// const PreviewImage = ({ image, onClose }) => {
//   const [scale, setScale] = useState(1);
//   const [lastTap, setLastTap] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

//   const handleTap = () => {
//     const currentTime = new Date().getTime();
//     const tapInterval = currentTime - lastTap;

//     if (tapInterval < 300 && tapInterval > 0) {
//       // Double-tap detected
//       setScale((prevScale) => (prevScale === 1 ? 2 : 1)); // Toggle zoom
//       if (scale === 1) {
//         setPosition({ x: 0, y: 0 }); // Reset position when zooming out
//       }
//     }

//     setLastTap(currentTime);
//   };

//   const handleMouseDown = (e) => {
//     if (scale > 1) {
//       setIsDragging(true);
//       setLastPosition({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const deltaX = e.clientX - lastPosition.x;
//       const deltaY = e.clientY - lastPosition.y;
//       setPosition((prev) => ({
//         x: prev.x + deltaX,
//         y: prev.y + deltaY,
//       }));
//       setLastPosition({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleTouchStart = (e) => {
//     if (scale > 1 && e.touches.length === 1) {
//       setIsDragging(true);
//       setLastPosition({
//         x: e.touches[0].clientX,
//         y: e.touches[0].clientY,
//       });
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (isDragging && e.touches.length === 1) {
//       const deltaX = e.touches[0].clientX - lastPosition.x;
//       const deltaY = e.touches[0].clientY - lastPosition.y;
//       setPosition((prev) => ({
//         x: prev.x + deltaX,
//         y: prev.y + deltaY,
//       }));
//       setLastPosition({
//         x: e.touches[0].clientX,
//         y: e.touches[0].clientY,
//       });
//     }
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className={styles.modalBackdrop} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <button
//           className={styles.modalCloseBtn}
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "10px",
//             zIndex: 10, // Ensures it remains above other elements
//           }}
//         >
//           &times;
//         </button>
//         <div
//           className={styles.imageContainer}
//           onClick={handleTap}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           style={{
//             overflow: "hidden", // Ensures only the image portion is visible
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "relative",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <img
//             src={image}
//             alt="Preview"
//             style={{
//               transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
//               transition: isDragging ? "none" : "transform 0.3s ease-in-out",
//               cursor: scale > 1 ? "grab" : "default",
//               touchAction: "none",
//               maxWidth: "100%",
//               maxHeight: "100%",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewImage;
