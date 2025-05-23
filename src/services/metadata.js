import appConfig from "@/lib/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// main file which create the api
export const Metadata = createApi({
    reducerPath: "metadata",
    baseQuery: fetchBaseQuery({
        baseUrl: appConfig?.METADATA_URL,
    }),
    tagTypes: ["verifiedStatus"],
    endpoints: (builder) => ({
        getMetaData: builder.query({
            query: ({ tokenId }) => {
                return {
                    method: "GET",
                    url: `${tokenId}`,
                };
            },
        }),
    }),
});


export const {
    useGetMetaDataQuery,
} = Metadata;
