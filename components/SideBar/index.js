import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
const SideBar = (props) => {
  const { Menus, darkMode, onClickOpenSubMenu } = props;
  const [openSideBar, setOpenSideBar] = useState(true); // set sidebar open
  const [reload, setReload] = useState(false); // set reRender
  const router = useRouter();
  const onClickBars = () => {
    setOpenSideBar(!openSideBar);
  };
  const onClickSubMenuOpen = (i) => {
    setReload(!reload);
    onClickOpenSubMenu(i);
  };
  const handleClickMenu = (i) => {
    router.push(i);
  };
  return (
    <div
      className={`bg-dark-orange min-h-screen p-5 pt-8 ${
        openSideBar ? "w-96" : "w-24"
      } duration-300 relative`}
    >
      <i
        className={`${
          openSideBar
            ? "fa-sharp fa-solid fa-arrow-left"
            : "fa-sharp fa-solid fa-arrow-right"
        } bg-white text-dark-orange 
        text-2xl rounded-full absolute -right-4 p-1 pl-2 w-[25px] h-[25px] top-4 border-solid border border-dark-orange cursor-pointer`}
        onClick={onClickBars}
      ></i>
      <div className="inline-flex items-center">
        <i
          className={`${
            !openSideBar && "rotate-[360deg]"
          } fa-solid fa-poo text-4xl text-white block float-left mr-4 duration-700`}
        ></i>
        <h1
          className={`${
            !openSideBar && "scale-0"
          } uppercase text-white text-3xl origin-left duration-300
        `}
        >
          cứt HN
        </h1>
      </div>
      {/* MENU LIST START */}
      <div className="flex items-center rounded-md bg-light-while mt-6 px-4 py-2">
        <i className="fa-solid fa-magnifying-glass text-white text-lg block float-left cursor-pointer mr-2"></i>
        <input
          type={"search"}
          placeholder="Search"
          className={`${
            !openSideBar && "hidden"
          }text-base bg-transparent w-full text-white focus:outline-none`}
        />
      </div>
      <ul className="pt-2">
        {Menus?.map((menu, index) => (
          <div key={menu.id}>
            <li
              className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 hover:bg-light-while rounded-md mt-2"
              onClick={() => onClickSubMenuOpen(index)}
            >
              <i
                className={`${menu.icon} block float-left duration-500 ${
                  openSideBar ? "text-2xl" : "text-3xl"
                }`}
              ></i>
              <span
                className={`text-xl font-medium flex-1 capitalize duration-300 ${
                  !openSideBar && "hidden"
                }`}
              >
                {menu.name}
              </span>
              <span>
                {openSideBar &&
                  menu.subMenu &&
                  (menu.open ? (
                    <i className="fa-solid fa-angle-down"></i>
                  ) : (
                    <i className="fa-solid fa-angle-up"></i>
                  ))}
              </span>
            </li>
            {openSideBar && menu.subMenu && menu.open && (
              <ul>
                {menu.subMenu.map((m) => (
                  <li
                    onClick={() => handleClickMenu(m.link)}
                    key={m.id}
                    className="text-white text-lg flex items-center pl-10 gap-x-4 cursor-pointer px-5 p-3 hover:bg-light-while rounded-md mt-2 capitalize"
                  >
                    <i className={m.icon}></i> {m.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
      {/* MENU LIST END HERE */}
    </div>
  );
};

export default SideBar;
