import styled from "styled-components";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import NavBar from "../NavBar";
import { useRouter } from "next/router";
const Index = (props) => {
  const { children } = props;
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false); //true --> set dark mode
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "danh mục",
      subMenu: [
        {
          id: 1,
          name: "sản phẩm",
          icon: "fa-solid fa-list",
          link: "/category/product",
        },
        {
          id: 2,
          name: "nhà cung cấp",
          icon: "fa-solid fa-house",
          link: "/category/supplier",
        },
      ],
      open: true,
      icon: "fa-brands fa-microsoft",
    },
    {
      id: 2,
      name: "đơn hàng",
      icon: "fa-brands fa-shopify",
      open: false,
    },
    {
      id: 3,
      name: "cửa hàng",
      icon: "fa-solid fa-shop",
      open: false,
    },
    {
      id: 4,
      name: "tùy chỉnh",
      icon: "fa-solid fa-gears",
      open: false,
    },
    {
      id: 5,
      name: "phân quyền",
      icon: "fa-solid fa-users",
      open: false,
    },
  ]);
  useEffect(() => {});
  //handle open & close submenu
  const onClickOpenSubMenu = (index) => {
    let newArr = [...menus];
    newArr[index].open = !newArr[index].open;
    setMenus[newArr];
  };
  return (
    <div className="flex">
      <SideBar
        Menus={menus}
        darkMode={darkMode}
        onClickOpenSubMenu={onClickOpenSubMenu}
      />
      <div className="flex flex-col w-full">
        <div>
          <NavBar />
        </div>
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
};

export default Index;
