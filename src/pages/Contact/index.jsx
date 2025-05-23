import { useSubmitContactDetailsMutation } from '@/services/api';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuLoader } from 'react-icons/lu';
import { FaDiscord } from 'react-icons/fa';
import { FcOk } from "react-icons/fc";
import { FaXTwitter } from 'react-icons/fa6';

const ContactSection = () => {
    const [submitContactDetails] = useSubmitContactDetailsMutation();
    const [detailsSubmited, setDetailsSubmited] = useState(false);
    const [contactLoader, setContactLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            setContactLoader(true);
            const res = await submitContactDetails({
                name: data?.name,
                email: data?.email,
                message: data?.message,
            });

            if (res.data?.message) {
                reset();
                toast.success('Thanks for contacting us.');
                setDetailsSubmited(true);
            }
        } catch (error) {
            console.log('Error in email submit:', error?.message);
        } finally {
            setContactLoader(false);
        }
    };

    return (
        <div className="w-full md:px-[56px] px-[25px] md:pt-[56px] pt-[25px] md:pb-[60px] pb-[20px] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-[40px] text-white/80 shadow-lg my-5">
            {detailsSubmited ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-16">
                    <div className="">
                        <FcOk className=' text-[40px] md:text-[50px]' />
                    </div>
                    <h2 className=" text-xl md:text-2xl font-semibold text-white">Thank You for Contacting Us</h2>
                    <p className="text-white/80 text-sm md:text-md">We’ve received your message and will get back to you soon.</p>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex w-full gap-5 flex-wrap">
                                {/* Name */}
                                <div className="w-full font-play md:w-1/2 space-y-3">
                                    <label htmlFor="name" className="text-sm">Name</label>
                                    <input
                                        type="text"
                                        {...register('name', {
                                            required: 'Name is required',
                                            onChange: (e) => {
                                                const sanitized = e.target.value
                                                    .replace(/^\s+/, '')
                                                    .replace(/\s{2,}/g, ' ')
                                                    .replace(/\d+/g, '');
                                                e.target.value = sanitized;
                                                return sanitized;
                                            },
                                        })}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-2 rounded-md bg-white/10 border-white/15 text-white border focus:outline-none"
                                    />
                                    {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                                </div>

                                {/* Email */}
                                <div className="w-full font-play md:w-1/2 space-y-3">
                                    <label htmlFor="email" className="text-sm">Email</label>
                                    <input
                                        type="text"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Please enter a valid email address',
                                            },
                                        })}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 rounded-md bg-white/10 border-white/15 text-white border focus:outline-none"
                                    />
                                    {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                                </div>

                            </div>

                            {/* Message */}
                            <div className="w-full font-play space-y-3">
                                <label htmlFor="message" className="text-sm">Message</label>
                                <textarea
                                    rows={5}
                                    {...register('message', { required: 'Message is required' })}
                                    placeholder="Your message"
                                    onChange={(e) => {
                                        let inputVal = e.target.value
                                            .replace(/^\s+/, "")
                                            .replace(/\s{2,}/g, " ");
                                        e.target.value = inputVal;
                                    }}
                                    className="w-full px-4 py-2 rounded-md bg-white/10 border-white/15 text-white border focus:outline-none"
                                />
                                {errors.message && <span className="text-red-400 text-sm">{errors.message.message}</span>}
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start gap-6 mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-full bg-[#210860] hover:bg-purple-800 transition text-white w-[190px] md:text-base text-xs backdrop-blur-[40px] flex items-center justify-center gap-2"
                            >
                                Submit {contactLoader && <LuLoader className="animate-spin" />}
                            </button>
                        </div>

                        {/* Company Info & Socials */}
                        <div className="mt-6 w-full flex flex-col items-center font-play text-sm text-center gap-2">
                            <p className="font-semibold">The Leprechaun’s Wish LTD</p>
                            <p>77 Camden Street Lower, St Kevin’s, Dublin, Ireland</p>
                            <div className="flex gap-4 mt-2">
                                <a
                                    href="https://x.com/LeprechaunsWish"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white"
                                >
                                    <FaXTwitter size={20} />
                                </a>
                                <a
                                    href="https://discord.com/invite/HxBTtUF6CC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white"
                                >
                                    <FaDiscord size={20} />
                                </a>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default ContactSection;
