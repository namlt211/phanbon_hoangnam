import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getAllSupplier, getSupplierById } from "../../../services/product";
import AddSupplierPopup from "./AddSupplierPopup";
import DeleteSupplierPopup from "./deleteSupplierPopup";
import UpdateSupplierPopup from "./updateSupplierPopup";

const Index = () => {
  const threads = [
    { key: "couponId", name: "Mã nhà cung cấp" },
    { key: "manuId", name: "Tên nhà cung cấp" },
    { key: "description", name: "Mô tả" },
    { key: "action", name: "Tùy chỉnh" },
  ];

  //Reload Page Start
  const [reLoad, setReload] = useState(false);
  const handleReloadPage = () => setReload(!reLoad);
  //Reload Page End

  // Modal Add Supplier Start
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleOpenModalAdd = () => setOpenModalAdd(!openModalAdd);
  const handleCloseModalAdd = () => setOpenModalAdd(false);
  // Modal Add Supplier End
  // Modal Update Supplier Start
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const handleOpenModalUpdate = () => setOpenModalUpdate(true);
  const handleCloseModalUpdate = () => setOpenModalUpdate(false);
  // Modal Update Supplier End
  //model delete Supplier Start
  const [idSupplier, setIdSupplier] = useState("");
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);
  //model update Supplier End
  //List supplier
  const [listSupplier, setListSupplier] = useState([]);
  //supplier object api request
  const [supplier, setSupplier] = useState({});
  // handle get all supplier
  useEffect(() => {
    const getAllSuppliers = async () => {
      let listSupplier = await getAllSupplier();
      if (listSupplier.status) {
        setListSupplier(listSupplier.data);
      }
    };
    getAllSuppliers();
  }, [reLoad]);
  //handle onClick event update supplier
  const handleUpdateSupplierClick = async (id) => {
    let data = await getSupplierById(id);
    if (data) {
      setSupplier(data.data);
      handleOpenModalUpdate();
    }
  };
  //handle onClick event delete supplier
  const handleDeleteClick = (id) => {
    setIdSupplier(id);
    handleOpenModalDelete();
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
            onClick={handleOpenModalAdd}
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
            {listSupplier.length > 0 ? (
              listSupplier?.map((tr) => (
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
                  <td className="pl-8">{tr?.description}</td>
                  <td className="pl-8 flex justify-between w-1/2 text-xl text-dark-orange">
                    <div onClick={() => handleUpdateSupplierClick(tr.id)}>
                      <i className="fa-solid fa-pen cursor-pointer"></i>
                    </div>
                    <div
                      className="ml-2"
                      onClick={() => handleDeleteClick(tr.id)}
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
      <AddSupplierPopup
        open={openModalAdd}
        handleOpen={handleOpenModalAdd}
        handleClose={handleCloseModalAdd}
        handleReloadPage={handleReloadPage}
      />
      <UpdateSupplierPopup
        open={openModalUpdate}
        supplier={supplier}
        handleOpen={handleOpenModalUpdate}
        handleClose={handleCloseModalUpdate}
        handleReloadPage={handleReloadPage}
      />
      <DeleteSupplierPopup
        open={openModalDelete}
        handleOpen={handleOpenModalDelete}
        handleClose={handleCloseModalDelete}
        handleReloadPage={handleReloadPage}
        id={idSupplier}
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
        className="text-xs font-roboto"
      />
    </div>
  );
};

export default Index;
