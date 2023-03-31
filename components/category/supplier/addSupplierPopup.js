import { useState } from "react";
import { toast } from "react-toastify";
import { addSupplierAPI } from "../../../services/product";
import Popup from "../../../until/Popup";
const AddSupplierPopup = (props) => {
  const { open, handleClose, handleReloadPage } = props;

  //supplier state
  const [supplier, setSupplier] = useState({
    name: "",
    phone: "",
    description: "",
  });

  //handle click add
  const handleAddSupplierClick = async () => {
    let data = await addSupplierAPI(supplier);
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
      setSupplier({
        name: "",
        phone: "",
        description: "",
      });
      handleClose();
    }
  };
  return (
    <Popup
      open={open}
      handleClose={handleClose}
      size="S"
      title="Thêm nhà cung cấp"
      handleConfirm={handleAddSupplierClick}
      titleBtn="Thêm"
    >
      <div>
        <div className="mt-3">
          <div className="flex flex-col">
            <div className="flex flex-col w-full p-1 text-xl">
              <label>Tên nhà cung cấp: </label>
              <input
                type="text"
                value={supplier.name}
                onChange={(e) =>
                  setSupplier({ ...supplier, name: e.target.value })
                }
                placeholder="Tên sản phẩm..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
              <label className="pt-2">Số điện thoại: </label>
              <input
                type="text"
                value={supplier.phone}
                onChange={(e) =>
                  setSupplier({ ...supplier, phone: e.target.value })
                }
                placeholder="Số điện thoại..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
            </div>
          </div>
          <div className="pt-3 text-xl p-1 flex flex-col">
            <label className="">Mô tả nhà cung cấp</label>
            <textarea
              value={supplier.description}
              className="outline-none mt-2 p-2 min-h-[200px] border border-solid"
              onChange={(e) =>
                setSupplier({ ...supplier, description: e.target.value })
              }
              placeholder="Mô tả nhà cung cấp"
            ></textarea>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AddSupplierPopup;
