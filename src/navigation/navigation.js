import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import AddGroundWorkCategory from "../pages/groundWorksCategories/AddGroundWorkCategory";
import AddTags from "../pages/tags/AddTags";
import UpdateTag from "../pages/tags/UpdateTag";
import SingleFreshBloomVideo from "../pages/freshBlooms/SingleFreshBloomVideo";
import UpdateBloomVideo from "../pages/freshBlooms/UpdateBloomVideo";
import ZoomAuth from "../pages/vibeGuides/ZoomAuth";

const Home = React.lazy(() => import("../pages/home/index"));
const ToolsVideos = React.lazy(() => import("../pages/toolsVideos/index"));
const UpdateToolVideo = React.lazy(() =>
  import("../pages/toolsVideos/UpdateToolVideo")
);
const SingleToolVideo = React.lazy(() =>
  import("../pages/toolsVideos/SingleVideo")
);
const AddVideo = React.lazy(() => import("../pages/toolsVideos/AddVideo"));
const Categories = React.lazy(() =>
  import("../pages/toolsCategories/Categories")
);
const AddCategorie = React.lazy(() =>
  import("../pages/toolsCategories/AddCategorie")
);
const CategoryDetail = React.lazy(() =>
  import("../pages/toolsCategories/CategoryDetail")
);
const EditCategory = React.lazy(() =>
  import("../pages/toolsCategories/EditCategory")
);
const Groundvideos = React.lazy(() =>
  import("../pages/groundWorksVideos/Groundvideos")
);
const AddGroundVideo = React.lazy(() =>
  import("../pages/groundWorksVideos/AddGroundVideo")
);
const GroundWorkCategories = React.lazy(() =>
  import("../pages/groundWorksCategories/GroundWorkCategories")
);
const BloomsVideos = React.lazy(() =>
  import("../pages/freshBlooms/BloomsVideos")
);
const AddBloomVideo = React.lazy(() =>
  import("../pages/freshBlooms/AddBloomVideo")
);
const Tags = React.lazy(() => import("../pages/tags/Tags"));
const Teacher = React.lazy(() => import("../pages/teacher/Teacher"));
const AddTeacher = React.lazy(() => import("../pages/teacher/AddTeacher"));
const RecomendedContent = React.lazy(() =>
  import("../pages/recomendedContent/RecomendedContent")
);
const RecomendedVideoDetail = React.lazy(() =>
  import("../pages/recomendedContent/RecomendedVideodetail")
);
const FeaturedGroundwork = React.lazy(() =>
  import("../pages/featuredGroundwork/FeaturedGroundwork")
);
const FeaturedTools = React.lazy(() =>
  import("../pages/featuredTools/FeaturedTools")
);
const ManageUsers = React.lazy(() =>
  import("../pages/manageUsers/ManageUsers")
);
const UserDetail = React.lazy(() => import("../pages/manageUsers/UserDetail"));
const GenerateNotification = React.lazy(() =>
  import("../pages/notifications/GenerateNotification")
);
const GenerateEmailNotification = React.lazy(() =>
  import("../pages/notifications/GenerateEmailNotification")
);
const SendNotification = React.lazy(() =>
  import("../pages/notifications/SendNotification")
);
const ResonanceDetail = React.lazy(() =>
  import("../pages/resonanceFinder/ResonanceDetail")
);
const ResonanceQuestions = React.lazy(() =>
  import("../pages/resonanceFinder/ResonanceQuestions")
);
const BloomsCharacter = React.lazy(() =>
  import("../pages/bloom&Character/Blooms&Character")
);
const AddCharacterBloom = React.lazy(() =>
  import("../pages/bloom&Character/AddCharacterBloom")
);
const VibeGuides = React.lazy(() => import("../pages/vibeGuides/VibeGuides"));
const VibeGuideSchedules = React.lazy(() =>
  import("../pages/vibeGuides/VibeGuideSchedules")
);
const AddVibeGuide = React.lazy(() =>
  import("../pages/vibeGuides/AddVibeGuide")
);
const FeedBack = React.lazy(() => import("../pages/feedBackSystem/FeedBack"));
const VideoDetail = React.lazy(() =>
  import("../pages/feedBackSystem/VideoDetail")
);
const EditVideoDetail = React.lazy(() =>
  import("../pages/feedBackSystem/EditVideoDetail")
);

