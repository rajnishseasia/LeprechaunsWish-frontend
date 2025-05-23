import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useReadContract } from "wagmi";
import appConfig from "@/lib/appConfig";
import NFT_CONTRACT_ABI from "../../abi/NFT_CONTRACT_ABI.json";
import { getCrystalCoinRoute } from "@/lib/utils";
import useGetDecimal from "@/hooks/useGetDecimal";
import { useDispatch } from "react-redux";
import { setSelectedCrystalCoinType } from "@/store/slices/authSlice";
import { formatUnits } from "viem";
import ToSubscript from "../ToSubscript/ToSubscript";

function CrystalSubCard({ val, type }) {
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();

    const {
        data: nftMetaData,
    } = useReadContract({
        address: appConfig.NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "nftTiersMetadata",
        args: [4],
    });

    const { stableCoinDecimal } = useGetDecimal();


    const handleCardClick = () => {
        try {
            dispatch(setSelectedCrystalCoinType({ name: val?.name, subTeirId: val?.tokenId, image: val?.uri }));
            navigate(getCrystalCoinRoute(val?.name));
        }
        catch (error) {
            console.log("Error in sub crystal:", error);
        }
    };

    useEffect(() => {
        if (
            nftMetaData &&
            Array.isArray(nftMetaData) &&
            nftMetaData.length > 0 &&
            nftMetaData[0] !== undefined
        ) {
            try {
                const rawPrice = BigInt(nftMetaData[0]);
                const formattedPrice = formatUnits(rawPrice, stableCoinDecimal); // returns string
                setPrice(formattedPrice); // precise string (e.g., "1.23456")
            } catch (error) {
                console.error("Error parsing nftMetaData[0] to BigInt:", error);
            }
        } else {
            console.warn("nftMetaData[0] is undefined or invalid:", nftMetaData);
        }
    }, [nftMetaData, stableCoinDecimal]);


    return (
        <div
            role="button"
            onClick={handleCardClick}
            className={`cursor-pointer bg-white/10 hover:bg-orange-300/40 backdrop-blur-[20px] rounded-[15px] md:w-[400px] xxs:w-[150px] w-full md:px-[10px] px-[4px] md:py-[15px] py-[8px]}`}
        >
            <div className={`flex justify-center md:w-[375px] w-full md:h-[307px] xxs:h-[150px] h-auto}`}>
                <img
                    src={val?.uri}
                    alt={val?.name || "item"}
                    className={`w-full h-full object-cover rounded-[20px]`}
                />
            </div>
            <div className={`w-full px-[5px] text-white flex items-center justify-center gap-8 py-4}`}>
                <h1 className={`md:text-[20px] text-[14px] font-[500]`}>
                    {type === "collectedVault" ? "Collected" : val?.name}
                </h1>
                <span className="gradient-text md:text-[20px] text-[10px] font-[700]">
                    {type === "vault" && <ToSubscript number={price} sub={"subscript"} />}
                    {type === "collectedVault" &&
                        <ToSubscript
                            number={price * Number(nftMetaData?.[2])}
                            sub={"subscript"}
                        />
                    }
                    {(type !== "vault" || type !== "collectedVault") && val?.price}{" "}
                    ETH
                </span>
            </div>
        </div>
    );
}

export default CrystalSubCard;
