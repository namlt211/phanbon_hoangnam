import { useState } from "react";
import { toast } from "react-toastify";
import { getNow } from "../../../helpers/getNow";
import {
  updateProductByID,
  updateSupplierAPI,
} from "../../../services/product";
import Popup from "../../../until/Popup";
const UpdateProductPopup = (props) => {
  const { open, handleClose, product, handleReloadPage, listSupplier } = props;

  //rpoduct state
  const [newProduct, setNewProduct] = useState({
    product_name: product.product_name,
    product_description: product.product_description,
    product_price: product.product_price,
    supplier_id: product.supplier_id,
    product_image: product.product_image,
    create_at: getNow(),
  });

  //handle click update
  const handleUpdateSupplierClick = async () => {
    newProduct.product_price = parseFloat(newProduct.product_price);
    newProduct.supplier_id = parseInt(newProduct.supplier_id);
    let data = await updateProductByID(product.id, newProduct);
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
      handleClose();
    }
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      size="S"
      title="Cập nhật nhà cung cấp"
      handleConfirm={handleUpdateSupplierClick}
      titleBtn="Cập nhật"
    >
      <div>
        <div className="mt-3">
          <div className="flex flex-col">
            <div className="flex flex-col w-full p-1 text-xl">
              <label>Tên sản phẩm: </label>
              <input
                type="text"
                defaultValue={product.product_name}
                onChange={(e) =>
                  setNewProduct({ ...product, product_name: e.target.value })
                }
                placeholder="Tên sản phẩm..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="mt-2">Hình ảnh: </label>
              <input
                defaultValue={product.product_image}
                onChange={(e) =>
                  setNewProduct({ ...product, product_image: e.target.value })
                }
                type="text"
                placeholder="Hình ảnh"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
              <label className="mt-2">Giá: </label>
              <input
                defaultValue={product.product_price}
                onChange={(e) =>
                  setNewProduct({
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
              <label>Nhà cung cấp: </label>
              <select
                onChange={(e) =>
                  setNewProduct({
                    ...product,
                    supplier_id: e.target.value,
                  })
                }
                className="border mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
              >
                <option defaultValue={product.supplier_id}>
                  Chọn nhà cung cấp
                </option>
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
              defaultValue={product.product_description}
              className="outline-none mt-2 p-2 min-h-[200px] border border-solid"
              onChange={(e) =>
                setNewProduct({
                  ...product,
                  product_description: e.target.value,
                })
              }
              placeholder="Mô tả sản phẩm"
            ></textarea>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default UpdateProductPopup;
