import appConfig from "@/lib/appConfig";
import { MoonPayBuyWidget } from "@moonpay/moonpay-react";
import React from "react";
import { useAccount } from "wagmi";

const MoonPay = ({ setShowWidget, showWidget, setMoonpayTxComplete }) => {
  const { address } = useAccount();

  const handleGetSignature = async (url) => {
    try {
      const token = localStorage.getItem("token");
      const signature = await fetch(
        `${appConfig.BASE_URL}url/sign-url?url=${encodeURIComponent(url)}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true", // This header helps bypass the ngrok warning
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await signature.json(); // ✅ parse as JSON
      return responseData?.data;
    } catch (error) {
      console.log("Error ing monnpay get urlk: ", error);
    }
  };

  const configuration = {
    apiKey: appConfig.MOONPAY_PUBLIC_API_KEY,
    defaultCurrencyCode: "eth",
    baseCurrencyAmount: "50", // NOTE: Minimum for most currencies is ~$30 USD
    walletAddress: address, // To successfully prefill, address and defaultCurrencyCode must be from same chain.
    redirectURL: "https://moonpay.com",
    variant: "overlay",
    lockAmount: true,
    baseCurrencyCode: "usd",
    paymentMethod: "paypal", // Refer teno documentation for various payment methods
    visible: showWidget,
    onUrlSignatureRequested: handleGetSignature,
    onClose: () => setShowWidget(false),
    onTransactionCompleted: (transaction) => {
      if (transaction?.status === "completed") {
        setShowWidget(false);
        setMoonpayTxComplete(true);
      }
    },
  };
  return <MoonPayBuyWidget {...configuration} />;
};

export default MoonPay;
