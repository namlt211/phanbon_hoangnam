export const getNow = () => {
  var now = new Date();
  var isoString = now.toISOString(); // "2023-03-10T14:02:52.123Z" (giả sử đang ở múi giờ UTC)

  // chuyển đổi thành định dạng "yyyy-MM-ddTHH:mm:ss+hh:mm"
  var dateString = isoString.substring(0, 19);
  var offsetString = isoString.substring(19, 24);
  var formattedString = dateString + offsetString; // "2023-03-10T14:02:52+00:00" (múi giờ UTC)
  return formattedString;
};

export const formatDate = (paramDate) => {
  const date = new Date(paramDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const formatMoney = (paramMoney) => {
  const formattedAmount = paramMoney.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedAmount;
};

export const formatMoneyVN = (paramMoney) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return VND.format(paramMoney);
};
