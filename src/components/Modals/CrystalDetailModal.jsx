import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crystal001 } from "@/assets";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { truncateAddress } from "@/lib/constants";
import { FaRegCopy } from "react-icons/fa6";
import toast from "react-hot-toast";

const CrystalDetailModal = ({
  isOpen,
  setOpenCrystalModal,
  name,
  owner,
  nftImage,
}) => {
  const handleClose = () => {
    setOpenCrystalModal(false);
  };

  const handleOpenSea = () => {
    window.open(`https://opensea.io/`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setOpenCrystalModal(open)}>
      <DialogContent className="bg-white/10 backdrop-blur-[30px] border-none outline-none text-white rounded-[15px] max-w-[80%] mx-auto smx:max-w-[468px] font-play">
        <div className="rounded-xl overflow-hidden h-[200px] relative">
          <DialogClose asChild>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 z-50 text-white text-2xl"
            >
              <IoIosCloseCircleOutline />
            </button>
          </DialogClose>
          <img
            src={nftImage ? nftImage : Crystal001}
            alt="Blue Crystal"
            className="object-cover h-full w-full"
          />
        </div>
        <div>
          <DialogTitle className=" text-[24px] smx:text-[32px] font-[500]">
            {name}
          </DialogTitle>
          <p className="text-white/80 text-base font-[400]">
            Leprechaun's Wish
          </p>
        </div>
        {owner && (
          <div className="text-base font-[500] flex gap-2">
            <span>Owned By</span>
            <span className=" flex gap-1 items-center">
              {truncateAddress(owner)}
              <FaRegCopy
                className=" cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(owner);
                  toast.success("Copied Succesfully");
                }}
                size={16}
              />
            </span>
          </div>
        )}

        <button
          onClick={handleOpenSea}
          className="px-4 py-2 border backdrop-blur-[40px] bg-[#210860] hover:bg-purple-800 transition text-white border-[#8768ED] text-[14px] rounded-full w-fit"
        >
          View On Open Sea
        </button>

        <div>
          <h3 className="font-medium text-white">Traits</h3>
          <div className="flex gap-10 text-sm text-white/70 mt-1">
            <span className="inline-block text-xs mt-2 px-3 py-1 bg-yellow-700/30 text-yellow-300 rounded-full">
              Coming Soon
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-white">Utility</h3>
          <span className="inline-block text-xs mt-2 px-3 py-1 bg-yellow-700/30 text-yellow-300 rounded-full">
            Coming Soon
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrystalDetailModal;
