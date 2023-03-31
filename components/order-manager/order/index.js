import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { formatDate, formatMoney } from "../../../helpers/getNow";
import { getAllCustomer } from "../../../services/customer";
import { getAllOrder, getAllOrderDetails } from "../../../services/order";
import { getAllProduct } from "../../../services/product";
import AddPopup from "./addPopup";

const Index = () => {
  const threads = [
    { key: "couponId", name: "Mã chi tiết" },
    { key: "manuId", name: "Tên khách hàng" },
    { key: "orderDate", name: "Ngày lập" },
    { key: "total", name: "Tổng" },
    { key: "paid", name: "Đã thanh toán" },
    { key: "owed", name: "Còn lại" },
  ];

  //reload page
  const [reload, setReload] = useState(false);
  const handleReload = () => setReload(!reload);

  //modal add
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleOpenModalAdd = () => setOpenModalAdd(true);
  const handleCloseModalAdd = () => setOpenModalAdd(false);

  //List order details
  const [orderDetails, setOrderDetails] = useState([]);

  //product list
  const [productList, setProductList] = useState([]);

  //customer list
  const [customerList, setCustomerList] = useState([]);
  //events page load start
  // load order details list
  const getAllOrderList = async () => {
    let data = await getAllOrder();
    if (data.status) {
      setOrderDetails(data.data);
    }
  };
  useEffect(() => {
    getAllOrderList();
  }, [reload]);
  //events page load end

  //load product list
  const getProductList = async () => {
    let data = await getAllProduct();
    if (data.status) {
      setProductList(data.data);
    }
  };

  //load customer list
  const getCustomerList = async () => {
    let data = await getAllCustomer();
    if (data.status) {
      setCustomerList(data.data);
    }
  };

  const handleBtnAdd = async () => {
    getProductList();
    getCustomerList();
    handleOpenModalAdd();
  };
  const handleShowOwed = (t, p) => {
    const owedAmount = Math.floor((p * 100) / t);
    const totalMoney = 100 - owedAmount;
    const isFullyPaid = t === p;
    const isUnpaid = p === 0;
    return (
      <td className="pl-8 flex">
        {isFullyPaid && (
          <div className=" bg-lime-500 p-2 w-[100%]">
            Đã thanh toán {owedAmount} %
          </div>
        )}
        {isUnpaid && (
          <div className="bg-red-400 p-2 w-[100%]">Còn nợ {totalMoney} %</div>
        )}
        {!isFullyPaid && !isUnpaid && (
          <>
            <div className={`bg-yellow-300 p-2 w-[${owedAmount}%]`}>
              {owedAmount} %
            </div>
          </>
        )}
      </td>
    );
  };

  return (
    <div>
      {/* Header  */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="p-2 text-[#424856] text-xl border-solid border border-[#424856]">
            <i className="fas fa-search pl-2"></i>
            <input
              className="pl-3 focus:outline-none bg-transparent"
              placeholder="Tìm kiếm ..."
            />
          </div>
          <div className="ml-4 text-xl p-2 px-16 bg-[#f3f4f6] flex items-center justify-center cursor-pointer">
            <button className="mr-4 rounded border border-solid  border-[#f3f4f6]">
              Lọc
            </button>
            <i className="fas fa-filter"></i>
          </div>
        </div>
        <div className="flex">
          <div className="ml-4 px-16 bg-[#f3f4f6] text-xl flex items-center justify-center">
            <button className="mr-4 rounded border border-solid border-[#f3f4f6]">
              Thao tác
            </button>
            <i className="fas fa-angle-down"></i>
          </div>
          <div
            onClick={handleBtnAdd}
            className="ml-4 p-2 px-16 bg-dark-orange text-xl text-white flex items-center justify-center cursor-pointer"
          >
            <i className="far fa-plus  font-bold"></i>
            <button className="ml-4 rounded border border-solid border-dark-orange">
              Thêm mới
            </button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="py-10">
        <table className="w-full">
          <thead className="bg-[#f3f4f6] text-xl">
            <tr
              style={{
                borderTop: "1px solid #dee1e6",
                borderLeft: "1px solid #dee1e6",
                borderRight: "1px solid #dee1e6",
              }}
            >
              {threads.map((th) => (
                <th
                  className=" pl-4 py-4 items-center uppercase text-left text-[#9a9ea9]"
                  key={th.key}
                >
                  <div className="flex items-center">
                    {th.key === "couponId" ? (
                      <input type="checkbox" className="accent-[#d46312]" />
                    ) : (
                      ""
                    )}
                    <div className="pl-4">{th.name}</div>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {orderDetails?.length > 0 ? (
              orderDetails?.map((tr) => (
                <tr
                  key={tr.id}
                  style={{
                    borderBottom: "1px solid #dee1e6",
                    borderLeft: "1px solid #dee1e6",
                    borderRight: "1px solid #dee1e6",
                  }}
                >
                  <td className="uppercase flex items-center py-8">
                    <div className="flex items-center pl-4">
                      <input type="checkbox" className="accent-[#d46312]" />
                      <div className="pl-4">{tr.id}</div>
                    </div>
                  </td>
                  <td className="uppercase pl-8 ">
                    <div className="w-[150px] truncate text-ellipsis overflow-hidden">
                      {tr.customer_name}
                    </div>
                  </td>
                  <td className="pl-8">{formatDate(tr?.created_at)}</td>
                  <td className="pl-8">{formatMoney(tr?.total_amount)}</td>
                  <td className="pl-8">{formatMoney(tr?.paid)}</td>
                  {handleShowOwed(tr?.total_amount, tr?.paid)}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={threads.length}>
                  <div className="flex justify-center text-5xl items-center text-[#ccc] pt-20">
                    Không có dữ liệu
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddPopup
        open={openModalAdd}
        handleClose={handleCloseModalAdd}
        productList={productList}
        customerList={customerList}
        handleReload={handleReload}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="text-xl font-roboto"
      />
    </div>
  );
};

export default Index;
