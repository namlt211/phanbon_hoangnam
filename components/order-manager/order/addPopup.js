import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { formatMoneyVN } from "../../../helpers/getNow";
import { addCustomers } from "../../../services/customer";
import {
  addPayment,
  createOrder,
  createOrderDetail,
} from "../../../services/order";
import Popup from "../../../until/Popup";

const AddPopup = (props) => {
  const { open, handleClose, productList, customerList, handleReload } = props;
  //product info loading
  const [productInfo, setProductInfo] = useState({});

  const [productListOrder, setProductListOrder] = useState([]);

  //order details info

  const [productOrder, setProductOrder] = useState({
    quantity: 0,
    price: 0,
    total: 0,
    payment: 0,
    exMoney: 0,
  });
  //select customer name start -------------
  //customer name
  const [customerObj, setCustomerObj] = useState({
    id: 0,
    name: "",
    phone: "",
    address: "",
  });
  //
  const [totalAmount, setTotalAmount] = useState(0);
  const [money, setMoney] = useState(0);
  //set show or hidden list customer api
  const [isShowCustomerList, setIsShowCustomerList] = useState(false); // hidden
  //list customer filter

  const customerListFilter = useMemo(() => {
    return customerList.filter((c) =>
      c.phone.trim().toLowerCase().includes(customerObj.phone.toLowerCase())
    );
  }, [customerList, customerObj.phone]);
  //select customer name end -------------
  //handle add product to order
  const handleAddProduct = () => {
    if (productInfo === undefined || Object.keys(productInfo).length === 0) {
      toast.error("Bạn chưa chọn sản phẩm !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let product = {
      id: productInfo.id,
      name: productInfo.name,
      supplier: productInfo.supplier,
      unit: productInfo.unit,
      price: productInfo.price,
      discount: productInfo.discount,
      quantity: productOrder.quantity,
      totalAmount: 0,
    };
    if (product.quantity === 0) {
      toast.error("Bạn chưa nhập số lượng !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (productListOrder.filter((p) => p.id === product.id).length > 0) {
      setProductListOrder((prevState) =>
        prevState.map((pro) => {
          if (pro.id === product.id) {
            return {
              ...pro,
              quantity: pro.quantity + product.quantity,
              totalAmount:
                (pro.quantity + product.quantity) *
                pro.price *
                (1 - pro.discount),
            };
          } else {
            return {
              ...pro,
              totalAmount: pro.quantity * pro.price * (1 - pro.discount),
            };
          }
        })
      );
      return;
    }
    setProductListOrder((prevState) => [
      ...prevState,
      {
        ...product,
        totalAmount: product.quantity * product.price * (1 - product.discount),
      },
    ]);
  };
  useEffect(() => {
    let totalA = 0;
    productListOrder.map((p) => {
      return (totalA = totalA + p.totalAmount);
    });
    setTotalAmount(totalA);
  }, [productListOrder]);
  const handleAddClick = async () => {
    //create a new order api
    if (customerObj.id === 0) {
      let createCustomer = await addCustomers(customerObj);
      if (!createCustomer.status) {
        toast.error(createCustomer.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      setCustomerObj({ ...customerObj, id: createCustomer.data.id });
    }
    let paramOrder = {
      customer_id: customerObj.id,
      total_amount: parseFloat(totalAmount),
    };
    let orderAPI = await createOrder(paramOrder);
    if (orderAPI.status) {
      //create a new order details api
      console.log("test: ", orderAPI.data.id);
      const orderDetailPromises = productListOrder.map((p) => {
        let orderDetail = {
          order_id: orderAPI.data.id,
          product_id: p.id,
          quantity: p.quantity,
        };
        return createOrderDetail(orderDetail);
      });
      await Promise.all(orderDetailPromises);
      //create payment
      const pay = {
        order_id: orderAPI.data.id,
        money: money,
      };
      let payAPI = await addPayment(pay);
      if (payAPI.status) {
        toast.success("Thêm đơn hàng thành công !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        handleReload();
        handleClose();
      }
    }
  };

  const handleProductOnChange = (e) => {
    let prod = productList.filter((p) => p.id === parseInt(e.target.value));
    setProductInfo(prod[0]);
  };
  const handlePhoneChange = (e) => {
    setCustomerObj({ ...customerObj, id: 0, phone: e });
    setIsShowCustomerList(true);
  };
  const handleChosePhoneClick = (v) => {
    setCustomerObj({
      ...customerObj,
      id: v.id,
      name: v.name,
      phone: v.phone,
      address: v.address,
    });
    setIsShowCustomerList(false);
  };
  const handleDeleteProductOnProductList = (id) => {
    setProductListOrder((prevState) => prevState.filter((p) => p.id !== id));
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      size="XL"
      title="Thêm đơn hàng"
      handleConfirm={handleAddClick}
      titleBtn="Thêm đơn hàng"
    >
      <div className="flex justify-around items-start p-10">
        <div className="text-xl w-3/4 p-2">
          <h2 className="text-2xl text-slate-800 font-bold">
            Thông tin đơn hàng:
          </h2>
          <div className="flex gap-5 items-center">
            <div className="flex flex-col">
              <div className="py-2 text-slate-600 font-bold">Tên sản phẩm:</div>
              <select
                onChange={(e) => handleProductOnChange(e)}
                className="border h-[24px] mt-1 w-[150px] border-solid border-[#ccc] outline-none p-1 capitalize"
              >
                <option value="">Chọn sản phẩm</option>
                {productList?.map((sup, index) => (
                  <option key={index} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <div className="py-2 text-slate-600 font-bold">Đơn giá:</div>
              <input
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
                type="text"
                placeholder="Đơn giá"
                disabled
                value={
                  productInfo?.price ? formatMoneyVN(productInfo?.price) : 0
                }
              />
            </div>
            <div className="flex flex-col">
              <div className="py-2 text-slate-600 font-bold">Đơn vị tính:</div>
              <input
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
                type="text"
                placeholder="Đơn vị tính"
                disabled
                value={
                  productInfo?.unit
                    ? productInfo?.unit + " kg/bao"
                    : 0 + " kg/bao"
                }
              />
            </div>
            <div className="flex flex-col">
              <div className="py-2 text-slate-600 font-bold">Số lượng:</div>
              <input
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
                type="number"
                placeholder="Số lượng"
                onChange={(e) =>
                  setProductOrder({
                    ...productOrder,
                    quantity: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <div className="py-2 text-transparent">.</div>
              <button
                onClick={handleAddProduct}
                className="bg-dark-orange text-white ml-2 py-2 px-3 border border-solid border-bg-dark-orange text-xl hover:border-[#ccc] hover:bg-orange-500"
              >
                Thêm
              </button>
            </div>
          </div>
          <div className="border mt-5 border-solid border-[#ccc] p-4 outline-none w-full ">
            {productListOrder?.length > 0 ? (
              productListOrder?.map((product, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center text-slate-500 py-3">
                    <div className="flex flex-col">
                      <label className=" font-bold">Tên sản phẩm:</label>
                      <div className="uppercase">{product.name}</div>
                    </div>
                    <div className="flex flex-col">
                      <label className=" font-bold">Giá:</label>
                      <div>{product.price}</div>
                    </div>
                    <div className="flex flex-col">
                      <label className=" font-bold">Khuyến mãi:</label>
                      <div>{product.discount * 100}</div>
                    </div>
                    <div className="flex flex-col">
                      <label className=" font-bold">Số lượng:</label>
                      <div>{product.quantity}</div>
                    </div>
                    <div className="flex flex-col">
                      <label className=" font-bold">Tổng tiền:</label>
                      <div>{product.totalAmount}</div>
                    </div>
                    <div
                      onClick={() =>
                        handleDeleteProductOnProductList(product.id)
                      }
                      className="flex flex-col cursor-pointer font-bold"
                      title="Xóa"
                    >
                      X
                    </div>
                  </div>
                  <div
                    className={`${
                      index + 1 == productListOrder?.length
                        ? ""
                        : "border border-solid border-[#ccc]"
                    }`}
                  ></div>
                </div>
              ))
            ) : (
              <div className="text-red-600">Chưa có sản phẩm !</div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start text-xl w-1/3 p-2">
          <h2 className="text-2xl text-slate-800 font-bold">
            Thông tin khách hàng:
          </h2>
          <div className="py-2 text-slate-600 font-bold">Số điện thoại:</div>
          <input
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Số điện thoại"
            value={customerObj.phone}
          />
          <div
            className={`w-full relative ${
              isShowCustomerList ? "block" : "hidden"
            }`}
          >
            <ul className={`absolute w-full bg-white text-black p-1 `}>
              {isShowCustomerList &&
                customerListFilter?.map((v) => (
                  <li
                    className="py-2 hover:bg-dark-orange hover:text-white cursor-pointer p-2"
                    key={v.id}
                    onClick={() => handleChosePhoneClick(v)}
                  >
                    {v.phone}
                  </li>
                ))}
            </ul>
          </div>
          <div className="py-2 text-slate-600 font-bold">Tên:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Tên khách hàng"
            value={customerObj?.name}
            onChange={(e) =>
              setCustomerObj({ ...customerObj, name: e.target.value })
            }
          />
          <div className="py-2 text-slate-600 font-bold">Địa chỉ:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            placeholder="Địa chỉ"
            value={customerObj?.address}
            onChange={(e) =>
              setCustomerObj({ ...customerObj, address: e.target.value })
            }
          />
          <div
            className={`${isShowCustomerList ? "block" : "hidden"} py-4 w-full`}
          >
            <p>Khách hàng mới</p>
          </div>
        </div>
        <div className="flex flex-col items-start text-xl w-1/3 p-2">
          <h2 className="text-2xl text-slate-800 font-bold">Thanh toán:</h2>
          <div className="py-2 text-slate-600 font-bold">Thành tiền:</div>
          <div className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full ">
            {totalAmount || 0}
          </div>
          <div className="py-2 text-slate-600 font-bold">Thanh toán:</div>
          <input
            className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
            type="text"
            value={money || 0}
            onChange={(e) => setMoney(parseFloat(e.target.value))}
          />

          <div className="py-2 text-slate-600 font-bold">Còn lại:</div>
          <div
            className={`border mt-1 border-solid  border-[#ccc] p-1 outline-none w-full`}
          >
            {money - totalAmount || 0}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AddPopup;
