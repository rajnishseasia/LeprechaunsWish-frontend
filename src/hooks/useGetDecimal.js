import appConfig from "@/lib/appConfig";
import { useReadContract } from "wagmi";
import STABLE_COIN_ABI from "../abi/STABLE_COIN_ABI.json";


const useGetDecimal = () => {

    const { data: stableCoinDecimal, error: decimalError } = useReadContract({
        address: appConfig.STABLE_CONTRACT_ADDRESS,
        abi: STABLE_COIN_ABI,
        functionName: "decimals",
    });

    return {
        stableCoinDecimal,
        decimalError
    }

};

export default useGetDecimal;