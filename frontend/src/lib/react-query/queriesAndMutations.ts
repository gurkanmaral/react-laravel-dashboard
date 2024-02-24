import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./QueryKeys"
import { addStock, deleteUser, getAllUsers, getAllUsersInUserPage, getCancellationData, getCountryData, getCountryDetails, getCurrentUser, getDeliveryTime, getInventoryLevels, getOrderDetails, getProductDetails, getRevenue, getReviewDetails, getReviews, getTotalComments, getTotalFollow, getTotalLikes, getTotalOrders, mostBoughtProducts, signOutUser } from "../api"


export const useGetCurrentUser = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useSignOutUser = () => {

    return useMutation({
        mutationFn: signOutUser
    })
}



export const useGetAllUser = (fromDate,toDate) => {
    
    return useQuery({
        queryKey:[QUERY_KEYS.GET_ALL_USERS,fromDate,toDate],
        queryFn: () => getAllUsers(fromDate,toDate),

    })
}

export const useGetInventoryLevels = (filters) => {

    const serializedFilters = JSON.stringify(filters);

    return useQuery({
       queryKey: [QUERY_KEYS.GET_INVENTORY_LEVELS, serializedFilters],
        queryFn: ()=> getInventoryLevels(filters),
        enabled: !!filters,
    })
}

export const useGetTotalOrders = (fromDate,toDate) =>

{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TOTAL_ORDERS,fromDate,toDate ],
         queryFn: ()=> getTotalOrders(fromDate,toDate),
     
     })
}

export const useGetMostBoughtProducts = (fromDate,toDate) => {

    return useQuery({
        queryKey: [QUERY_KEYS.GET_MOST_BOUGHT_PRODUCTS,fromDate,toDate],
        queryFn: () => mostBoughtProducts(fromDate,toDate)
    })
}

export const useGetCountryData = () => {
    
    return useQuery({
        queryKey:[QUERY_KEYS.GET_COUNTRY_DATA],
        queryFn: getCountryData
    })
}
export const useGetDeliveryTime = () => {
    
    return useQuery({
        queryKey:[QUERY_KEYS.GET_DELIVERY_TIME],
        queryFn: getDeliveryTime
    })
}

export const useGetCancellationData = () => {

    return useQuery({
        queryKey: [QUERY_KEYS.GET_CANCELLATION_DATA],
        queryFn:getCancellationData
    })
}

export const useGetRevenue = (fromDate,toDate) => {

    return useQuery({
        queryKey:[QUERY_KEYS.GET_REVENUE_DATA,fromDate,toDate],
        queryFn:() => getRevenue(fromDate,toDate)
    })
}

export const useGetTotalFollow = (fromDate,toDate) => {

    return useQuery({
        queryKey:[QUERY_KEYS.GET_TOTAL_FOLLOWS,fromDate,toDate],
        queryFn:() => getTotalFollow(fromDate,toDate)
    })
}
export const useGetReviews = () => {

    return useQuery({
        queryKey:[QUERY_KEYS.GET_REVIEWS],
        queryFn:getReviews
    })
}

export const useGetTotalLikes = (fromDate,toDate) => {

    return useQuery({
        queryKey:[QUERY_KEYS.GET_TOTAL_LIKES,fromDate,toDate],
        queryFn: () => getTotalLikes(fromDate,toDate)
    })
}

export const useGetTotalComments = (fromDate,toDate) => {

    return useQuery({
        queryKey:[QUERY_KEYS.GET_TOTAL_COMMENTS,fromDate,toDate],
        queryFn: () => getTotalComments(fromDate,toDate),
    })
}


// PAGES

export const useGetAllUsersInPage = (page,searchTerm) => {

    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_USERS_IN_USER_PAGE,page,searchTerm],
        queryFn: () => getAllUsersInUserPage(page, searchTerm),
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess:()=> {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_ALL_USERS_IN_USER_PAGE]
            })
        }
    })


}
export const useGetOrderDetails = (filters,page) => {
    
    return useQuery({
        queryKey:[QUERY_KEYS.GET_ORDER_DETAILS,page,filters],
        queryFn: () =>  getOrderDetails(page,filters)
    })
}
export const useGetProductDetails = (filters,page) => {
    
    return useQuery({
        queryKey:[QUERY_KEYS.GET_PRODUCT_DETAILS,filters,page],
        queryFn: ()=> getProductDetails(filters,page)
    })
}

export const useGetCountryDetails = () => {

    return useQuery({
        queryKey:[QUERY_KEYS.GET_COUNTRY_DETAILS],
        queryFn: getCountryDetails
    })
}

export const useGetReviewDetails = (page) => {

    return useQuery({
        queryKey:[QUERY_KEYS.GET_REVIEW_DETAILS,page],
        queryFn: () => getReviewDetails(page)
    })
}


export const useAddStock = () => {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: addStock,
      onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey:[QUERY_KEYS.GET_INVENTORY_LEVELS]
        })
      }

    })

}