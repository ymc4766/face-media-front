import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { CircleLoader } from "react-spinners";

const Face2 = () => {
  const [initialize, setInitialize] = useState(false);

  const [recognisedFaces, setRecognisedFaces] = useState([]);

  const videoRef = useRef();

  const canvasRef = useRef();

  const videoHeight = 780;
  const videoWidth = 900;

  //   const recognizedFaces = [];

  useEffect(() => {
    const loadModels = async () => {
      setInitialize(true);
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
      ]).then(() => {
        console.log("models ready");
        startVideo(); // Assuming startVideo is defined somewhere
      });
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        videoRef.current.srcObject = stream;
      },
      (err) => {
        console.error("Error accessing the camera:", err);
      }
    );
  };

  // Inside your Face2 component or a related utility function
  const initializeFaceRecognition = async () => {
    // Load face recognition model
    await faceapi.nets.faceRecognitionNet.loadFromUri("./models");

    // Initialize labeled face descriptors for recognized faces
    const labeledDescriptors = [
      // Example: Replace the following with your actual labeled descriptors
      new faceapi.LabeledFaceDescriptors("Name1", [
        /* Descriptor1, Descriptor2, ... */
      ]),
      new faceapi.LabeledFaceDescriptors("Name2", [
        /* Descriptor1, Descriptor2, ... */
      ]),
      // Add more labeled descriptors as needed
    ];

    // Create FaceMatcher with labeled descriptors
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

    return faceMatcher;
  };

  const handleVideoPlay = async () => {
    setInterval(async () => {
      if (initialize) {
        setInitialize(false);
      }

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );

      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);
      // Initialize face recognition
      const faceMatcher = await initializeFaceRecognition();

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);

      //   faceapi.draw.drawDetections(canvasRef.current, detections);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

      // Recognize faces
      //   resizedDetections.forEach((detection) => {
      //     const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
      //     console.log(bestMatch.toString());
      //   });

      const recognized = resizedDetections.map((detection) => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        return bestMatch;
      });

      setRecognisedFaces(recognized);

      //   });
    }, 100);
  };

  return (
    <div>
      <span>{initialize ? "initialiazing" : "Ready"}</span>

      <div
        className="flex justify-center
       m-auto mt-12 relative"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          height={videoHeight}
          width={videoWidth}
          onPlay={handleVideoPlay}
          //   style={{ position: "relative" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute "
          width={videoWidth}
          height={videoHeight}
        />
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
          {recognisedFaces.map((face, index) => (
            <li key={index}>{face.toString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Face2;
