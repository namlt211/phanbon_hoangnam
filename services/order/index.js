import axios from "axios";
import { GET_ALL_ORDER_DETAILS_URL } from "../../config";

export const getAllOrderDetails = async () => {
  let data;
  let url = GET_ALL_ORDER_DETAILS_URL;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      data = err.message;
    });

  return data;
};
