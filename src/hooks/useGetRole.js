import appConfig from "@/lib/appConfig";
import { useReadContract } from "wagmi";
import NFT_CONTRACT_ABI from "../abi/NFT_CONTRACT_ABI.json";


const useGetRole = ({enabled}) => {

    const { data: ownerData, error: ownerError } = useReadContract({
        address: appConfig.NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "owner",
        enabled: enabled
    });

    return {
        ownerData,
        ownerError
    }

};

export default useGetRole;