import type { toDoApi } from '@/types/typeApi'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://to-dos-api.softclub.tj/' }),
  endpoints: (build) => ({
    getUsers: build.query<toDoApi,unknown>({
      query: () => `api/to-dos`,
    }),
  deleteUsers: build.mutation({
      query: (id) => ({
        url: `api/to-dos?id=${id}`,
        method: "DELETE",
      }),
      }),
         editUsers:build.mutation({
         query:(obj)=>({
          url:`api/to-dos`,
          method:"PUT",
          body:obj
}) 
    }),
statusUsers: build.mutation({
      query: (id) => ({
        url: `/completed?id=${id}`,
        method: "PUT",
      }),
      }),
 getIds: build.query({
      query: (id) => `api/to-dos/${id}`,
    }),
    addUser:build.mutation({
query:(obj)=>({
url:`api/to-dos`,
method:"POST",
body:obj
})
    }),

    

  }),
});

export const { useGetUsersQuery, useDeleteUsersMutation ,useStatusUsersMutation,useGetIdsQuery,useAddUserMutation,useEditUsersMutation,useAddImgMutation} = todoApi;
