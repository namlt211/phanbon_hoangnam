import axios from "axios";
import {
  ADD_PRODUCT_URL,
  ADD_SUPPLIER_URL,
  DELETE_PRODUCT_BY_ID,
  DELETE_SUPPLIER_URL,
  GET_ALL_SUPPLIER_URL,
  GET_APP_PRODUCT_URL,
  GET_PRODUCT_BY_ID,
  GET_SUPPLIER_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  UPDATE_SUPPLIER_URL,
} from "../../config";

//Thêm sản phẩm
export const addProductAPI = async (product) => {
  let data;
  await axios
    .post(ADD_PRODUCT_URL, product)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      data = err.message;
    });
  return data;
};

//Thêm nhà cung cấp

export const addSupplierAPI = async (supplier) => {
  let data;
  await axios
    .post(ADD_SUPPLIER_URL, supplier)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//Lấy danh sách nhà cung cấp

export const getAllSupplier = async () => {
  let data;
  await axios
    .get(GET_ALL_SUPPLIER_URL)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });

  return data;
};

//Lấy tất cả sản phẩm

export const getAllProduct = async () => {
  let data;
  await axios
    .get(GET_APP_PRODUCT_URL)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//Cập nhật thông tin nhà cung cấp

export const updateSupplierAPI = async (id, supplier) => {
  let data;
  let url = UPDATE_SUPPLIER_URL.replace("{id}", id);
  await axios
    .put(url, supplier)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//Lấy thông tin nhà cung cấp qua id

export const getSupplierById = async (id) => {
  let data;
  let url = GET_SUPPLIER_BY_ID.replace("{id}", id);
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

//Xóa nhà cung cấp qua id

export const deleteSupplierById = async (id) => {
  let data;
  let url = DELETE_SUPPLIER_URL.replace("{id}", id);
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

//Lấy sản phẩm bằng id

export const getPRoductById = async (id) => {
  let data;
  let url = GET_PRODUCT_BY_ID.replace("{id}", id);
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

//Cập nhật sản phẩm bằng id

export const updateProductByID = async (id, product) => {
  let data;

  let url = UPDATE_PRODUCT_BY_ID.replace("{id}", id);
  await axios
    .put(url, product)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data = error.message;
    });
  return data;
};

//Xóa sản phẩm bằng id

export const deleteProductByID = async (id) => {
  let data;

  let url = DELETE_PRODUCT_BY_ID.replace("{id}", id);
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      data.error.message;
    });

  return data;
};
