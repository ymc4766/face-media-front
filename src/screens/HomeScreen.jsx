import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Main from "./container/Main";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  console.log("user", userInfo);
  return (
    <div>
      <Main />
    </div>
  );
};

export default HomeScreen;
