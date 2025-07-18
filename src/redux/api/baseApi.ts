import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseApi =createApi({
    reducerPath:"baseApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://library-backend-cyan.vercel.app/api"}),
    endpoints: () => ({}),
    tagTypes:['book']
})