export const getNow = () => {
  var now = new Date();
  var isoString = now.toISOString(); // "2023-03-10T14:02:52.123Z" (giả sử đang ở múi giờ UTC)

  // chuyển đổi thành định dạng "yyyy-MM-ddTHH:mm:ss+hh:mm"
  var dateString = isoString.substring(0, 19);
  var offsetString = isoString.substring(19, 24);
  var formattedString = dateString + offsetString; // "2023-03-10T14:02:52+00:00" (múi giờ UTC)
  return formattedString;
};
