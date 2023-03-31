import { useState } from "react";
import { toast } from "react-toastify";
import { checkInput } from "../../../helpers/validate";
import { addCustomers } from "../../../services/customer";
import Popup from "../../../until/Popup";
const AddPopup = (props) => {
  const { open, handleClose, handleReloadPage } = props;
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const handleAddCustomerClick = async () => {
    if (
      checkInput(customer.name) !== true ||
      checkInput(customer.phone) !== true ||
      checkInput(customer.address) !== true
    ) {
      toast.error(checkInput(customer.name), {
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
      let data = await addCustomers(customer);
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
        setCustomer({
          name: "",
          phone: "",
          address: "",
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
    }
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      size="S"
      title="Thêm khách hàng"
      handleConfirm={handleAddCustomerClick}
      titleBtn="Thêm khách hàng"
    >
      <div>
        <div className="mt-3">
          <div className="flex flex-col">
            <div className="flex flex-col w-full p-1 text-xl">
              <label>Tên khách hàng: </label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                placeholder="Tên khách hàng..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="mt-2">Số điện thoại: </label>
              <input
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
                type="text"
                placeholder="Số điện thoại"
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none capitalize w-full"
              />
              <label className="mt-2">Địa chỉ: </label>
              <input
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
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

export default AddPopup;
