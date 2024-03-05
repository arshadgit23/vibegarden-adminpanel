import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import { Navbar, Footer, Sidebar, ThemeSettings, Chat } from "./components";
import { Home } from "./pages";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";

import { useStateContext } from "./contexts/ContextProvider";
import ToolsVideos from "./pages/toolsVideos";
import AddVideo from "./pages/toolsVideos/AddVideo";
import Categories from "./pages/toolsCategories/Categories";
import AddCategorie from "./pages/toolsCategories/AddCategorie";
import CategoryDetail from "./pages/toolsCategories/CategoryDetail";
import EditCategory from "./pages/toolsCategories/EditCategory";
import Groundvideos from "./pages/groundWorksVideos/Groundvideos";
import AddGroundVideo from "./pages/groundWorksVideos/AddGroundVideo";
import GroundWorkCategories from "./pages/groundWorksCategories/GroundWorkCategories";
import BloomsVideos from "./pages/freshBlooms/BloomsVideos";
import AddBloomVideo from "./pages/freshBlooms/AddBloomVideo";
import Tags from "./pages/tags/Tags";
import Teacher from "./pages/teacher/Teacher";
import AddTeacher from "./pages/teacher/AddTeacher";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import UserDetail from "./pages/manageUsers/UserDetail";
import GenerateNotification from "./pages/notifications/GenerateNotification";
import GenerateEmailNotification from "./pages/notifications/GenerateEmailNotification";
import SendNotification from "./pages/notifications/SendNotification";
import ResonanceDetail from "./pages/resonanceFinder/ResonanceDetail";
import ResonanceQuestions from "./pages/resonanceFinder/ResonanceQuestions";
import BloomsCharacter from "./pages/bloom&Character/Blooms&Character";
import AddCharacterBloom from "./pages/bloom&Character/AddCharacterBloom";
import VibeGuides from "./pages/vibeGuides/VibeGuides";
import AddVibeGuide from "./pages/vibeGuides/AddVibeGuide";
import FeedBack from "./pages/feedBackSystem/FeedBack";
import VideoDetail from "./pages/feedBackSystem/VideoDetail";
import EditVideoDetail from "./pages/feedBackSystem/EditVideoDetail";
import Pages from "./pages/pages/Pages";
import SplashScreen from "./pages/pages/mobilePages/SplashScreen";
import StoryScreen from "./pages/pages/mobilePages/StoryScreen1";
import Navigation from "./navigation/navigation";
import Login from "./components/Login";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {token && (
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              {/* <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent> */}
            </div>
          )}
          {token &&
            (activeMenu ? (
              <div className="md:w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            ))}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {token && (
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar setToken={setToken} />
              </div>
            )}
            <div>
              <Navigation token={token} setToken={setToken} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
