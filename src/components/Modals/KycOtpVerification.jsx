import React, { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import OTPInput from "react-otp-input";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useResendOtpMutation, useVerifyEmailMutation } from "@/services/api";
import { LuLoader } from "react-icons/lu";
import toast from "react-hot-toast";
import { showErrorToast } from "@/lib/constants";

const KycOtpVerification = ({ isOpen, matchKey, onClose }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const { email } = useSelector((state) => state.global);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const handleResendCode = async () => {
    try {
      const res = await resendOtp({ email }).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        setOtp("");
      }
    } catch (err) {
      console.log("resend Otp error:", err);
      showErrorToast(err?.data?.error?.message);
    }
    setTimer(60);
    setIsTimerActive(true);
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      setError("Please fill out all OTP fields.");
      return;
    }
    try {
      const response = await verifyEmail({
        otp,
        email,
        token: matchKey
      }).unwrap();
      if (response?.message) {
        toast.success(
          `Thank you for applying to be an investor of The Leprechaun’s Wish. You will receive an accredited investor application shortly. We look forward to hopefully making some magic together.`,
          {
            style: {
              width: window.innerWidth < 600 ? '90%' : '500px',
              whiteSpace: 'pre-wrap',
            },
            duration: 10000,
          }
        );
        setOtp("");
        onClose(false);
      }
    } catch (error) {
      console.log("error", error);
      showErrorToast(error?.data?.error?.message);
      setOtp("");
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  useEffect(() => {
    setOtp("");
    if (isOpen) {
      setTimer(60);
      setIsTimerActive(true);
    } else {
      setIsTimerActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  useEffect(() => {
    setError("");
    setOtp("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-[30px] border-none outline-none text-white rounded-[15px] max-w-[80%] mx-auto smx:max-w-[468px] font-play">
        <DialogClose asChild className="p-4">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 z-50 text-white text-2xl"
          >
            <IoIosCloseCircleOutline />
          </button>
        </DialogClose>
        <div className="w-full flex items-center justify-center">
          <h1 className="md:text-2xl text-xl font-[700] text-white">
            KYC OTP Verification
          </h1>
        </div>
        <form className="space-y-10 w-full">
          <div className="pt-4 w-full px-5">
            <div className="w-full flex justify-center items-center">
              <OTPInput
                containerStyle={"otp-container"}
                inputStyle={"input-container"}
                value={otp}
                onChange={(e) => {
                  if (/^\d*$/.test(e)) {
                    setOtp(e);
                  }
                }}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>

          <div className="text-center space-y-2 flex flex-col justify-center items-center w-full">
            <button
              type="button"
              onClick={handleVerify}
              className="px-6 py-2 rounded-full bg-[#210860] hover:bg-purple-800 transition text-white md:w-[190px] w-full md:text-base text-xs backdrop-blur-[40px] flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              Submit
              {isLoading && <LuLoader className="animate-spin" />}
            </button>
            <p className="text-white/60 text-xs">
              {isTimerActive ? (
                `Send code again in ${String(Math.floor(timer / 60)).padStart(
                  2,
                  "0"
                )}:${String(timer % 60).padStart(2, "0")}`
              ) : (
                <span
                  onClick={handleResendCode}
                  disabled={resendLoading}
                  className="text-white/55 hover:text-white text-sm cursor-pointer"
                >
                  Resend Code ?
                </span>
              )}
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KycOtpVerification;
