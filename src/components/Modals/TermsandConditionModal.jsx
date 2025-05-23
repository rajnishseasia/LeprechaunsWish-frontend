"use client";

import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setOpenTerms } from "@/store/slices/authSlice";

const TermsModal = () => {
    const { openTerms } = useSelector((state) => state.global);
    const dispatch = useDispatch();

    return (
        <Dialog open={openTerms} onOpenChange={(open) => dispatch(setOpenTerms(open))}>
            <DialogContent
                className="bg-white/10 backdrop-blur-[30px] border-none text-white rounded-[15px] max-w-[80%] smx:max-w-[600px] font-play 
                   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed"
            >
                <DialogClose asChild>
                    <button
                        onClick={() => dispatch(setOpenTerms(false))}
                        className="absolute top-4 right-4 text-white text-2xl z-50"
                    >
                        <IoIosCloseCircleOutline />
                    </button>
                </DialogClose>

                <div className="px-2 py-3 space-y-4 max-h-[70vh] overflow-y-auto">
                    <h1 className="text-xl font-bold text-center">Terms & Conditions</h1>
                    <p className="text-sm text-white/90">
                        <strong>The Leprechaun’s Wish</strong> is an initiative by The Leprechaun’s Wish LLC combining
                        storytelling, NFTs, and community participation. By using this platform, you agree to these terms.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-2">
                        <li>You must be of legal age and capable of entering into binding agreements.</li>
                        <li>Purchasing NFTs does not give you ownership of IP unless explicitly stated.</li>
                        <li>We may update these Terms at any time. Continued use implies acceptance.</li>
                        <li>Use of the platform for unlawful or malicious activity is strictly prohibited.</li>
                        <li>All purchases are final — NFTs are non-refundable and irreversible.</li>
                        <li>Platform may experience downtimes; blockchain risks apply.</li>
                        <li>Disputes are resolved through binding arbitration in Dublin, Ireland (LCIA rules).</li>
                        <li>Your data is handled per our Privacy Policy (linked on the site).</li>
                    </ul>
                    <p className="text-sm">
                        For full terms and definitions, please read the complete{" "}
                        <a
                            href="https://docs.google.com/document/d/1mgbOa5NVx341Ft9iT1sWmH-irwLCw7AfahqEC71Hiz4/edit?tab=t.0"
                            rel="noopener,noreferrer" target="_blank"
                            className="underline text-blue-400"
                        >
                            Terms of Service
                        </a>.
                    </p>
                    <div className="flex justify-center pt-2">
                        <button
                            onClick={() => dispatch(setOpenTerms(false))}
                            className="px-6 py-2 rounded-full bg-[#210860] hover:bg-purple-800 transition text-white text-sm"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TermsModal;
