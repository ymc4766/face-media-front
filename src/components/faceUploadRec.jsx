import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { CircleLoader } from "react-spinners";

const FaceUploadRec = () => {
  const [initialize, setInitialize] = useState(false);
  const [recognizedFaces, setRecognizedFaces] = useState([]);

  const imageRef = useRef();
  const canvasRef = useRef();

  const imageWidth = 950;
  const imageHeight = 650;

  const handleImage = async (file) => {
    if (!file) return;

    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      await faceapi.nets.ageGenderNet.loadFromUri("/models");

      const detections = await faceapi
        .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors()
        .withAgeAndGender();

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      faceapi.matchDimensions(canvas, {
        width: imageWidth,
        height: imageHeight,
      });

      // Draw face expressions and landmarks
      const resized = faceapi.resizeResults(detections, {
        width: imageWidth,
        height: imageHeight,
      });
      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);
      faceapi.draw.drawFaceLandmarks(canvas, resized);

      // Update recognized faces and disable loading
      //   setRecognizedFaces(detections);
      setInitialize(false);

      const labeledDescriptors = getLabeledDescriptors(); // Define your labeled descriptors
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
      const recognized = resized.map((detection) =>
        faceMatcher.findBestMatch(detection.descriptor)
      );
      setRecognizedFaces(recognized);
    } catch (error) {
      console.error("Error detecting faces:", error);
    }
  };

  const getLabeledDescriptors = () => {
    // Define your labeled descriptors here
    return [
      new faceapi.LabeledFaceDescriptors("John", [
        /* Array of descriptors for John's face */
      ]),
      new faceapi.LabeledFaceDescriptors("Jane", [
        /* Array of descriptors for Jane's face */
      ]),
      // Add more labeled descriptors as needed
    ];
  };

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]).then(() => {
        console.log("models ready");
        setInitialize(true);
      });
    };

    loadModels();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imageRef.current.src = imageUrl;
      handleImage(file);
    }
  };

  return (
    <div>
      <span>{initialize ? "initializing" : "Ready"}</span>

      <div className="flex justify-center m-auto mt-12 relative">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div className="flex justify-center m-auto mt-4 ">
        <div
          style={{
            position: "relative",
            width: imageWidth,
            height: imageHeight,
          }}
        >
          {/* Render the uploaded image */}
          <img
            ref={imageRef}
            alt=""
            width={imageWidth}
            height={imageHeight}
            style={{ display: "block" }}
          />
          {/* Render the canvas */}
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", top: 0, left: 0 }}
            width={imageWidth}
            height={imageHeight}
          />
        </div>

        {initialize && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircleLoader className="w-12 text-slate-400" />
          </div>
        )}
      </div>

      {/* Render recognized faces list */}
      <div>
        <h2>Recognized Faces:</h2>
        <ul>
          {recognizedFaces.map((face, index) => (
            <li key={index}>{face.toString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FaceUploadRec;
