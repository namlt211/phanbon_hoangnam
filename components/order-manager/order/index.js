import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../../../services/customer";
import { getAllOrderDetails } from "../../../services/order";
import { getAllProduct } from "../../../services/product";
import AddPopup from "./addPopup";

const Index = () => {
  const threads = [
    { key: "couponId", name: "Mã đơn hàng" },
    { key: "manuId", name: "Tên khách hàng" },
    { key: "orderDate", name: "Ngày lập" },
    { key: "product", name: "Sản phẩm" },
    { key: "unit", name: "Đơn vị tính" },
    { key: "price", name: "Đơn giá" },
    { key: "quantity", name: "Số lượng" },
    { key: "money", name: "Thành tiền" },
    { key: "status", name: "Trạng thái" },
    { key: "active", name: "Tùy chỉnh" },
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
  const getAllOrderDetailList = async () => {
    let data = await getAllOrderDetails();
    if (data.status) {
      setOrderDetails(data.data);
    }
  };
  useEffect(() => {
    getAllOrderDetailList();
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
          <thead className="bg-[#f3f4f6] text-xs">
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
          <tbody className="text-xs">
            {orderDetails.length > 0 ? (
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
                      {tr.name}
                    </div>
                  </td>
                  <td className="pl-8">{tr?.phone}</td>
                  <td className="pl-8">{tr?.address}</td>
                  <td className="pl-8">{tr?.status}</td>
                  <td className="pl-8 flex justify-between w-1/2 text-xl text-dark-orange">
                    <div onClick={() => handleUpdateCustomerClick(tr.id)}>
                      <i className="fa-solid fa-pen cursor-pointer"></i>
                    </div>
                    <div
                      className="ml-2"
                      onClick={() => handleDeleteProductClick(tr.id)}
                    >
                      <i className="fa-solid fa-trash cursor-pointer"></i>
                    </div>
                  </td>
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
    </div>
  );
};

export default Index;
