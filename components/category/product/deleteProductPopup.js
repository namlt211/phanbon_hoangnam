import { toast } from "react-toastify";
import { deleteProductByID } from "../../../services/product";
import PopupDelete from "../../../until/PopupDelete";
const DeleteProductPopup = (props) => {
  const { open, handleClose, id, handleReloadPage } = props;

  const handleDeleteProductClick = async () => {
    let data = await deleteProductByID(id);
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
      handleConfirm={handleDeleteProductClick}
    >
      <div> Bạn có muốn xóa sản phẩm này ?</div>
    </PopupDelete>
  );
};

export default DeleteProductPopup;
