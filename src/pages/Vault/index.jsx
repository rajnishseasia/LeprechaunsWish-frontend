import { VaultImage } from "@/assets";
import CommonCrystalCard from "@/components/Cards/CommonCrystalCard";
import ToSubscript from "@/components/ToSubscript/ToSubscript";
import useTotalVaultValue from "@/hooks/useTotalVaultValue";
import { vaultCardData } from "@/lib/constants";
import React from "react";

const Vault = () => {
  const { totalVaultValue } = useTotalVaultValue();

  return (
    <div className="w-full">
      <div className=" flex flex-col min-[400px]:flex-row gap-2  sm:gap-8 p-3 sm:p-6 bg-white/10 backdrop-blur-[42px] rounded-[15px]">
        <div clas=" w-full flex md:flex-row flex-col  p-[14px]">
          <div className={`flex justify-center md:w-[300px] w-full md:h-[300px] xxs:h-[180px] smx:h-[220px] h-auto`}>
            <img
              src={VaultImage}
              alt={"vault"}
              className={`w-full h-full object-cover rounded-[20px]`}
            />
          </div>
        </div>
        <div className="w-full  md:px-0 px-2 smx:space-y-2 md:w-[600px]">
          <h1 className="text-white text-2xl font-[700] py-4">NFT Portfolio</h1>
          <div className="text-center border border-[#8768ED]/70 rounded-lg px-4 py-2 mdx:w-[300px] backdrop-blur-[20px] bg-white/5 w-full">
            <h1 className="md:text-[20px] text-[14px] font-[500]  text-white">Total Collected Amount</h1>
            <p className="text-sm text-white/70 font-[600] gradient-text">
              <ToSubscript number={totalVaultValue} sub={"subscript"} />
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-[56px]">
        <div className="flex flex-wrap justify-center  gap-[30px]">
          {vaultCardData.map((val) => (
            <CommonCrystalCard
              val={val}
              type={"collectedVault"}
              key={val.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vault;
