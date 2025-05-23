import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useDisconnect,
  useSignMessage,
  useSwitchChain,
} from "wagmi";
import appConfig from "../../lib/appConfig";
import {
  useSignInMessageMutation,
  useVerifySignMessageMutation,
} from "@/services/api";  
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { copyToClipboard, showErrorToast, truncateAddress } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { FaRegCopy } from "react-icons/fa6";

function WalletConnectButton() {
  const { address, chainId, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { signMessageAsync } = useSignMessage();
  const [signInMessage] = useSignInMessageMutation();
  const [verifySignMessage] = useVerifySignMessageMutation();
  const [isSigning, setIsSigning] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (messageToSign) => {
    try {
      setIsSigning(true);
      if (!messageToSign) {
        throw new Error("No message provided for signing.");
      }

      const signature = await signMessageAsync({ message: messageToSign });
      return signature;
    } catch (error) {
      setIsSigning(false);
      console.error("Error during signing:", error.message || error);
      disconnect();
    }
  };

  const handleWalletLogin = async () => {
    if (!address) {
      console.error("Wallet address is not available.");
      return;
    }
    try {
      const res = await signInMessage({ walletAddress: address }).unwrap();
      if (!res?.message) {
        throw new Error("Server did not provide a sign-in message.");
      }

      const walletSignature = await handleSignIn(res.data?.message);
      const response = await verifySignMessage({
        walletAddress: address,
        signedMessage: walletSignature,
      }).unwrap();

      if (response) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.token);
      }

      localStorage.setItem("isReconnected", true);
    } catch (error) {
      setIsSigning(false);
      disconnect();
      console.error("Wallet login failed:", error);
      showErrorToast(error?.data?.error?.message);
    } finally {
      setIsSigning(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    localStorage.setItem("isReconnected", false);
    localStorage.removeItem("token");
    localStorage.removeItem("teirId");
    localStorage.removeItem("crystalised");
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    if (
      chainId &&
      address &&
      (chainId != appConfig.TESTNET_CHAIN_ID ||
        chainId != appConfig.MAINNET_CHAIN_ID)
    ) {
      switchChain({
        chainId:
          appConfig.CHAIN_NETWORK === "testnet"
            ? appConfig.TESTNET_CHAIN_ID
            : appConfig.MAINNET_CHAIN_ID,
      });
    }
  }, [chainId, address]);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (address && !token) {
      handleWalletLogin();
    }
  }, [address]);

  return (
    <div>
      {(() => {
        if (isConnecting || isSigning) {
          return (
            <button
              disabled
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#210860] cursor-not-allowed"
            >
              Connecting <LuLoader className="animate-spin" />
            </button>
          );
        }

        if (address) {
          return (
            <div className="flex items-center gap-2">
              <div className=" mds:block hidden"><ConnectButton accountStatus={false} showBalance={true} /></div>
              <button
                onClick={() => copyToClipboard(address, "Wallet address copied")}
                className="flex items-center gap-2 md:px-6 py-2 px-4 rounded-full bg-[#210860] text-white md:text-sm text-[10px]"
              >
                {truncateAddress(address)} <FaRegCopy />
              </button>
              <HiOutlineLogout
                onClick={handleDisconnect}
                className=" text-lg md:text-2xl cursor-pointer text-white"
              />
            </div>
          );
        }

        return <ConnectButton showBalance={true} label={"Connect Wallet"} />;
      })()}
    </div>
  );

}

export default WalletConnectButton;
