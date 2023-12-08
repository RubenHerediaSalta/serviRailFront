import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { GET_USER_INFO, HOST } from "../utils/constants";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import ContextMenu from "./ContextMenu";

function Navbar() {
  const router = useRouter();
  const [cookies] = useCookies();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] = useStateProvider();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const handleProfileClick = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  const links = [
    // { linkName: "Servicios Populares", handler: "#", type: "link" },
    // { linkName: "Explore", handler: "#", type: "link" },
    // { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Iniciar Sesion", handler: handleLogin, type: "button" },
    { linkName: "Registrarse", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setIsFixed(true);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );

          let projectedUserInfo = { ...user };
          if (user.profileImage) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.profileImage,
            };
          }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          if (user.isProfileInfoSet === false) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo, dispatch]);



  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();

      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);
  const ContextMenuData = [
    {
      name: "Perfil",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Salir",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller");
    router.push("/seller");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/orders");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };

  const handleSearch = () => {
    setSearchData("");
    router.push(`/search?q=${searchData}`);
  };



  return (
    <>
      {isLoaded && (
        <nav className="w-full px-4 flex justify-between items-center bg-4 border-b z-30 border-gray-200">
          <div className="flex items-center">
            <Link href="/">
              <Image alt="hero" src="/servifyLogo.png" width={70} height={70} />
            </Link>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="¿Qué servicio estás buscando?"
              className="hidden md:block w-96 py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              className="bg-gray-900 py-2.5 px-2 text-white w-10 hidden md:block"
              onClick={handleSearch}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>

          {!userInfo ? (
            <ul className="flex gap-10 items-center">
              {links.map(({ linkName, handler, type }) => {
                return (
                  <li
                    key={linkName}
                    className={`border text-md font-semibold py-1 px-3 rounded-sm bg-3 ${isFixed
                      ? "border-[#ffffff] text-[#ffffff]"
                      : "border-white text-white bg-4"
                      } hover:bg-[#0a0a70] hover:text-white hover:border-[#ffffff] transition-all duration-500`}
                  >
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && (
                      <button onClick={handler}>{linkName}</button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`${isFixed
                          ? "border-[#ffffff] text-[#ffffff]"
                          : "border-white text-white"
                          } hover:bg-[#0a0a70] hover:text-white hover:border-[#ffffff] transition-all duration-500`}
                      >
                        {linkName}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center">
              {isSeller && (
                <li
                  className="cursor-pointer text-[#ffffff] font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  {/* Create Gig */}
                </li>
              )}
              <li
                className="cursor-pointer text-[#ffffff] font-medium"
                onClick={handleOrdersNavigate}
              >
                Panel de<br></br> Vendedor
              </li>

              {isSeller ? (
                <li
                  className="cursor-pointer font-medium text-white"
                  onClick={handleModeSwitch}
                >
                  {/* Switch To Buyer */}
                </li>
              ) : (
                <li
                  className="cursor-pointer font-medium text-white"
                  onClick={handleModeSwitch}
                >
                  {/* Switch To Seller */}
                </li>
              )}
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {userInfo &&
                        userInfo?.email &&
                        userInfo?.email.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
