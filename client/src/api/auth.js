import axios from "axios";

const BASE_URL = "http://localhost:5000"; // your backend URL

export const sendOtp = (data) =>
  axios.post(`${BASE_URL}/api/auth/send-otp`, data);
export const verifyOtp = (data) =>
  axios.post(`${BASE_URL}/api/auth/verify-otp`, data);
export const loginUser = (data) =>
  axios.post(`${BASE_URL}/api/auth/login`, data);
