import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div
      className={`${location?.pathname === "/" && "bg-heroBg" || "bg-[#202056]"} ${
        location?.pathname !== "/" && "bg-defaultBg" || "bg-[#202056]"
      } md:bg-cover md:bg-no-repeat`}
    >
      <div className="flex flex-col min-h-screen font-play">
        <Navbar />
        <div className="flex-1 md:pt-10 pt-5 md:px-[80px] px-4 md:pb-5 pb-2 desktop:max-w-[1440px] desktop:mx-auto my-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
