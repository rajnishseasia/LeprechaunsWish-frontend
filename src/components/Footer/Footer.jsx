import { ROUTES } from "@/routes/routes";
import { setOpenPrivacy, setOpenTerms } from "@/store/slices/authSlice";
import React from "react";
import {
  FaXTwitter,
  FaRegCopyright,
  FaDiscord,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TermsModal from "../Modals/TermsandConditionModal";
import PrivacyPolicyModal from "../Modals/PrivacyPolicyModal";

function Footer() {

  const dispatch = useDispatch();
  const redirect = (link) => {
    if (!link)
      return;
    window.open(link, "_blank", "noopener,noreferrer");
  };


  return (
    <footer className="backdrop-blur-[42px] bg-[#080647] text-white/60 px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className=" hidden max-mds:flex justify-center md:justify-start items-center space-x-4 text-xl">
          <FaDiscord className=" hover:text-white cursor-pointer" onClick={() => redirect("https://discord.com/invite/HxBTtUF6CC")} />
          <FaXTwitter className=" hover:text-white cursor-pointer" onClick={() => redirect("https://x.com/LeprechaunsWish")} />
        </div>

        <div className="flex justify-center items-center space-x-2 text-sm">
          <FaRegCopyright className="text-base" />
          <span>{`all rights reserved - The Leprechauns Wish LTD 2025`}</span>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-center">
          <button  onClick={() => dispatch(setOpenTerms(true))}
            className=" cursor-pointer hover:text-white hover:underline">
            Terms and Conditions
          </button>
          <button onClick={() => dispatch(setOpenPrivacy(true))} className=" cursor-pointer hover:text-white hover:underline">
            Privacy Policy
          </button>
          <Link to={ROUTES.CONTACT} className=" cursor-pointer hover:text-white hover:underline">
            Contact
          </Link>
        </div>
      </div>
      <TermsModal />
      <PrivacyPolicyModal />
    </footer>
  );
}

export default Footer;
