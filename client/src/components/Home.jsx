import { useSelector } from "react-redux";
import HomeComp from "./HomeComp";
import Path from "./Path";
import Course from "./Course";


function Home() {
  const currentView = useSelector((state) => state.userInteractions.currentView);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeComp />;
        case "path":
          return <Path />;
          case "course":
            return <Course />;
      default:
        return <HomeComp />; // Default view if something goes wrong
    }
  };

  return <>{renderView()}</>;
}

export default Home;