///mobile pages screens
const Pages = React.lazy(() => import("../pages/pages/Pages"));
const SplashScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/SplashScreen")
);
const StoryScreen1 = React.lazy(() =>
  import("../pages/pages/mobilePages/StoryScreen1")
);
const StoryScreen2 = React.lazy(() =>
  import("../pages/pages/mobilePages/StoryScreen2")
);
const StoryScreen3 = React.lazy(() =>
  import("../pages/pages/mobilePages/StoryScreen3")
);
const StoryScreen4 = React.lazy(() =>
  import("../pages/pages/mobilePages/StoryScreen4")
);
const StoryScreen5 = React.lazy(() =>
  import("../pages/pages/mobilePages/StoryScreen5")
);
const ProfileScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/ProfileScreen")
);

const UpdatePasswordScreen = React.lazy(() =>
  import("../pages/pages/webPages/UpdatePasswordScreen")
);
const ToolsScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/ToolsScreen")
);
const GroundworkScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/GroundworkScreen")
);
const GardenScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/GardenScreen")
);
const WelcomeScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/WelcomeScreen")
);
const ToolsVideoScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/ToolsVideoScreen")
);
const GroundworkVideoScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/GroundworkVideoScreen")
);
const CharacterSelectionScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/CharacterSelectionScreen")
);
const BloomSelectionScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/BloomSelectionScreen")
);
const InitialBloomSelectionScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/InitialBloomSelectionScreen")
);
const BloomConfirmationScreen = React.lazy(() =>
  import("../pages/pages/mobilePages/BloomConfirmationScreen")
);
const SelectResonance = React.lazy(() =>
  import("../pages/pages/mobilePages/SelectYourResonanceScreen")
);
const Search = React.lazy(() =>
  import("../pages/pages/mobilePages/SearchScreen")
);
const ResonanceFinderResult = React.lazy(() =>
  import("../pages/pages/mobilePages/ResonanceFinderResultScreen")
);
const Setting = React.lazy(() =>
  import("../pages/pages/mobilePages/SettingsScreen")
);
const ManageSubcription = React.lazy(() =>
  import("../pages/pages/mobilePages/ManageSubcriptionScreen")
);
const ContactUs = React.lazy(() =>
  import("../pages/pages/mobilePages/ContactUsScreen")
);
const PrivacyPolicy = React.lazy(() =>
  import("../pages/pages/mobilePages/PrivacyPoilicyScreen")
);
const TermsOfUse = React.lazy(() =>
  import("../pages/pages/mobilePages/TermsOfUseScreen")
);
const EmailNotification = React.lazy(() =>
  import("../pages/pages/mobilePages/EmailNotificationScreen")
);
const PushNotification = React.lazy(() =>
  import("../pages/pages/mobilePages/PushNotificationScreen")
);
const BloomCheck = React.lazy(() =>
  import("../pages/pages/mobilePages/BloomCheckScreen")
);
const BigBloom2Petal = React.lazy(() =>
  import("../pages/pages/mobilePages/BigBloom2Petals")
);
const BigBloom4Petal = React.lazy(() =>
  import("../pages/pages/mobilePages/BigBloom4Petals")
);
const BigBloom6Petal = React.lazy(() =>
  import("../pages/pages/mobilePages/BigBloom6Petals")
);
const BigBloom8Petal = React.lazy(() =>
  import("../pages/pages/mobilePages/BigBloom8Petals")
);
///web pages screens///
const HomePage = React.lazy(() =>
  import("../pages/pages/webPages/HomePageScreen")
);
const Groundworks = React.lazy(() =>
  import("../pages/pages/webPages/GroundworksScreen")
);
const Tools = React.lazy(() => import("../pages/pages/webPages/ToolsScreen"));
const Guides = React.lazy(() => import("../pages/pages/webPages/GuidesScreen"));
const ComunityGarden = React.lazy(() =>
  import("../pages/pages/webPages/ComunityGardenScreen")
);
const FreshBloomsScreen = React.lazy(() =>
  import("../pages/pages/webPages/FreshBloomsScreen")
);
const TeacherScreen = React.lazy(() =>
  import("../pages/pages/webPages/TeachersScreen")
);

