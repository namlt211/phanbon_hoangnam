import axios from "axios";
import {
  ADD_CUSTOMER_URL,
  DELETE_CUSTOMER_BY_ID_URL,
  GET_ALL_CUSTOMER_URL,
  GET_CUSTOMER_BY_ID_URL,
  UPDATE_CUSTOMER_URL,
} from "../../config";

//Tạo khách hàng mới

export const addCustomers = async (customer) => {
  let data;
  let url = ADD_CUSTOMER_URL;
  await axios
    .post(url, customer)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//Lấy danh sách khách hàng
export const getAllCustomer = async () => {
  let data;
  let url = GET_ALL_CUSTOMER_URL;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });

  return data;
};

//Lấy khách hàng theo mã khách hàng

export const getCustomerByID = async (id) => {
  let data;
  let url = GET_CUSTOMER_BY_ID_URL.replace("{id}", id);
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//Cập nhật thông tin khách hàng qua mã khách hàng

export const updateCustomerByID = async (id, customer) => {
  let data;
  let url = UPDATE_CUSTOMER_URL.replace("{id}", id);
  await axios
    .put(url, customer)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//Xóa khách hàng qua mã khách hàng

export const deleteCustomer = async (id) => {
  let data;
  let url = DELETE_CUSTOMER_BY_ID_URL.replace("{id}", id);
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};
