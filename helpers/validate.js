export const checkInput = (paramString) => {
  let check = false;
  let result = "";
  if (paramString.trim() === undefined || paramString.trim() === "") {
    check = false;
    result = "không được để trống !";
  } else {
    check = true;
  }
  return check ? check : result;
};
