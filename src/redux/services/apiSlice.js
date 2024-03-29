// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_API } from '../../config'

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({
        baseUrl: URL_API,
        prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', URL_API)
            return headers
        },
    }),
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (requestBody) => ({
                url: '/user/loginUser',
                method: 'POST',
                body: requestBody,
            }),
        }),
        updatePassword: builder.mutation({
            query: (requestBody) => ({
                url: '/user/changeUserPassword',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getUser: builder.mutation({
            query: (requestBody) => ({
                url: '/user/getUser',
                method: 'POST',
                body: requestBody,
            }),
        }),
        addUser: builder.mutation({
            query: (requestBody) => ({
                url: '/user/addUser',
                method: 'POST',
                body: requestBody,
            }),
        }),
        updateUser: builder.mutation({
            query: (requestBody) => ({
                url: '/user/updateUser',
                method: 'POST',
                body: requestBody,
            }),
        }),
        deleteUser: builder.mutation({
            query: (requestBody) => ({
                url: '/user/deleteUser',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getRole: builder.mutation({
            query: (requestBody) => ({
                url: '/role/getRole',
                method: 'POST',
                body: requestBody,
            }),
        }),
        addRole: builder.mutation({
            query: (requestBody) => ({
                url: '/role/addRole',
                method: 'POST',
                body: requestBody,
            }),
        }),
        updateRole: builder.mutation({
            query: (requestBody) => ({
                url: '/role/updateRole',
                method: 'POST',
                body: requestBody,
            }),
        }),
        deleteRole: builder.mutation({
            query: (requestBody) => ({
                url: '/role/deleteRole',
                method: 'POST',
                body: requestBody,
            }),
        }),
        uploadFile: builder.mutation({
            query: (requestBody) => ({
                url: '/data/uploadFile',
                method: 'POST',
                body: requestBody,
            }),
        }),
        checkUploadProcess: builder.mutation({
            query: (requestBody) => ({
                url: '/data/checkUpload',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getFiles: builder.mutation({
            query: (requestBody) => ({
                url: '/data/getFileList',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getDataMerchant: builder.mutation({
            query: (requestBody) => ({
                url: '/data/searchData',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getDataReport: builder.mutation({
            query: (requestBody) => ({
                url: '/data/getReportList',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getSystemParameter: builder.mutation({
            query: (requestBody) => ({
                url: '/system/getSystemParameter',
                method: 'POST',
                body: requestBody,
            }),
        }),
        updateSystemParameter: builder.mutation({
            query: (requestBody) => ({
                url: '/system/updateSystemParameter',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getDownloadReport: builder.mutation({
            query: () => ({
                url: '/data/checkDownloadReport',
            }),
        }),
        getPrivilege: builder.mutation({
            query: (requestBody) => ({
                url: '/role/getAllPrivilege',
                method: 'POST',
                body: requestBody,
            }),
        }),
        updatePrivilege: builder.mutation({
            query: (requestBody) => ({
                url: '/role/updatePrivilege',
                method: 'POST',
                body: requestBody,
            }),
        }),
        getNotification: builder.mutation({
            query: () => ({
                url: 'data/getNotification',
            }),
        }),
    }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
    useLoginMutation,
    useUpdatePasswordMutation,
    useAddUserMutation,
    useUpdateUserMutation,
    useGetUserMutation,
    useDeleteUserMutation,
    useGetRoleMutation,
    useAddRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useUploadFileMutation,
    useCheckUploadProcessMutation,
    useGetFilesMutation,
    useGetDataMerchantMutation,
    useGetDataReportMutation,
    useGetSystemParameterMutation,
    useUpdateSystemParameterMutation,
    useGetDownloadReportMutation,
    useGetPrivilegeMutation,
    useUpdatePrivilegeMutation,
    useGetNotificationMutation,
} = apiSlice
