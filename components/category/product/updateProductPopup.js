import { useState } from "react";
import { toast } from "react-toastify";
import { UNIT_PRODUCT } from "../../../config/constant";
import { getNow } from "../../../helpers/getNow";
import { checkInput } from "../../../helpers/validate";
import { updateProductByID } from "../../../services/product";
import Popup from "../../../until/Popup";
const UpdateProductPopup = (props) => {
  const {
    open,
    handleClose,
    productObj,
    handleReloadPage,
    listSupplier,
    setProductObj,
  } = props;
  //handle click update
  const handleUpdateSupplierClick = async () => {
    if (checkInput(productObj.name) === true && productObj.price > 0) {
      let data = await updateProductByID(productObj.id, productObj);
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
      } else {
        toast.error(data.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Kiểm tra lại thông tin !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
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
                value={productObj.name || ""}
                onChange={(e) =>
                  setProductObj({ ...productObj, name: e.target.value })
                }
                placeholder="Tên sản phẩm..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="mt-2">Hình ảnh: </label>
              <input
                value={productObj.image || ""}
                onChange={(e) =>
                  setProductObj({
                    ...productObj,
                    image: e.target.value,
                  })
                }
                type="text"
                placeholder="Hình ảnh"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
              <label className="mt-2">Giá: </label>
              <input
                value={productObj.price || 0}
                onChange={(e) =>
                  setProductObj({
                    ...productObj,
                    price: e.target.value,
                  })
                }
                type="number"
                placeholder="Giá"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
              <label className="mt-2">Khuyến mãi: </label>
              <input
                value={productObj.discount || 0}
                onChange={(e) =>
                  setProductObj({
                    ...productObj,
                    discount: e.target.value,
                  })
                }
                type="number"
                placeholder="Giá"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
              <label className="mt-2">Đơn vị tính: </label>
              <select
                value={productObj.unit}
                onChange={(e) =>
                  setProductObj({
                    ...productObj,
                    unit: e.target.value,
                  })
                }
                className="border mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
              >
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
                value={productObj.supplier_id}
                onChange={(e) =>
                  setProductObj({
                    ...productObj,
                    supplier_id: parseFloat(e.target.value),
                  })
                }
                className="border mt-1 w-full border-solid border-[#ccc] outline-none p-1 capitalize"
              >
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
              value={productObj.description}
              className="outline-none mt-2 p-2 min-h-[200px] border border-solid"
              onChange={(e) =>
                setProductObj({
                  ...productObj,
                  description: e.target.value,
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
