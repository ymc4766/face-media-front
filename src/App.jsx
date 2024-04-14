// import Face2 from "./components/Face2";
// import FaceRecognition from "./components/FaceRecognition";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./header/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import LoginUser from "./userScreens/LoginScreen";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div className="flex">
        <Sidebar />
        <div className="max-w-8xl my-5 text-white mx-auto transition-all duration-300 flex-1">
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/login" element={<LoginUser />} />
            {/* <Route exact path="/register" element={<RegisterScreen />} /> */}
            {/* <Route exact path="/detect" element={<ObjectDetect />} /> */}
          </Routes>
        </div>

        {/* <Route exact path="/object-detect" element={<ObjectDetect />} /> */}

        {/* Add more routes and components as needed */}
      </div>
    </BrowserRouter>
  );
}

export default App;
