import { baseApi } from "@/redux/api/baseApi";

const bookApi =baseApi.injectEndpoints({
    endpoints:(builder) =>({
        createBook: builder.mutation({
            query: (userInfo) => ({
                url: '/books',
                method: 'POST',
                body: userInfo
            }),
            invalidatesTags: [ 'book']
        }),
        getBooks: builder.query({
            query: () => {
                return {
                    url: '/books',
                    method: 'GET',
                }
            },
            providesTags: ['book']
        }),
         getBook: builder.query({
            query: (params) => {
                return {
                    url: `/books/${params}`,
                    method: 'GET',
                }
            },
        }),
         deleteBook: builder.mutation({
            query: (params) => {
                return {
                    url: `/books/${params}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['book'],
        }),
        updateBook: builder.mutation({
            query: (args) => {
                 // eslint-disable-next-line prefer-const, prefer-const
                let updateData:Record<string,unknown> ={}
                Object.keys(args.updateData).forEach((key) =>{
                    if(args.updateData[key] !==undefined || args.updateData[key] !==undefined){
                        updateData[key] =args.updateData[key]
                    }
                })
                console.log(args.id, "argfjfjs")
                return {
                    url: `/books/${args.id}`,
                    method: 'PUT',
                    body: updateData
                }
            },
            invalidatesTags: ['book']
        }),
        borrowBook: builder.mutation({
            query: (args) => {
                return {
                    url: `/borrow`,
                    method: 'POST',
                    body:args
                }
            },
            invalidatesTags: ['book'],
        }),
        getBorrowSummary: builder.query({
            query: () => {
                return {
                    url: `/borrow/`,
                    method: 'GET',
                }
            },
        }),
    })
})


export const {useCreateBookMutation,useGetBooksQuery,useGetBookQuery,useDeleteBookMutation,useBorrowBookMutation,useUpdateBookMutation,useGetBorrowSummaryQuery} =bookApi