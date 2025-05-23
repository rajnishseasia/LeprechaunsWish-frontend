import React, { useEffect } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { emailRegex, showErrorToast, validateNameRegex } from "@/lib/constants";
import { useCreateUserMutation } from "@/services/api";
import { LuLoader } from "react-icons/lu";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setEmail } from "@/store/slices/authSlice";

const KycDetailModal = ({ isOpen, close, tokenName, matchKey, setOpenVerifyModal }) => {
  const { address } = useAccount();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const dispatch = useDispatch();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleClose = () => {
    close(false);
  };

  const onSubmit = async (data) => {
    try {
      const res = await createUser({
        name: data?.name,
        email: data?.email,
        walletAddress: address,
      }).unwrap();
      if (res?.message) {
        dispatch(setEmail(data?.email));
        toast.success(res?.message);
        setOpenVerifyModal(matchKey);
        close(false);
      }
    } catch (err) {
      console.log("Create User error:", err);
      showErrorToast(err?.data?.error?.message);
    }
  };

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => close(open)}>
      <DialogContent className="bg-white/10 backdrop-blur-[30px] border-none outline-none text-white rounded-[15px] max-w-[80%] mx-auto smx:max-w-[500px] font-play overflow-y-auto max-h-[90vh]">
        <DialogClose asChild className="p-4">
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 z-50 text-white text-2xl"
          >
            <IoIosCloseCircleOutline />
          </button>
        </DialogClose>
        <div className="rounded-xl">
          <div className="text-center mb-4">
            <h1 className="font-[700] text-xl">Complete Your KYC</h1>
          </div>
          <div className="max-h-[200px] overflow-y-auto space-y-4 border border-white/80 rounded-lg p-2 text-sm text-left px-2">
            <p>
              We work with a third-party vendor, <strong>Verify Investor</strong>, to ensure compliance with SEC regulations by verifying your status as an <strong>accredited investor</strong>.
            </p>

            <p>
              Once you complete the KYC and Accredited Investor process (usually within 24 hours) and are approved, you can pay via crypto or fiat. Funds will be held in escrow until the project is funded.
            </p>

            <p>
              If not funded within one year, you can request a refund after <strong>May 2026</strong>, with a $250 admin fee to cover escrow/legal costs.
            </p>

            <p>
              Contact us for support: <a href="mailto:support@theleprechaunswish.com" className="underline">support@theleprechaunswish.com</a>
            </p>

            <h2 className="font-bold mt-3">Accredited Investor Criteria</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Income-based verification</li>
              <li>Net worth over $1M (excluding primary residence)</li>
              <li>Letter from licensed attorney, CPA, or advisor</li>
              <li>Holding a financial license (e.g., Series 7)</li>
              <li>Company insider or knowledgeable employee</li>
              <li>Special cases (e.g., publicly known wealthy individuals)</li>
            </ul>

            <h2 className="font-bold mt-3">Documents Required</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Government ID:</strong> Passport or driver’s license</li>
              <li><strong>Proof of Address:</strong> Utility bill or bank statement</li>
              <li><strong>Selfie/Liveness Check:</strong> Real-time video or photo</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="py-4 space-y-3">
              <div className="w-full md:w-[410px] space-y-3">
                <label htmlFor="name" className=" mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: validateNameRegex,
                      message:
                        "Name must only contain letters and single spaces between words",
                    },
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name must not exceed 50 characters",
                    },
                  })}
                  className="md:w-[410px] w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-[40px] border-white/15 text-white border focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="w-full md:w-[410px] space-y-3">
                <label htmlFor="email" className=" mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailRegex,
                      message: "Invalid email format",
                    },
                  })}
                  className="md:w-[410px] w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-[40px] border-white/15 text-white border focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="w-full md:w-[410px] space-y-3">
                <label htmlFor="nftToken" className=" mb-2 text-sm">
                  Nft
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register("nftToken")}
                  value={tokenName}
                  readOnly
                  className="md:w-[410px] w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-[40px] border-white/15 text-white border focus:outline-none"
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-full bg-[#210860] hover:bg-purple-800 transition text-white md:w-[190px] w-full md:text-base text-xs backdrop-blur-[40px] flex items-center justify-center gap-2"
                >
                  Submit
                  {isLoading && <LuLoader className="animate-spin" />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KycDetailModal;
