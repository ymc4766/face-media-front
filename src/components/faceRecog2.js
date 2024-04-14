import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";
export const FaceRecognition = () => {
  const imageRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender()
      .withFaceExpressions();

    console.log("detectns", detections);

    // Clear previous drawings on the canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bounding boxes around each detected face
    detections.forEach((face) => {
      const box = face.detection.box;
      context.beginPath();
      context.lineWidth = "4";
      context.strokeStyle = "red";
      context.rect(box.x, box.y, box.width, box.height);
      context.stroke();

      const { age, gender, genderProbability } = face;
      const genderText = `${gender} - ${genderProbability}`;
      const ageText = `${Math.round(age)} years`;
      const text = `${genderText}, ${ageText}`;
      context.font = "13px Arial";
      context.fillStyle = "white";
      context.fillText(text, box.x, box.y - 32);
    });

    // Create a new canvas and match its dimensions with the image
    const displaySize = {
      width: imageRef.current.width,
      height: imageRef.current.height,
    };
    faceapi.matchDimensions(canvas, displaySize);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    resizedDetections.forEach((detection) => {
      const landmarks = detection.landmarks;
      faceapi.draw.drawFaceLandmarks(canvas, landmarks);
    });

    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
    //   imageRef.current
    // );
    // faceapi.matchDimensions(canvasRef.current, {
    //   width: 750,
    //   height: 530,
    // });

    // const resized = faceapi.resizeResults(detections, {
    //   width: 650,
    //   height: 500,
    // });

    // faceapi.draw.drawDetections(canvasRef.current, resized);
    // // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
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
          faceapi.nets.ageGenderNet.loadFromUri("./models"),
        ]);

        // Once models are loaded, handle the image
        handleImage();
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  return (
    <div>
      <section>
        <h1 className="text-4xl text-blue-700 mt-3">
          Hello, React Face Recognition
        </h1>
        <div className="">
          <div className="">
            <img
              crossOrigin="anonymous"
              ref={imageRef}
              src="https://images.pexels.com/photos/4034048/pexels-photo-4034048.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="face"
              width="650"
              height="550"
              className="relative rounded-lg"
              style={{ zIndex: 1 }}
            />
            <canvas
              ref={canvasRef}
              width="650"
              height="450"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FaceRecognition2 = () => {
  const imageRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptors()
      .withAgeAndGender();

    // Draw bounding boxes around each detected face and display age and gender

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
      imageRef.current
    );

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    faceapi.matchDimensions(canvasRef.current, {
      width: 950,
      height: 650,
    });

    detections.forEach((face) => {
      // Display age and gender below the bounding box
      const { x, y, height } = face.detection.box;
      const { age, gender, genderProbability } = face;
      const genderText = `${gender} - ${genderProbability.toFixed(2)}`;
      const ageText = `${Math.round(age)} years`;
      const text = `${genderText}, ${ageText}`;

      // Calculate coordinates for placing the text below the bounding box with a margin
      const textX = x + 20;
      const textY = y + height + -60; // Adjust the distance below the bounding box as needed

      context.font = "16px Arial";
      context.fillStyle = "white";
      context.fillText(text, textX, textY);
    });

    const resized = faceapi.resizeResults(detections, {
      width: 950,
      height: 650,
    });

    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
  };

  //   const handleImage = async () => {
  //     const detections = await faceapi
  //       .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceExpressions()
  //       .withFaceDescriptors()
  //       .withAgeAndGender();

  //     // Draw bounding boxes around each detected face and display age and gender
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");
  //     faceapi.matchDimensions(canvas, { width: 950, height: 650 });

  //     detections.forEach((face) => {
  //       // Draw bounding box
  //       const { x, y, width, height } = face.detection.box;
  //       context.beginPath();
  //       context.lineWidth = "4";
  //       context.strokeStyle = "red";
  //       context.rect(x, y, width, height);
  //       context.stroke();

  //       // Display age and gender
  //       const { age, gender, genderProbability } = face;
  //       const genderText = `${gender} - ${genderProbability.toFixed(2)}`;
  //       const ageText = `${Math.round(age)} years`;
  //       const text = `${genderText}, ${ageText}`;
  //       context.font = "16px Arial";
  //       context.fillStyle = "white";
  //       context.fillText(text, x, y - 10);
  //     });

  //     // Draw face expressions and landmarks
  //     const resized = faceapi.resizeResults(detections, { width: 950, height: 650 });
  //     faceapi.draw.drawDetections(canvas, resized);
  //     faceapi.draw.drawFaceExpressions(canvas, resized);
  //     faceapi.draw.drawFaceLandmarks(canvas, resized);
  //   };
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

  return (
    <div>
      <section>
        <h1 className="text-4xl text-blue-700 mt-3">
          Hello, React Face Recognition
        </h1>
        <div className="">
          <div className="relative">
            <img
              crossOrigin="anonymous"
              ref={imageRef}
              src="https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=1024x1024&w=is&k=20&c=CXEwZ7FoZckyOE4BOWgK6wjsaFqn5k86N_kzte9KM10="
              alt="face"
              width="950"
              height="650"
              className=" rounded-lg"
              style={{ zIndex: 1 }}
            />
            <canvas
              ref={canvasRef}
              width="950"
              height="650" // Adjusted canvas height to match image height
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaceRecognition2;
