import { useState } from "react";
import { toast } from "react-toastify";
import { getNow } from "../../../helpers/getNow";
import { updateCustomerByID } from "../../../services/customer";
import Popup from "../../../until/Popup";
const UpdatePopup = (props) => {
  const { open, handleClose, customerObj, handleReloadPage, setCustomerObj } =
    props;
  const handleAddCustomerClick = async () => {
    let data = await updateCustomerByID(customerObj.id, customerObj);
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
      toast.error("Lỗi khi cập nhật khách hàng mới!", {
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
      title="Cập nhật khách hàng"
      handleConfirm={handleAddCustomerClick}
      titleBtn="Cập nhật"
    >
      <div>
        <div className="mt-3">
          <div className="flex flex-col">
            <div className="flex flex-col w-full p-1 text-xl">
              <label>Tên khách hàng: </label>
              <input
                type="text"
                value={customerObj.name || ""}
                onChange={(e) =>
                  setCustomerObj({ ...customerObj, name: e.target.value })
                }
                placeholder="Tên khách hàng..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="mt-2">Số điện thoại: </label>
              <input
                value={customerObj.phone || ""}
                onChange={(e) => {
                  setCustomerObj({ ...customerObj, phone: e.target.value });
                }}
                type="text"
                placeholder="Số điện thoại"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
              <label className="mt-2">Địa chỉ: </label>
              <input
                value={customerObj.address || ""}
                onChange={(e) =>
                  setCustomerObj({ ...customerObj, address: e.target.value })
                }
                type="text"
                placeholder="Địa chỉ"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default UpdatePopup;
