const SERVER_API_LOCALHOST = "http://localhost:8080/";

const LOGIN_URL = SERVER_API_LOCALHOST + "login";
const ADD_PRODUCT_URL = SERVER_API_LOCALHOST + "product/add";
const ADD_SUPPLIER_URL = SERVER_API_LOCALHOST + "supplier/add";
const GET_ALL_SUPPLIER_URL = SERVER_API_LOCALHOST + "supplier/getall";
const GET_APP_PRODUCT_URL = SERVER_API_LOCALHOST + "product/getall";
const UPDATE_SUPPLIER_URL = SERVER_API_LOCALHOST + "supplier/update/{id}";
const GET_SUPPLIER_BY_ID =
  SERVER_API_LOCALHOST + "supplier/getsupplierbyid/{id}";
const DELETE_SUPPLIER_URL = SERVER_API_LOCALHOST + "supplier/delete/{id}";
const GET_PRODUCT_BY_ID = SERVER_API_LOCALHOST + "product/getproductbyid/{id}";
const UPDATE_PRODUCT_BY_ID = SERVER_API_LOCALHOST + "product/update/{id}";
const DELETE_PRODUCT_BY_ID = SERVER_API_LOCALHOST + "product/delete/{id}";
const ADD_CUSTOMER_URL = SERVER_API_LOCALHOST + "customer/add";
const GET_ALL_CUSTOMER_URL = SERVER_API_LOCALHOST + "customer/getall";
const UPDATE_CUSTOMER_URL = SERVER_API_LOCALHOST + "customer/update/{id}";
const GET_CUSTOMER_BY_ID_URL = SERVER_API_LOCALHOST + "customer/getbyid/{id}";
const DELETE_CUSTOMER_BY_ID_URL = SERVER_API_LOCALHOST + "customer/delete/{id}";
const GET_ALL_ORDER_DETAILS_URL = SERVER_API_LOCALHOST + "order-details/getall";

export {
  LOGIN_URL,
  ADD_PRODUCT_URL,
  ADD_SUPPLIER_URL,
  GET_ALL_SUPPLIER_URL,
  GET_APP_PRODUCT_URL,
  UPDATE_SUPPLIER_URL,
  GET_SUPPLIER_BY_ID,
  DELETE_SUPPLIER_URL,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID,
  ADD_CUSTOMER_URL,
  GET_ALL_CUSTOMER_URL,
  UPDATE_CUSTOMER_URL,
  GET_CUSTOMER_BY_ID_URL,
  DELETE_CUSTOMER_BY_ID_URL,
  GET_ALL_ORDER_DETAILS_URL,
};
