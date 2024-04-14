import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";

const FaceRecognition = () => {
  const imageRef = useRef();
  const canvasRef = useRef();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  // const [detections, setDetections] = useState([]);

  const handleImage = async () => {
    if (!imageRef.current || !file) return;

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
      faceapi.matchDimensions(canvasRef.current, {
        width: 950,
        height: 650,
      });

      detections.forEach((face) => {
        const { x, y, height } = face.detection.box;
        const { age, gender, genderProbability } = face;
        const genderText = `${gender} - ${genderProbability.toFixed(2)}`;
        const ageText = `${Math.round(age)} years`;
        const text = `${genderText}, ${ageText}`;

        const textX = x + 20;
        const textY = y + height + 120;

        context.font = "16px Arial";
        context.fillStyle = "gray";
        context.fillText(text, textX, textY);
      });

      // Draw face expressions and landmarks
      const resized = faceapi.resizeResults(detections, {
        width: 950,
        height: 650,
      });
      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);
      faceapi.draw.drawFaceLandmarks(canvas, resized);

      // setDetections(detections);
    } catch (error) {
      console.error("Error detecting faces:", error);
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Load required face detection and recognition models
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
          faceapi.nets.ageGenderNet.loadFromUri("/models"),
        ]).then(handleImage);

        // Once models are loaded, handle the image
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    handleImage();
  }, [file]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImage(URL.createObjectURL(file));
  };

  return (
    <div>
      <section>
        <h1 className="text-4xl text-blue-700 mt-3">
          Hello, React Face Recognition
        </h1>
        <div className="mt-4">
          <label
            htmlFor="file_input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Upload file
          </label>
          <input
            id="file_input"
            type="file"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="relative mt-4">
          {image && (
            <img
              ref={imageRef}
              src={image}
              alt="Uploaded"
              className="rounded-lg"
              style={{ zIndex: 1, width: 950, height: 650 }}
            />
          )}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
            width={950}
            height={650}
            style={{ zIndex: 2 }}
          />
        </div>
      </section>
      {/* <FaceData detections={detections } /> */}
    </div>
  );
};

export default FaceRecognition;
