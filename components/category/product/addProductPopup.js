import { useState } from "react";
import { toast } from "react-toastify";
import { UNIT_PRODUCT } from "../../../config/constant";
import { formatMoney } from "../../../helpers/getNow";
import { checkInput } from "../../../helpers/validate";
import { addProductAPI } from "../../../services/product";
import Popup from "../../../until/Popup";
const AddProductPopup = (props) => {
  const { open, handleClose, listSupplier, handleReloadPage } = props;
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    product_price: 0,
    supplier_id: 0,
    product_image: "",
    unit: "",
  });
  const handleAddProductClick = async () => {
    if (checkInput(product.product_name) !== true) {
      toast.error("Tên sản phẩm " + checkInput(product.product_name), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (product.product_price <= 0) {
      toast.error("Giá phải lớn hơn 0 !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (product.supplier_id === 0) {
      toast.error("Bạn chưa chọn nhà cung cấp", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (product.unit === undefined) {
      toast.error("Bạn chưa chọn đơn vị tính !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      let data = await addProductAPI(product);
      if (data.status) {
        handleReloadPage();
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setProduct({
          product_name: "",
          product_description: "",
          product_price: 0,
          supplier_id: 0,
          product_image: "",
          unit: "",
        });
        handleClose();
      } else {
        toast.error("Lỗi khi tạo sản phẩm !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      size="S"
      title="Thêm sản phẩm"
      handleConfirm={handleAddProductClick}
      titleBtn="Thêm sản phẩm"
    >
      <div>
        <div className="mt-3">
          <div className="flex flex-col">
            <div className="flex flex-col w-full p-1 text-xl">
              <label>Tên sản phẩm: </label>
              <input
                type="text"
                value={product.product_name}
                onChange={(e) =>
                  setProduct({ ...product, product_name: e.target.value })
                }
                placeholder="Tên sản phẩm..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="mt-2">Hình ảnh: </label>
              <input
                value={product.product_image}
                onChange={(e) =>
                  setProduct({ ...product, product_image: e.target.value })
                }
                type="text"
                placeholder="Hình ảnh"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
              <label className="mt-2">Giá: </label>
              <input
                value={product.product_price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    product_price: e.target.value,
                  })
                }
                type="number"
                placeholder="Giá"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
            </div>
            <div className="flex flex-col w-full text-xl p-1">
              <label>Đơn vị tính: </label>
              <select
                onChange={(e) =>
                  setProduct({
                    ...product,
                    unit: e.target.value,
                  })
                }
                className="border mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
              >
                <option>Chọn đơn vị tính</option>
                {UNIT_PRODUCT?.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit} kg
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full text-xl p-1">
              <label>Nhà cung cấp: </label>
              <select
                onChange={(e) =>
                  setProduct({
                    ...product,
                    supplier_id: e.target.value,
                  })
                }
                className="border mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
              >
                <option value={product.supplier_id}>Chọn nhà cung cấp</option>
                {listSupplier?.map((sup, index) => (
                  <option key={index} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-3 text-xl p-1 flex flex-col">
            <label className="">Mô tả sản phẩm</label>
            <textarea
              value={product.product_description}
              className="outline-none mt-2 p-2 min-h-[200px] border border-solid"
              onChange={(e) =>
                setProduct({ ...product, product_description: e.target.value })
              }
              placeholder="Mô tả sản phẩm"
            ></textarea>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AddProductPopup;
