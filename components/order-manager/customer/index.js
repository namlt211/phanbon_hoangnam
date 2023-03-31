import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getNow } from "../../../helpers/getNow";
import { getAllCustomer, getCustomerByID } from "../../../services/customer";
import AddPopup from "./addPopup";
import DeletePopup from "./deletePopup";
import UpdatePopup from "./updatePopup";

const Index = () => {
  const threads = [
    { key: "couponId", name: "Mã khách hàng" },
    { key: "manuId", name: "Tên khách hàng" },
    { key: "phone", name: "Số điện thoại" },
    { key: "address", name: "Địa chỉ" },
    { key: "action", name: "Tùy chỉnh" },
  ];
  //customer list start
  const [customerList, setCustomerList] = useState([]);
  //customer list end

  //customer object start
  const [customerObj, setCustomerObj] = useState({
    name: "",
    phone: "",
    address: "",
    updated_at: getNow(),
  });
  //customer object end

  //customer id start
  const [customerId, setCustomerId] = useState(0);
  //customer id end

  //Reload Page Start
  const [reLoad, setReload] = useState(false);
  const handleReloadPage = () => setReload(!reLoad);
  //Reload Page End

  // Modal Add customer Start
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleOpenModalAdd = () => setOpenModalAdd(!openModalAdd);
  const handleCloseModalAdd = () => setOpenModalAdd(false);
  // Modal Add customer End

  //modal update customer start
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const handleOpenModalUpdate = () => setOpenModalUpdate(true);
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);
  //modal update customer end

  //modal delete customer start
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);
  //modal delete customer end

  //List customer
  const [listCustomer, setListCustomer] = useState([]);
  const handleBtnAdd = async () => {
    let listCustomer = await getAllCustomer();
    if (listCustomer.status) {
      setListCustomer(listCustomer.data);
    }
    handleOpenModalAdd();
  };

  //handle events update customer click
  const handleUpdateCustomerClick = async (id) => {
    let data = await getCustomerByID(id);
    if (data.status) {
      setCustomerObj(data.data);
    }
    handleOpenModalUpdate();
  };
  //handle events delete customer
  const handleDeleteProductClick = async (id) => {
    setCustomerId(id);
    handleOpenModalDelete();
  };
  //event page load

  useEffect(() => {
    const getListCustomer = async () => {
      let data = await getAllCustomer();
      if (data.status) {
        setListCustomer(data.data);
      }
    };
    getListCustomer();
  }, [reLoad]);
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
      <div className="py-10 text-xl">
        <table className="w-full">
          <thead className="bg-[#f3f4f6]">
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
          <tbody className="text-2xl">
            {listCustomer?.length > 0 ? (
              listCustomer?.map((tr) => (
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
                  <td className="pl-8 flex justify-between w-1/3 text-xl text-dark-orange">
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
        handleOpen={handleOpenModalAdd}
        handleClose={handleCloseModalAdd}
        handleReloadPage={handleReloadPage}
      />
      <UpdatePopup
        open={openModalUpdate}
        customerObj={customerObj}
        setCustomerObj={setCustomerObj}
        handleOpen={handleOpenModalUpdate}
        handleClose={handleCloseModalUpdate}
        handleReloadPage={handleReloadPage}
      />
      <DeletePopup
        open={openModalDelete}
        id={customerId}
        handleOpen={handleOpenModalDelete}
        handleClose={handleCloseModalDelete}
        handleReloadPage={handleReloadPage}
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