const Waitinglist = React.lazy(() => import("../pages/teacher/Waitinglist"));

const SelectAvatar = React.lazy(() =>
  import("../pages/pages/webPages/SelectAvatarScreen")
);
const SelectBlooms = React.lazy(() =>
  import("../pages/pages/webPages/SelectBloomsScreen")
);
const CheckBlooms = React.lazy(() =>
  import("../pages/pages/webPages/BloomsCheckScreen")
);
const BloomsResult = React.lazy(() =>
  import("../pages/pages/webPages/BloomsResult")
);
const SignupScreen = React.lazy(() =>
  import("../pages/pages/webPages/SignupScreen")
);
const SearchResultScreen = React.lazy(() =>
  import("../pages/pages/webPages/SearchScreen")
);
const ResonanceResultScreen = React.lazy(() =>
  import("../pages/pages/webPages/ResoanceResultScreen")
);
const AppoinmentScheduleScreen = React.lazy(() =>
  import("../pages/pages/webPages/AppoinmentScheduleScreen")
);
const FooterScreen = React.lazy(() =>
  import("../pages/pages/webPages/FooterScreen")
);
const InnerPageScreen = React.lazy(() =>
  import("../pages/pages/webPages/InnerPageScreen")
);
const ToolInnerPageScreen = React.lazy(() =>
  import("../pages/pages/webPages/ToolInnerPageScreen")
);
const SingleGroundWorkVideo = React.lazy(() =>
  import("../pages/groundWorksVideos/SingleGroundWorkVideo")
);
const UpdateGroundworkVideo = React.lazy(() =>
  import("../pages/groundWorksVideos/UpdateGroundWorkVideo")
);

const EditBloomCharacter = React.lazy(() =>
  import("../pages/bloom&Character/EditBlooms&Character")
);

const ResonanceAllQuestions = React.lazy(() =>
  import("../pages/resonanceFinder/AllResonanceQuestions")
);

const EditResonanceQuestion = React.lazy(() =>
  import("../pages/resonanceFinder/EditResonanceQuestion")
);

const EditTeacher = React.lazy(() => import("../pages/teacher/EditTeacher"));

const EditVibeGuide = React.lazy(() =>
  import("../pages/vibeGuides/EditVibeGuide")
);

const SingleFeaturedGroundworkVideoDetail = React.lazy(() =>
  import("../pages/featuredGroundwork/SingleFeaturedVideoDetail")
);

const SingleFeaturedToolVideo = React.lazy(() =>
  import("../pages/featuredTools/SingleFeaturedToolVideo")
);

