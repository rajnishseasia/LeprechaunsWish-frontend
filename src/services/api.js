import appConfig from "@/lib/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// main file which create the api
export const Apis = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig?.BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("ngrok-skip-browser-warning", "ngrok");
      return headers;
    },
  }),
  tagTypes: ["verifiedStatus"],
  endpoints: (builder) => ({
    moonPayUrl: builder.mutation({
      query: () => {
        return {
          method: "POST",
          url: `getmoonpayUrl`,
        };
      },
    }),
    getImageData: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `1`,
        };
      },
    }),
    getNftDetails: builder.query({
      query: ({ teirId, page, limit }) => {
        return {
          url: `nft/get-detail-byTier/${teirId}?page=${page}&limit=${limit}`,
          method: "GET",
          // params: { teirId },
        };
      },
    }),
    getVerifiedStatus: builder.query({
      query: () => {
        return {
          url: `user/get-user-detail`,
          method: "GET",
        };
      },
      providesTags: ["verifiedStatus"],
    }),
    signInMessage: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `user/sign-message`,
          body,
        };
      },
    }),
    verifySignMessage: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `user/verify-message`,
          body,
        };
      },
    }),
    createUser: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: "user/create-user",
          body,
        };
      },
    }),
    verifyEmail: builder.mutation({
      query: (body) => {
        if (!body) return; 
        return {
          method: "POST",
          url: "auth/verify-email",
          body,
        };
      },
      invalidatesTags: ["verifiedStatus"],
    }),

    resendOtp: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: "auth/resend-otp",
          body,
        };
      },
    }),
    updateKycStatus: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: "auth/admin/kyc-approve",
          body,
        };
      },
      invalidatesTags: ["verifiedStatus"],
    }),
    submitContactDetails: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `nft/send-mail-message`,
          body,
        };
      },
    }),
  }),
});

// https://ff37-2401-4900-1c0b-300c-51d7-bf8c-45c9-4eb6.ngrok-free.app/api/nft/get-detail-byTier/1

export const {
  useMoonPayUrlMutation,
  useGetImageDataQuery,
  useGetNftDetailsQuery,
  useSignInMessageMutation,
  useVerifySignMessageMutation,
  useCreateUserMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useGetVerifiedStatusQuery,
  useUpdateKycStatusMutation,
  useSubmitContactDetailsMutation
} = Apis;
