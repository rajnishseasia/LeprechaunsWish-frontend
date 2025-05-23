import React, { useEffect, useState } from "react";
import CrystalDetailModal from "../Modals/CrystalDetailModal";
import useGetOwner from "@/hooks/useGetOwner";
import { useGetMetaDataQuery } from "@/services/metadata";

function CrystalsCard({ val, saleType, type }) {
  const [openCrystalModal, setOpenCrystalModal] = useState(false);
  const [crystalName, setCrystalName] = useState(val.name);


  const handleCrystalModal = () => {
    setOpenCrystalModal(true);
  };


  const {
    data: nftMetaUrlData,
  } = useGetMetaDataQuery(
    { tokenId: val?.tokenId },
    { skip: type !== "crystal" || !val?.tokenId }
  );
  
  const { ownerData } = useGetOwner({ enabled: saleType === "purchased", teirId: val?.tokenId });


  useEffect(() => {
    if (val?.teir) {
      const paddedNftId = String(Number(val?.teir)).padStart(4, "0"); // Ensure nftId is 4 digits
      if (openCrystalModal) {
        setCrystalName(`Coin ${paddedNftId}`);
      } else {
        setCrystalName(`Crystal ${paddedNftId}`);
      }
    }
  }, [openCrystalModal, val]);

  return (
    <>
      <div
        onClick={handleCrystalModal}
        className="md:w-[290px] xxs:w-[150px] w-full cursor-pointer bg-white/10 hover:bg-orange-300/40 backdrop-blur-[20px] md:px-[6px] px-[4px] md:py-[10px] py-[8px] rounded-[20px]"
      >
        <div className="md:w-[275px] w-full md:h-[207px] xxs:h-[150px] h-auto flex justify-center">
          <img
            src={nftMetaUrlData?.image ? nftMetaUrlData?.image : val?.uri}
            alt="love token"
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
        <div className="flex items-center justify-center gap-8 py-4 w-full px-[5px]">
          <h1 className="text-white md:text-[20px] text-[14px] font-[500]">
            {crystalName}
          </h1>
        </div>
      </div>
      {saleType === "purchased"
        &&
        <CrystalDetailModal
          isOpen={openCrystalModal}
          setOpenCrystalModal={setOpenCrystalModal}
          name={crystalName}
          owner={ownerData}
          nftImage={nftMetaUrlData?.image ? nftMetaUrlData?.image : val?.uri}
        />
      }
    </>
  );
}

export default CrystalsCard;
