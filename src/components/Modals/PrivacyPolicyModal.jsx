"use client";

import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setOpenPrivacy } from "@/store/slices/authSlice";

const PrivacyPolicyModal = () => {
    const { openPrivacy } = useSelector((state) => state.global);
    const dispatch = useDispatch();

    return (
        <Dialog open={openPrivacy} onOpenChange={(open) => dispatch(setOpenPrivacy(open))}>
            <DialogContent
                className="bg-white/10 backdrop-blur-[30px] border-none text-white rounded-[15px] max-w-[90%] smx:max-w-[800px] font-play 
                   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed"
            >
                <DialogClose asChild>
                    <button
                        onClick={() => dispatch(setOpenPrivacy(false))}
                        className="absolute top-4 right-4 text-white text-2xl z-50"
                    >
                        <IoIosCloseCircleOutline />
                    </button>
                </DialogClose>

                <div className="px-4 py-3 space-y-4 max-h-[70vh] overflow-y-auto text-sm text-white/90">
                    <h1 className="text-2xl font-bold text-center">Privacy Policy</h1>
                    <p><strong>Effective Date:</strong> May 1st 2025</p>

                    <p>This Privacy Policy explains how The Leprechaun’s Wish ("we", "our", or "us") collects, uses, discloses, and protects your information when you visit our NFT platform, interact with our services, or participate in our investment opportunities.</p>

                    <h2 className="text-lg font-semibold">1. Information We Collect</h2>
                    <h3 className="font-semibold">a) NFT Users (Wallet-Only Access)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Wallet address</li>
                        <li>Blockchain transaction data (public)</li>
                        <li>Device information (IP address, browser type, etc.)</li>
                    </ul>
                    <p>We do not collect names, emails, or other personally identifying information unless voluntarily provided.</p>

                    <h3 className="font-semibold">b) Fiat Users (Credit Card via MoonPay)</h3>
                    <p>When purchasing NFTs with fiat through MoonPay, we may receive:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Confirmation of purchase</li>
                        <li>Transaction metadata (amount, NFT ID)</li>
                        <li>Email address (for delivery or account linking)</li>
                    </ul>
                    <p>Payment and identity information is processed by MoonPay. We do not store your credit card details. Please refer to MoonPay’s Privacy Policy for more details.</p>

                    <h3 className="font-semibold">c) Investors (KYC Required)</h3>
                    <p>For users applying for investment access:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Full name</li>
                        <li>Date of birth</li>
                        <li>Government-issued ID</li>
                        <li>Selfie or biometric verification</li>
                        <li>Proof of address</li>
                        <li>Accreditation documents (if applicable)</li>
                    </ul>
                    <p>This data is collected to comply with financial regulations (e.g., anti-money laundering and KYC laws). We may use third-party verification providers for secure KYC processing.</p>

                    <h2 className="text-lg font-semibold">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Facilitate NFT purchases and transfers</li>
                        <li>Deliver purchased assets</li>
                        <li>Comply with legal obligations (KYC/AML)</li>
                        <li>Detect and prevent fraud</li>
                        <li>Communicate with users (if contact info is provided)</li>
                        <li>Improve platform performance and security</li>
                    </ul>

                    <h2 className="text-lg font-semibold">3. Sharing of Information</h2>
                    <p>We may share data with:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Payment processors (e.g., MoonPay)</li>
                        <li>KYC service providers</li>
                        <li>Regulatory authorities when required by law</li>
                        <li>Service providers assisting with infrastructure, analytics, or customer support</li>
                    </ul>
                    <p>We do not sell your personal data.</p>

                    <h2 className="text-lg font-semibold">4. Data Retention</h2>
                    <p>Wallet-only data is stored minimally and anonymized where possible. Fiat and investor data are retained as required by financial laws (typically up to 7 years).</p>

                    <h2 className="text-lg font-semibold">5. Your Rights</h2>
                    <p>Depending on your jurisdiction (e.g., GDPR, CCPA), you may have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Access, update, or delete your data</li>
                        <li>Object to processing</li>
                        <li>Withdraw consent</li>
                        <li>File a complaint with a data protection authority</li>
                    </ul>

                    <h2 className="text-lg font-semibold">6. Data Security</h2>
                    <p>We implement industry-standard measures to protect your data, including encryption, secure KYC transmission, and restricted access protocols.</p>

                    <h2 className="text-lg font-semibold">7. Children’s Privacy</h2>
                    <p>Our services are intended for users aged 18 and older. We do not knowingly collect data from minors.</p>

                    <h2 className="text-lg font-semibold">8. Changes to This Policy</h2>
                    <p>We may update this policy from time to time. Material changes will be communicated via email (if provided) or posted on our website.</p>

                    <h2 className="text-lg font-semibold">9. Contact Us</h2>
                    <p>If you have questions or concerns, contact us at:</p>
                    <p>📧 <a href="mailto:support@theleprechaunswish.com" className="text-blue-400 underline">support@theleprechaunswish.com</a></p>
                    <p>📍 The Leprechaun’s Wish LTD, 77 Lower Camden Street, St Kevin’s, Dublin, Ireland</p>

                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => dispatch(setOpenPrivacy(false))}
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

export default PrivacyPolicyModal;
