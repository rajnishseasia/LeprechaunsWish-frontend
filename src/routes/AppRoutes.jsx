import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./routes";
import MainLayout from "../layouts/MainLayout";
import useGetRole from "@/hooks/useGetRole";
import AdminRoute from "./AdminRoute";
import { useAccount } from "wagmi";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
// import ComingSoon from "@/pages/Home";

// const Home = lazy(() => import("../pages/Home"));
const ComingSoon = lazy(() => import("../pages/Home"));
const Rainbowlist = lazy(() => import("../pages/RainbowList"));
const RainbowPaper = lazy(() => import("../pages/RainbowPaper"));

const NftCardSection = lazy(() => import("@/pages/NFTCards"));
const CrystalDetail = lazy(() => import("@/pages/Crystal"));
const ContactSection = lazy(() => import("@/pages/Contact"))
const Vault = lazy(() => import("@/pages/Vault"));
const Admin = lazy(() => import("@/pages/Admin"));

function AppRoutes() {
  const { ownerData } = useGetRole({ enabled: true });
  const { address } = useAccount();
  const isAdmin = ownerData === address;
  return (
    <BrowserRouter>

      <Suspense fallback={<LoadingScreen />}>
        <ScrollToTop />
        <Routes>

          <Route path={ROUTES.HOME} element={<ComingSoon />} />
          <Route path={ROUTES.RAINBOWLIST} element={<Rainbowlist />} />
          <Route path={ROUTES.RAINBOWPAPER} element={<RainbowPaper />} />


          <Route path={ROUTES.HOME} element={<MainLayout />}>
            {/* <Route index element={<Home />} /> */}
            <Route path={ROUTES.NFTS} element={<NftCardSection />} />
            <Route path={ROUTES.CRYSTAL} element={<CrystalDetail />} />
            <Route path={ROUTES.CRYSTALCOIN} element={<CrystalDetail />} />
            <Route path={ROUTES.VAULT} element={<Vault />} />
            <Route path={ROUTES.CONTACT} element={<ContactSection />} />

            <Route
              path={ROUTES.ADMIN}
              element={
                <AdminRoute isAdmin={isAdmin}>
                  <Admin />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
