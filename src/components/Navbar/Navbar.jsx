import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import WalletConnectButton from "../ConnectButton/ConnectButton";
import useOutsideClick from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routes";
import useGetRole from "@/hooks/useGetRole";
import { useAccount } from "wagmi";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/vault", label: "The Vault" },
  { path: "#", label: "Whitepaper" },
  // { path: "/buy", label: "Buy" },
  { path: "#", label: "Roadmap" },
  { path: "/contact", label: "Contact" },
  {
    path: "/admin",
    label: "Admin",
  },   
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();

  const navRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useOutsideClick(navRef, () => setIsOpen(false));

  const { ownerData } = useGetRole({enabled: true});

  const isAdmin = ownerData === address;

  const filteredLinks = navLinks.filter((link) =>
    link.path === "/admin" ? isAdmin : true
  );


  const redirect = (link) => {
    if (!link)
      return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const renderLinks = (className = "") =>
    filteredLinks.map(({ path, label }) => (
      <li key={label}>
        <Link
          to={path}
          className={cn(
            "relative inline-block font-[300] transition-all duration-300 ease-in-out group",
            "after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] text-white/70 after:bg-[#8768ED] after:w-0 after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full",
            pathname === path && "text-white font-[500] after:w-full",
            "hover:text-white",
            className
          )}
        >
          {label}
        </Link>
      </li>
    ));

  return (
    <div ref={navRef} className="z-[999] relative">
      <nav className="w-full px-6 py-4 flex items-center justify-between text-white/70 backdrop-blur-[42px]">
        <div className="flex items-center gap-2">
          <span
            onClick={() => navigate(ROUTES.HOME)}
            className="font-bold text-white text-[16px] cursor-pointer"
          >
            The Leprechaun's Wish
          </span>
        </div>

        <div className="w-auto hidden mds:flex items-center justify-between bg-transparent transition-all duration-300 ease-in-out text-bungee">
          <ul className="flex flex-row items-center gap-6 md:gap-8 p-4 md:p-0 text-[16px] text-white">
            {renderLinks()}
          </ul>
        </div>

        <div className="flex relative items-center gap-2">
          <div className=" hidden mds:flex justify-center md:justify-start items-center space-x-4 text-xl">
            <FaDiscord className=" hover:text-white cursor-pointer" onClick={() => redirect("https://discord.com/invite/HxBTtUF6CC")} />
            <FaXTwitter className=" hover:text-white cursor-pointer" onClick={() => redirect("https://x.com/LeprechaunsWish")} />
          </div>
          <div className=" hidden mds:block">
          <WalletConnectButton />
          </div>
          <button
            className="mds:hidden text-white focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className=" flex-col gap-3 hidden max-mds:flex absolute top-[60px] right-3  p-5 border-white/[0.15] border bg-white/10 backdrop-blur-[40px] rounded-md text-white text-bungee">
          <WalletConnectButton />
          <ul
            onClick={(e) => {
              if (e.target.closest("a")) setIsOpen(false);
            }}
            className=" flex flex-col min-w-[100px] z-[100] gap-4"
          >
            {renderLinks()}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
