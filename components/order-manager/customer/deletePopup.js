import { toast } from "react-toastify";
import { deleteCustomer } from "../../../services/customer";
import PopupDelete from "../../../until/PopupDelete";
const DeletePopup = (props) => {
  const { open, handleClose, id, handleReloadPage } = props;
  const handleDeleteProductClick = async () => {
    let data = await deleteCustomer(id);
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
      toast.error(data.message, {
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
      handleConfirm={handleDeleteProductClick}
    >
      <div> Bạn có muốn xóa khách hàng này ?</div>
    </PopupDelete>
  );
};

export default DeletePopup;
