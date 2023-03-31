import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import noImg from "../../../assets/images/noImg.jpg";
import { formatMoney, getNow } from "../../../helpers/getNow";
import {
  getAllProduct,
  getAllSupplier,
  getProductById,
  getPRoductById,
} from "../../../services/product";
import AddProductPopup from "./addProductPopup";
import DeleteProductPopup from "./deleteProductPopup";
import UpdateProductPopup from "./updateProductPopup";

const ProductComponent = () => {
  const threads = [
    { key: "couponId", name: "Mã sản phẩm" },
    { key: "manuId", name: "Tên sản phẩm" },
    { key: "image", name: "Hình ảnh" },
    { key: "price", name: "Giá" },
    { key: "unit", name: "Đơn vị tinh" },
    { key: "discount", name: "Khuyến mãi" },
    { key: "supplier", name: "Nhà cung cấp" },
    { key: "action", name: "Tùy chỉnh" },
  ];
  //product list start
  const [productList, setProductList] = useState([]);
  //product list end

  //product object start
  const [productObj, setProductObj] = useState({
    product_name: "",
    product_image: "",
    product_price: 0,
    unit: "",
    product_description: "",
    supplier_id: 0,
    updated_at: getNow(),
  });
  //product object end

  //product id start
  const [productId, setProductId] = useState(0);
  //product id end

  //Reload Page Start
  const [reLoad, setReload] = useState(false);
  const handleReloadPage = () => setReload(!reLoad);
  //Reload Page End

  // Modal Add Product Start
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleOpenModalAdd = () => setOpenModalAdd(!openModalAdd);
  const handleCloseModalAdd = () => setOpenModalAdd(false);
  // Modal Add Product End

  //modal update product start
  const [openModalUpdateProduct, setOpenModalUpdateProduct] = useState(false);
  const handleOpenModalUpdateProduct = () => setOpenModalUpdateProduct(true);
  const handleCloseModalUpdateProduct = () => setOpenModalUpdateProduct(false);
  //modal update product end

  //modal delete product start
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState(false);
  const handleOpenModalDeleteProduct = () => setOpenModalDeleteProduct(true);
  const handleCloseModalDeleteProduct = () => setOpenModalDeleteProduct(false);
  //modal delete product end

  //List supplier
  const [listSupplier, setListSupplier] = useState([]);
  const handleBtnAdd = async () => {
    let listSupplier = await getAllSupplier();
    if (listSupplier.status) {
      setListSupplier(listSupplier.data);
    }
    handleOpenModalAdd();
  };
  // handle get all product
  useEffect(() => {
    const getAllProducts = async () => {
      let data = await getAllProduct();
      if (data.status) {
        setProductList(data.data);
      }
    };
    getAllProducts();
  }, [reLoad]);

  //handle events update product click
  const handleUpdateProductClick = async (id) => {
    let listSupplier = await getAllSupplier();
    if (listSupplier.status) {
      setListSupplier(listSupplier.data);
    }
    let data = await getProductById(id);
    if (data.status) {
      setProductObj(data.data);
      handleOpenModalUpdateProduct();
    }
  };
  //handle events delete product
  const handleDeleteProductClick = async (id) => {
    setProductId(id);
    handleOpenModalDeleteProduct();
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
          <tbody className="text-2xl">
            {productList?.length > 0 ? (
              productList?.map((tr) => (
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
                  <td className="px-8">
                    <Image
                      className="w-[40px] h-[40px]"
                      src={tr?.image || noImg}
                      alt={tr?.image ? tr?.name : "chưa có hình"}
                    />
                  </td>
                  <td className="pl-8">{formatMoney(tr?.price || 0)}</td>
                  <td className="pl-8">{tr?.unit || 0} kg/bao</td>
                  <td className="pl-8">{tr?.discount || 0} %</td>
                  <td className="pl-8">{tr?.supplier}</td>
                  <td className="pl-8 flex justify-between w-1/2 text-xl text-dark-orange">
                    <div onClick={() => handleUpdateProductClick(tr.id)}>
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
      <AddProductPopup
        open={openModalAdd}
        listSupplier={listSupplier}
        handleOpen={handleOpenModalAdd}
        handleClose={handleCloseModalAdd}
        handleReloadPage={handleReloadPage}
      />
      <UpdateProductPopup
        open={openModalUpdateProduct}
        productObj={productObj}
        setProductObj={setProductObj}
        handleOpen={handleOpenModalUpdateProduct}
        handleClose={handleCloseModalUpdateProduct}
        handleReloadPage={handleReloadPage}
        listSupplier={listSupplier}
      />
      <DeleteProductPopup
        open={openModalDeleteProduct}
        id={productId}
        handleOpen={handleOpenModalDeleteProduct}
        handleClose={handleCloseModalDeleteProduct}
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

export default ProductComponent;
