import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import "../assets/fontawesome/css/all.css";
import Dashboard from "../components/dashboard";
import Login from "../components/login";
import store from "../redux/store";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};
function MyApp({ Component, pageProps }) {
  const [userCookie, setUserCookie] = useState("");
  useEffect(() => {
    setUserCookie(Cookies.get("user"));
  }, [userCookie]);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {userCookie !== undefined ? (
          <Dashboard>
            <Component {...pageProps} />
          </Dashboard>
        ) : (
          <Login>
            <Component {...pageProps} />
          </Login>
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
