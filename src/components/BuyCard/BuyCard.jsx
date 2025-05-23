import appConfig from "@/lib/appConfig";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import NFT_CONTRACT_ABI from "../../abi/NFT_CONTRACT_ABI.json";
import PRESALE_CONTRACT_ABI from "../../abi/PRESALE_CONTRACT_ABI.json";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import useGetDecimal from "@/hooks/useGetDecimal";
import KycDetailModal from "@/components/Modals/KycDetailModal";
import KycOtpVerification from "@/components/Modals/KycOtpVerification";
import MoonPay from "@/components/Moonpay/MoonPay";
import { formatUnits } from "viem";
import { useGetVerifiedStatusQuery } from "@/services/api";
import useGetRole from "@/hooks/useGetRole";
import { matchTeirRoutes } from "@/lib/utils";
import { useSelector } from "react-redux";
import { crystalCardData } from "@/lib/constants";

function BuyCard({ teirId, tokenName, nftDetailsRefetch }) {
  const { register, watch, setValue } = useForm({
    defaultValues: {
      buyVia: "crypto",
    },
  });

  const { isConnected, address } = useAccount();
  const [openKycModal, setOpenKycModal] = useState({});
  const [openVerifyModal, setOpenVerifyModal] = useState({});
  const [showWidget, setShowWidget] = useState("");
  const [moonpayTxComplete, setMoonpayTxComplete] = useState(false);
  const token = localStorage.getItem("token");
  const [buyType, setBuyType] = useState("crypto");
  const [matchKey, setMatchKey] = useState("");
  const { selectedCrystalCoinType } = useSelector((state) => state.global);

  const { ownerData } = useGetRole({ enabled: true });
  const isAdmin = ownerData === address;

  const { data: verifiedStatus, refetch: verifyRefetch } =
    useGetVerifiedStatusQuery(
      {},
      {
        skip: !token,
      }
    );

  const {
    data: nftData,
    refetch: nftRefetch,
  } = useReadContract({
    address: appConfig.NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "nftTiersMetadata",
    args: [teirId],
  });

  const { stableCoinDecimal } = useGetDecimal();

  const {
    data: buyDataNft,
    writeContract: buyNft,
    isPending: buyNftPending,
    error: buyError,
    status: buyStatus,
  } = useWriteContract();

  const { isLoading: buyLoadingNft, isSuccess: buyConfirmNft } =
    useWaitForTransactionReceipt({
      hash: buyDataNft,
    });

  const openKycForToken = (name) => {
    setOpenKycModal((prev) => ({ ...prev, [name]: true }));
  };

  const closeKycForToken = (name) => {
    setOpenKycModal((prev) => ({ ...prev, [name]: false }));
  };

  const openVerifyForToken = (name) => {
    setOpenVerifyModal((prev) => ({ ...prev, [name]: true }));
  };

  const closeVerifyForToken = (name) => {
    setOpenVerifyModal((prev) => ({ ...prev, [name]: false }));
  };



  const handleFiatBuy = () => {
    const rawPrice = BigInt(nftData[0]);
    const price = formatUnits(rawPrice, stableCoinDecimal);
    if (!isConnected) {
      toast.error("Connect wallet.");
      return;
    }

    const isPriceAboveLimit = price >= appConfig?.TOKEN_PRICE_LIMIT;
    const isUserVerified = matchKey
      ? verifiedStatus?.data?.isVerified?.[matchKey] === true
      : false;

    if (isPriceAboveLimit && matchKey && !isAdmin) {
      const kycStatus = verifiedStatus?.data?.crystalKycStatus?.[matchKey];

      // 1. If user is not verified, open KYC modal
      if (isUserVerified === false) {
        setOpenKycModal(true);
        openKycForToken(matchKey);
        return;
      }

      // 2. If user started KYC but not completed
      if (kycStatus === false && isUserVerified === true) {
        toast.error("KYC initiated, Please contact the admin for further process.");
        return;
      }
    }

    setShowWidget(true);
  };

  // const handleNftBuy = async () => {
  //   const rawPrice = BigInt(nftData[0]);
  //   const price = formatUnits(rawPrice, stableCoinDecimal);
  //   if (!isConnected) {
  //     toast.error("Connect wallet.");
  //     return;
  //   }
  //   console.log(verifiedStatus?.data?.crystalKycStatus, "verifiedStatus?.data?.crystalKycStatus?.[matchKey]here ", matchKey)

  //   console.log(price >= appConfig?.TOKEN_PRICE_LIMIT,
  //     (!verifiedStatus?.data?.crystalKycStatus?.[matchKey])
  //     , !isAdmin, "condition")
  //   if (
  //     ((verifiedStatus?.data?.crystalKycStatus?.[matchKey] !== undefined && !verifiedStatus?.data?.crystalKycStatus?.[matchKey])) &&
  //     (price >= appConfig?.TOKEN_PRICE_LIMIT) &&
  //     !verifiedStatus?.data?.isVerified && !isAdmin
  //   ) {
  //     toast.error(
  //       "KYC initiated, Please contact the admin for further process."
  //     );
  //     return;
  //   }

  //   if (
  //     price >= appConfig?.TOKEN_PRICE_LIMIT &&
  //     (verifiedStatus?.data?.crystalKycStatus?.[matchKey] !== undefined && !verifiedStatus?.data?.crystalKycStatus?.[matchKey])
  //     &&
  //     !verifiedStatus?.data?.isVerified && !isAdmin
  //   ) {
  //     setOpenKycModal(true);
  //     openKycForToken(matchKey);
  //     return;
  //   }

  //   try {

  //     const subcategoryMatch = crystalCardData.find(
  //       (item) => item.name === selectedCrystalCoinType?.name
  //     );

  //     const subCategoryId = teirId === 4 ? subcategoryMatch?.teirId ?? 0 : 0;
  //     buyNft({
  //       abi: PRESALE_CONTRACT_ABI,
  //       address: appConfig.PRESALE_CONTRACT_ADDRESS,
  //       functionName: "buy",
  //       args: [appConfig.PHASE_ID, teirId, subCategoryId, []],
  //       value: nftData && nftData[0],
  //     });
  //   } catch (err) {
  //     console.error("Buy Error:", err);
  //   }
  // };

  const handleNftBuy = async () => {
    const rawPrice = BigInt(nftData[0]);
    const price = parseFloat(formatUnits(rawPrice, stableCoinDecimal)); // make sure it's number for comparison

    if (!isConnected) {
      toast.error("Connect wallet.");
      return;
    }

    const isPriceAboveLimit = price >= appConfig?.TOKEN_PRICE_LIMIT;
    const isUserVerified = matchKey
      ? verifiedStatus?.data?.isVerified?.[matchKey] === true
      : false;

    if (isPriceAboveLimit && matchKey && !isAdmin) {
      const kycStatus = verifiedStatus?.data?.crystalKycStatus?.[matchKey];

      // 1. If user is not verified, open KYC modal
      if (isUserVerified === false) {
        setOpenKycModal(true);
        openKycForToken(matchKey);
        return;
      }

      // 2. If user started KYC but not completed
      if (kycStatus === false && isUserVerified === true) {
        toast.error("KYC initiated, Please contact the admin for further process.");
        return;
      }
    }

    try {
      const subcategoryMatch = crystalCardData.find(
        (item) => item.name === selectedCrystalCoinType?.name
      );
      const subCategoryId = teirId === 4 ? subcategoryMatch?.teirId ?? 0 : 0;

      buyNft({
        abi: PRESALE_CONTRACT_ABI,
        address: appConfig.PRESALE_CONTRACT_ADDRESS,
        functionName: "buy",
        args: [appConfig.PHASE_ID, teirId, subCategoryId, []],
        value: nftData?.[0],
      });
    } catch (err) {
      console.error("Buy Error:", err);
    }
  };


  useEffect(() => {
    if (nftData) {
      const rawPrice = BigInt(nftData[0]);
      const maxSupply = BigInt(nftData[1]);
      const minted = BigInt(nftData[2]);

      const price = formatUnits(rawPrice, stableCoinDecimal); // accurate string value

      setValue("price", price); // already a precise string
      setValue("available", (maxSupply - minted).toString());
    }
  }, [nftData, setValue, stableCoinDecimal]);

  useEffect(() => {
    const matchedTeir = matchTeirRoutes.find((tier) => tier.teirId === teirId);
    console.log(matchedTeir?.name, "matchedTeir?.name here")
    if (teirId > 4 || teirId > "4")
      setMatchKey(matchedTeir?.name);
  }, [matchTeirRoutes])



  useEffect(() => {
    if (buyStatus === "error") {
      toast.error("Transaction failed.");
      setMoonpayTxComplete(false);
    }
  }, [buyStatus]);


  useEffect(() => {
    if (buyConfirmNft) {
      toast.success("Transaction success.");
      nftRefetch();
      nftDetailsRefetch();
      setMoonpayTxComplete(false);
    }
  }, [buyConfirmNft]);

  console.log(matchKey, "matechKey", verifiedStatus?.data?.isVerified?.[matchKey])


  useEffect(() => {
    if (moonpayTxComplete) {
      handleNftBuy();
    }
  }, [moonpayTxComplete]);

  useEffect(() => {
    if (token) verifyRefetch();
  }, [token]);


  return (
    <div className=" text-white/80">
      <form className=" sm:space-y-6 w-full">
        {(watch("price") >= appConfig?.TOKEN_PRICE_LIMIT) || !verifiedStatus?.data?.iskyc
          &&
          (<div className="items-center gap-3 sm:gap-4">
            <span className="text-xl text-white">Buy Via</span>
            <div className="flex items-center gap-5">
              <label htmlFor="buyVia-crypto" className="flex text-sm items-center gap-1">
                <input
                  type="radio"
                  id="buyVia-crypto"
                  value="crypto"
                  {...register("buyVia")}
                  onClick={() => setBuyType("crypto")}
                  onChange={() => setShowWidget(false)}
                  defaultChecked
                  className="accent-purple-600"
                />
                Crypto
              </label>
              {teirId !== 1 &&
                <label htmlFor="buyVia-fiat" className="flex text-sm items-center gap-1">
                  <input
                    type="radio"
                    id="buyVia-fiat"
                    value="fiat"
                    {...register("buyVia")}
                    onClick={() => setBuyType("fiat")}
                    onChange={() => setShowWidget(false)}
                    className="accent-purple-600"
                  />
                  Fiat
                </label>
              }
            </div>
          </div>)
        }

        <div className="flex gap-6 mt-4">
          <>
            <button
              type="button"
              disabled={buyLoadingNft || buyNftPending}
              onClick={() => {
                if (buyType === "fiat") {
                  handleFiatBuy();
                } else {
                  handleNftBuy();
                }
              }}
              className=" px-4 lg:px-6 py-2 rounded-full text-nowrap bg-[#210860] hover:bg-purple-800 transition text-white  md:text-base text-xs backdrop-blur-[40px] flex items-center justify-center gap-2"
            >
              {(((watch("price") >= appConfig?.TOKEN_PRICE_LIMIT) && !isAdmin) && (matchKey && verifiedStatus?.data?.crystalKycStatus?.[matchKey] === false)) ? `Apply to Buy` : `Buy`}
              {(buyLoadingNft || buyNftPending) && (
                <LuLoader className="animate-spin" />
              )}
            </button>
          </>
        </div>
      </form>
      {showWidget && buyType === "fiat" && (
        <MoonPay
          setShowWidget={setShowWidget}
          showWidget={showWidget}
          setMoonpayTxComplete={setMoonpayTxComplete}
        />
      )}
      <KycDetailModal
        close={() => closeKycForToken(matchKey)}
        isOpen={openKycModal[matchKey]}
        tokenName={tokenName}
        matchKey={matchKey}
        setOpenVerifyModal={openVerifyForToken}
      />
      <KycOtpVerification
        isOpen={openVerifyModal[matchKey]}
        matchKey={matchKey}
        onClose={() => closeVerifyForToken(matchKey)}
      />
    </div>
  );
}

export default BuyCard;
