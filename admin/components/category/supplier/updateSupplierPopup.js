import { useState } from "react";
import { toast } from "react-toastify";
import { getNow } from "../../../helpers/getNow";
import { updateSupplierAPI } from "../../../services/product";
import Popup from "../../../until/Popup";
const UpdateSupplierPopup = (props) => {
  const { open, handleClose, supplier, handleReloadPage } = props;

  //supplier state
  const [newSupplier, setNewSupplier] = useState({
    name: supplier.name,
    description: supplier.description,
    create_at: getNow(),
  });

  //handle click update
  const handleUpdateSupplierClick = async () => {
    let data = await updateSupplierAPI(supplier.id, newSupplier);
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
              <label>Tên nhà cung cấp: </label>
              <input
                type="text"
                defaultValue={supplier.name}
                onChange={(e) =>
                  setNewSupplier({ ...supplier, name: e.target.value })
                }
                placeholder="Tên sản phẩm..."
                className="border mt-1 border-solid border-[#ccc] p-1 outline-none w-full "
              />
            </div>
          </div>
          <div className="pt-3 text-xl p-1 flex flex-col">
            <label className="">Mô tả nhà cung cấp</label>
            <textarea
              defaultValue={supplier.description}
              className="outline-none mt-2 p-2 min-h-[200px] border border-solid"
              onChange={(e) =>
                setNewSupplier({ ...supplier, description: e.target.value })
              }
              placeholder="Mô tả nhà cung cấp"
            ></textarea>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default UpdateSupplierPopup;