const Navigation = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/*" element={<Login setToken={setToken} />} />
        <Route
          path="/home"
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/toolsVideos"
          element={
            <Suspense>
              <ToolsVideos />
            </Suspense>
          }
        />
        <Route
          path="/toolsVideos/:id"
          element={
            <Suspense>
              <SingleToolVideo />
            </Suspense>
          }
        />
        <Route
          path="/updateToolVideo/:id"
          element={
            <Suspense>
              <UpdateToolVideo />
            </Suspense>
          }
        />
        <Route
          path="addVideo"
          element={
            <Suspense>
              <AddVideo />
            </Suspense>
          }
        />
        <Route
          path="/toolsCategories"
          element={
            <Suspense>
              <Categories />
            </Suspense>
          }
        />
        <Route
          path="/addCategorie"
          element={
            <Suspense>
              <AddCategorie />
            </Suspense>
          }
        />
        <Route
          path="/addGroundWorkCategory"
          element={
            <Suspense>
              <AddGroundWorkCategory />
            </Suspense>
          }
        />
        <Route
          path="/categoryDetail/:id"
          element={
            <Suspense>
              <CategoryDetail />
            </Suspense>
          }
        />
        <Route
          path="/editCategory/:id"
          element={
            <Suspense>
              <EditCategory />
            </Suspense>
          }
        />
        <Route
          path="/groundworkVideos"
          element={
            <Suspense>
              <Groundvideos />
            </Suspense>
          }
        />
        <Route
          path="/addGroundVideo"
          element={
            <Suspense>
              <AddGroundVideo />
            </Suspense>
          }
        />
        <Route
          path="/groundworkVideos/:id"
          element={
            <Suspense>
              <SingleGroundWorkVideo />
            </Suspense>
          }
        />
        <Route
          path="/UpdateGroundworkVideo/:id"
          element={
            <Suspense>
              <UpdateGroundworkVideo />
            </Suspense>
          }
        />
        {/* UpdateGroundworkVideo */}
        {/* /UpdateGroundworkVideo/${id} */}
        <Route
          path="/groundWorkCategories"
          element={
            <Suspense>
              <GroundWorkCategories />
            </Suspense>
          }
        />
        <Route
          path="/freshBlooms"
          element={
            <Suspense>
              <BloomsVideos />
            </Suspense>
          }
        />
        <Route
          path="/freshBlooms/:id"
          element={
            <Suspense>
              <SingleFreshBloomVideo />
            </Suspense>
          }
        />
        <Route
          path="/addBloomVideo"
          element={
            <Suspense>
              <AddBloomVideo />
            </Suspense>
          }
        />
        <Route
          path="/updateBloomVideo/:id"
          element={
            <Suspense>
              <UpdateBloomVideo />
            </Suspense>
          }
        />
        <Route
          path="/tags"
          element={
            <Suspense>
              <Tags />
            </Suspense>
          }
        />
        <Route
          path="/add-tags"
          element={
            <Suspense>
              <AddTags />
            </Suspense>
          }
        />
        <Route
          path="/update-tags/:id"
          element={
            <Suspense>
              <UpdateTag />
            </Suspense>
          }
        />
        <Route
          path="/teacher"
          element={
            <Suspense>
              <Teacher />
            </Suspense>
          }
        />
        <Route
          path="/edit-teacher/:id"
          element={
            <Suspense>
              <EditTeacher />
            </Suspense>
          }
        />
        <Route
          path="/addTeacher"
          element={
            <Suspense>
              <AddTeacher />
            </Suspense>
          }
        />
        <Route
          path="/recomendedContent"
          element={
            <Suspense>
              <RecomendedContent />
            </Suspense>
          }
        />
        <Route
          path="/reomendedVideoDetail/:id"
          element={
            <Suspense>
              <RecomendedVideoDetail />
            </Suspense>
          }
        />
        <Route
          path="/featuredGroundworkVideoDetail/:id"
          element={
            <Suspense>
              <SingleFeaturedGroundworkVideoDetail />
            </Suspense>
          }
        />
        <Route
          path="/single-featured-tool-video/:id"
          element={
            <Suspense>
              <SingleFeaturedToolVideo />
            </Suspense>
          }
        />
        <Route
          path="/featuredTools"
          element={
            <Suspense>
              <FeaturedTools />
            </Suspense>
          }
        />
        <Route
          path="/featuredGroundwork"
          element={
            <Suspense>
              <FeaturedGroundwork />
            </Suspense>
          }
        />
        <Route
          path="/pages"
          element={
            <Suspense>
              <Pages />
            </Suspense>
          }
        />
        <Route
          path="/manageUser"
          element={
            <Suspense>
              <ManageUsers />
            </Suspense>
          }
        />
        {/* <Route
          path="/userDetail"
          element={
            <Suspense>
              <UserDetail />
            </Suspense>
          }
        /> */}
        <Route
          path="/ManageUser/:id"
          element={
            <Suspense>
              <UserDetail />
            </Suspense>
          }
        />
        <Route
          path="/notification"
          element={
            <Suspense>
              <GenerateNotification />
            </Suspense>
          }
        />
        <Route
          path="/emailNotification"
          element={
            <Suspense>
              <GenerateEmailNotification />
            </Suspense>
          }
        />
        <Route
          path="/sendNotification"
          element={
            <Suspense>
              <SendNotification />
            </Suspense>
          }
        />
        <Route
          path="/resonanceFinder"
          element={
            <Suspense>
              <ResonanceDetail />
            </Suspense>
          }
        />
        <Route
          path="/resonanceQuestion"
          element={
            <Suspense>
              <ResonanceQuestions />
            </Suspense>
          }
        />
        <Route
          path="/resonance-all-questions"
          element={
            <Suspense>
              <ResonanceAllQuestions />
            </Suspense>
          }
        />
        <Route
          path="edit-resonance-question/:id"
          element={
            <Suspense>
              <EditResonanceQuestion />
            </Suspense>
          }
        />
        <Route
          path="/bloom&Character"
          element={
            <Suspense>
              <BloomsCharacter />
            </Suspense>
          }
        />
        <Route
          path="/addBloomCharacter"
          element={
            <Suspense>
              <AddCharacterBloom />
            </Suspense>
          }
        />
        <Route
          path="/editBloomCharacter/:id"
          element={
            <Suspense>
              <EditBloomCharacter />
            </Suspense>
          }
        />
        <Route
          path="/vibeGuides"
          element={
            <Suspense>
              <VibeGuides />
            </Suspense>
          }
        />
        <Route
          path="/edit-vibeguide/:id"
          element={
            <Suspense>
              <EditVibeGuide />
            </Suspense>
          }
        />
        <Route
          path="/addVibeGuide"
          element={
            <Suspense>
              <AddVibeGuide />
            </Suspense>
          }
        />
        <Route
          path="/schedulings/:id"
          element={
            <Suspense>
              <VibeGuideSchedules />
            </Suspense>
          }
        />
        <Route
          path="zoomCode"
          element={
            <Suspense>
              <ZoomAuth />
            </Suspense>
          }
        />
        <Route
          path="/feedBack"
          element={
            <Suspense>
              <FeedBack />
            </Suspense>
          }
        />
        <Route
          path="/videoDetail"
          element={
            <Suspense>
              <VideoDetail />
            </Suspense>
          }
        />
        <Route
          path="/editVideoDetail"
          element={
            <Suspense>
              <EditVideoDetail />
            </Suspense>
          }
        />
        <Route
          path="/SplashScreen"
          element={
            <Suspense>
              <SplashScreen />
            </Suspense>
          }
        />
        <Route
          path="/StoryScreen1"
          element={
            <Suspense>
              <StoryScreen1 />
            </Suspense>
          }
        />
        <Route
          path="/StoryScreen2"
          element={
            <Suspense>
              <StoryScreen2 />
            </Suspense>
          }
        />
        <Route
          path="/StoryScreen3"
          element={
            <Suspense>
              <StoryScreen3 />
            </Suspense>
          }
        />
        <Route
          path="/StoryScreen4"
          element={
            <Suspense>
              <StoryScreen4 />
            </Suspense>
          }
        />
        <Route
          path="/StoryScreen5"
          element={
            <Suspense>
              <StoryScreen5 />
            </Suspense>
          }
        />
        <Route
          path="/Profile"
          element={
            <Suspense>
              <ProfileScreen />
            </Suspense>
          }
        />
        <Route
          path="/UpdatePassword"
          element={
            <Suspense>
              <UpdatePasswordScreen setToken={setToken} />
            </Suspense>
          }
        />
        <Route
          path="/Tools"
          element={
            <Suspense>
              <ToolsScreen />
            </Suspense>
          }
        />
        <Route
          path="/Groundwork"
          element={
            <Suspense>
              <GroundworkScreen />
            </Suspense>
          }
        />
        <Route
          path="/Garden"
          element={
            <Suspense>
              <GardenScreen />
            </Suspense>
          }
        />
        <Route
          path="/Welcome"
          element={
            <Suspense>
              <WelcomeScreen />
            </Suspense>
          }
        />
        <Route
          path="/ToolVideoPage"
          element={
            <Suspense>
              <ToolsVideoScreen />
            </Suspense>
          }
        />
        <Route
          path="/GroundworkVideoPage"
          element={
            <Suspense>
              <GroundworkVideoScreen />
            </Suspense>
          }
        />
        <Route
          path="/CharacterSelectionScreen"
          element={
            <Suspense>
              <CharacterSelectionScreen />
            </Suspense>
          }
        />
        <Route
          path="/BloomSelectionScreen"
          element={
            <Suspense>
              <BloomSelectionScreen />
            </Suspense>
          }
        />
        <Route
          path="/InitialBloomSelection"
          element={
            <Suspense>
              <InitialBloomSelectionScreen />
            </Suspense>
          }
        />
        <Route
          path="/BloomConfirmationScreen"
          element={
            <Suspense>
              <BloomConfirmationScreen />
            </Suspense>
          }
        />
        <Route
          path="/SelectResonance"
          element={
            <Suspense>
              <SelectResonance />
            </Suspense>
          }
        />
        <Route
          path="/Search"
          element={
            <Suspense>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="/ResonanceFinderResultspage"
          element={
            <Suspense>
              <ResonanceFinderResult />
            </Suspense>
          }
        />
        <Route
          path="/Settings"
          element={
            <Suspense>
              <Setting />
            </Suspense>
          }
        />
        <Route
          path="/ManageSubscriptions"
          element={
            <Suspense>
              <ManageSubcription />
            </Suspense>
          }
        />
        <Route
          path="/ContactUs"
          element={
            <Suspense>
              <ContactUs />
            </Suspense>
          }
        />
        <Route
          path="/PrivacyPolicy"
          element={
            <Suspense>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/TermsOfUse"
          element={
            <Suspense>
              <TermsOfUse />
            </Suspense>
          }
        />
        <Route
          path="/EmailNotifications"
          element={
            <Suspense>
              <EmailNotification />
            </Suspense>
          }
        />
        <Route
          path="/PushNotifications"
          element={
            <Suspense>
              <PushNotification />
            </Suspense>
          }
        />
        <Route
          path="/BloomCheckScreen"
          element={
            <Suspense>
              <BloomCheck />
            </Suspense>
          }
        />
        <Route
          path="/BigBlooms2Petals"
          element={
            <Suspense>
              <BigBloom2Petal />
            </Suspense>
          }
        />
        <Route
          path="/BigBlooms4Petals"
          element={
            <Suspense>
              <BigBloom4Petal />
            </Suspense>
          }
        />{" "}
        <Route
          path="/BigBlooms6Petals"
          element={
            <Suspense>
              <BigBloom6Petal />
            </Suspense>
          }
        />{" "}
        <Route
          path="/BigBlooms8Petals"
          element={
            <Suspense>
              <BigBloom8Petal />
            </Suspense>
          }
        />
        <Route
          path="/HomePage"
          element={
            <Suspense>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/GroundWorks"
          element={
            <Suspense>
              <Groundworks />
            </Suspense>
          }
        />
        <Route
          path="/ToolsWeb"
          element={
            <Suspense>
              <Tools />
            </Suspense>
          }
        />
        <Route
          path="/Guides"
          element={
            <Suspense>
              <Guides />
            </Suspense>
          }
        />
        <Route
          path="/CommunityGarden"
          element={
            <Suspense>
              <ComunityGarden />
            </Suspense>
          }
        />
        <Route
          path="/FreshBloomsScreen"
          element={
            <Suspense>
              <FreshBloomsScreen />
            </Suspense>
          }
        />
        <Route
          path="/TeacherScreen"
          element={
            <Suspense>
              <TeacherScreen />
            </Suspense>
          }
        />
        <Route
          path="/SelectAvatar"
          element={
            <Suspense>
              <SelectAvatar />
            </Suspense>
          }
        />
        <Route
          path="/SelectBlooms"
          element={
            <Suspense>
              <SelectBlooms />
            </Suspense>
          }
        />
        <Route
          path="/BloomsCheck"
          element={
            <Suspense>
              <CheckBlooms />
            </Suspense>
          }
        />
        <Route
          path="/BloomsResult"
          element={
            <Suspense>
              <BloomsResult />
            </Suspense>
          }
        />
        <Route
          path="/SignupScreen"
          element={
            <Suspense>
              <SignupScreen />
            </Suspense>
          }
        />
        <Route
          path="/SearchResult"
          element={
            <Suspense>
              <SearchResultScreen />
            </Suspense>
          }
        />
        <Route
          path="/ResonanceResult"
          element={
            <Suspense>
              <ResonanceResultScreen />
            </Suspense>
          }
        />
        <Route
          path="/AppointmentSchedulePage"
          element={
            <Suspense>
              <AppoinmentScheduleScreen />
            </Suspense>
          }
        />
        <Route
          path="/FooterScreen"
          element={
            <Suspense>
              <FooterScreen />
            </Suspense>
          }
        />
        <Route
          path="/GroundWorkInnerPage"
          element={
            <Suspense>
              <InnerPageScreen />
            </Suspense>
          }
        />
        <Route
          path="/ToolInnerPage"
          element={
            <Suspense>
              <ToolInnerPageScreen />
            </Suspense>
          }
        />
        <Route
          path="/Waitinglist"
          element={
            <Suspense>
              <Waitinglist />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default Navigation;
