import axios from "axios";
import {
  ADD_ORDER_DETAILS_URL,
  ADD_ORDER_URL,
  ADD_PAYMENT_URL,
  GET_ALL_ORDER_DETAILS_URL,
  GET_ALL_ORDER_URL,
} from "../../config";

export const getAllOrderDetails = async () => {
  let data;
  let url = GET_ALL_ORDER_DETAILS_URL;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      data = err.message;
    });

  return data;
};
//tạo đơn hàng mới

export const createOrder = async (paramOrder) => {
  let data;
  let url = ADD_ORDER_URL;
  await axios
    .post(url, paramOrder)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//tạo chi tiết đơn hàng mới
export const createOrderDetail = async (paramOrderDetail) => {
  let data;
  let url = ADD_ORDER_DETAILS_URL;
  await axios
    .post(url, paramOrderDetail)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//lấy tất cả đơn hàng

export const getAllOrder = async () => {
  let data;
  let url = GET_ALL_ORDER_URL;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error;
    });
  return data;
};

//add payment

export const addPayment = async (pay) => {
  const url = ADD_PAYMENT_URL;
  try {
    const response = await axios.post(url, pay);
    return response.data;
  } catch (error) {
    return error;
  }
};
