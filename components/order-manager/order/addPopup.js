import { parse } from "postcss";
import React, { useState } from "react";
import Popup from "../../../until/Popup";

const AddPopup = (props) => {
  const { open, handleClose, productList, customerList } = props;
  //product info loading
  const [productInfo, setProductInfo] = useState({});

  //customer array loading
  const [customerArray, setCustomerArray] = useState([]);

  const handleAddClick = () => {
    console.log("dang test: ", customerList);
  };
  const handleProductOnChange = (e) => {
    let prod = productList.filter((p) => p.id === parseInt(e.target.value));
    setProductInfo(prod[0]);
  };
  const handleNameCustomerChange = (e) => {
    let cusArr = [];
    if (e !== "") {
      cusArr = customerList.filter((c) =>
        c.name.toLowerCase().trim().includes(e.toLowerCase().trim())
      );
    } else {
      cusArr = [];
    }
    setCustomerArray(cusArr);
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      size="M"
      title="Thêm đơn hàng"
      handleConfirm={handleAddClick}
      titleBtn="Thêm đơn hàng"
    >
      <div className="flex justify-around items-start p-10">
        <div className="flex flex-col items-start text-xl w-1/2 p-2">
          <h2 className="text-2xl">Thông tin đơn hàng:</h2>
          <div className="py-2">Tên sản phẩm:</div>
          <select
            onChange={(e) => handleProductOnChange(e)}
            className="border h-[24px] mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
          >
            <option value="">Chọn sản phẩm</option>
            {productList?.map((sup, index) => (
              <option key={index} value={sup.id}>
                {sup.product_name}
              </option>
            ))}
          </select>
          <div className="py-2">Đơn giá:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Đơn giá"
            disabled
            value={productInfo?.unit || 0}
          />
          <div className="py-2">Số lượng:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="number"
            placeholder="Số lượng"
          />
          <div className="py-2">Đơn vị tính:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Đơn vị tính"
            disabled
            value={productInfo?.product_price || 0}
          />
        </div>
        <div className="flex flex-col items-start text-xl w-1/2 p-2">
          <h2 className="text-2xl">Thông tin khách hàng:</h2>
          <div className="py-2">Tên khách hàng:</div>
          <input
            onChange={(e) => handleNameCustomerChange(e.target.value)}
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Tên khách hàng"
          />
          <div
            className={`w-full relative ${
              customerArray.length > 0 ? "block" : "hidden"
            }`}
          >
            <ul className={`absolute w-full bg-white text-black p-2 `}>
              {customerArray?.map((v, i) => (
                <li
                  className="py-2 hover:bg-dark-orange hover:text-white cursor-pointer p-3"
                  key={v.id}
                >
                  {v.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="py-2">Số điện thoại:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Số điện thoại"
          />
          <div className="py-2">Địa chỉ:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Địa chỉ"
          />
        </div>
      </div>
    </Popup>
  );
};

export default AddPopup;
