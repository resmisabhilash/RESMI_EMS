// import axios from "axios";

// const url=import.meta.env.VITE_API_URL
// console.log(url,"baseURL");
//  const axiosInstance=axios.create({
//     baseURL:url,
//     withCredentials:true
//  })




 
//  export {axiosInstance}

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure it loads from .env

console.log(API_BASE_URL, "Base API URL"); // Debugging

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, 
  withCredentials: true, 
});

export { axiosInstance };
