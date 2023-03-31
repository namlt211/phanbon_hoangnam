import { toast } from "react-toastify";
import { deleteSupplierById } from "../../../services/product";
import PopupDelete from "../../../until/PopupDelete";
const DeleteSupplierPopup = (props) => {
  const { open, handleClose, id, handleReloadPage } = props;

  const handleDeleteSupplierClick = async () => {
    let intId = parseFloat(id);
    let data = await deleteSupplierById(intId);
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
    <PopupDelete
      open={open}
      handleClose={handleClose}
      handleConfirm={handleDeleteSupplierClick}
    >
      <div> Bạn có muốn xóa nhà cung cấp này ?</div>
    </PopupDelete>
  );
};

export default DeleteSupplierPopup;
