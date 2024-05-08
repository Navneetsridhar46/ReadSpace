import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./server_Url";

export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/api/user/register`, reqBody)
}

export const getLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/api/user/login`, reqBody)
}

// add book api 

export const addBookAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/api/product/`, reqBody, reqHeader)
}

// delete single book 

export const removeBookAPI = async (BookId, reqHeader) => {
    console.log(BookId);
    return await commonAPI("DELETE",`${SERVER_URL}/api/product/${BookId}`,{}, reqHeader)
}

// edit books api 

export const editBooksAPI = async (BookId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/api/product/${BookId}`, reqBody, reqHeader)
}

// get book api 

export const getBookAPI = async (BookId) => {
    return await commonAPI("GET", `${SERVER_URL}/api/product/${BookId}`)
}

// addItems to cart API 
export const addToCart = async (data, headers) => {
    return await commonAPI("POST", `${SERVER_URL}/api/user/cart`, data, headers)
}

// getUser cart API 

export const getUserCartAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/api/user/cart`,{}, reqHeader)
}

// delete cart item api 

export const deleteCartItemAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/api/user/delete-product-cart/${id}`,{}, reqHeader)
}

// update cart item api 

export const updateCartItemAPI = async (id,quantity,reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/api/user/update-product-cart/${id}/${quantity}`,{}, reqHeader)
}