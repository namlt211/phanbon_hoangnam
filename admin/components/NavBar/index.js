import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
const Index = () => {
  const [subMenu, setSubMenu] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("user");
    console.log("Logout", Cookies.get("user"));
    router.reload();
  };
  return (
    <div className="shadow-md relative flex justify-end items-center w-full p-5 px-10">
      <div className="pr-10">
        <i className="fa-solid fa-bell text-3xl"></i>
      </div>
      <div className="text-dark-orange">
        <div
          onClick={() => setSubMenu(!subMenu)}
          className="text-2xl text-dark-orange cursor-pointer"
        >
          Tên người dùng
        </div>
        <ul
          className={`absolute top-full border-solid border p-4 w-[100px] right-100 
          ${subMenu ? "inline-block" : "hidden"} duration-500`}
        >
          <li className="py-2 text-xl hover:bg-light-while cursor-pointer">
            <a>Thông tin</a>
          </li>
          <li className="py-2 text-xl hover:bg-light-while cursor-pointer">
            <a>Tùy chỉnh</a>
          </li>
          <li
            onClick={handleLogout}
            className="py-2 text-xl hover:bg-light-while cursor-pointer"
          >
            <a>Đăng xuất</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Index;
