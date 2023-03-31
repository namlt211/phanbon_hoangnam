import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { loginApi } from "../../services/user";

const Index = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const callApiLogin = async () => {
    let data = await loginApi(username, password);
    if (data.status) {
      Cookies.set("user", data.refreshTk);
      router.reload();
    } else {
      console.log("dang nhap that bai: ", data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5 text-dark-orange">
            <div className="text-left font-bold">
              <span className="text-4xl">Hippo</span>
            </div>
            <div className="py-10">
              <h2 className="text-4xl mb-2 font-bold">Chào bạn !</h2>
              <div className="border w-16 border-dark-orange inline-block border-solid mb-24"></div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-80 p-2">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    className="text-xl bg-transparent px-2 text-dark-orange focus:outline-none"
                  />
                </div>
                <div className="bg-gray-100 w-80 p-2 mt-5">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="text-xl bg-transparent px-2 text-dark-orange focus:outline-none"
                  />
                </div>
                <div className="w-72 p-2 mt-5">
                  <a
                    onClick={callApiLogin}
                    href="#"
                    className="text-2xl border border-solid py-2 px-12 inline-block font-semibold cursor-pointer hover:bg-dark-orange hover:text-white duration-300"
                  >
                    Đăng nhập
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-dark-orange text-white py-40 px-12">
            <h2 className="text-4xl font-bold mb-2">
              Đại Lý Phân Bón Hoàng Nam
            </h2>
            <div className="border w-16 border-white inline-block border-solid mb-10"></div>
            <p className="mb-7 text-xl">Hùng Vương, Hà Mòn, Đăk Hà, Kon Tum</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
