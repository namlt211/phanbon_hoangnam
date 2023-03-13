import Cookies from "js-cookie";

const getUserCookies = async () => {
  let user = await Cookies.get("user");
  if (typeof user !== "undefined") {
    return true;
  }
  return false;
};

export default getUserCookies;
