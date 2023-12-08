import { useStateProvider } from "../../context/StateContext";
import { GET_SELLER_DASHBOARD_DATA, HOST } from "../../utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Index() {
  const router = useRouter();
  const [cookies] = useCookies();
  const [{ userInfo }] = useStateProvider();
  const [dashboardData, setDashboardData] = useState(undefined);

  useEffect(() => {
    const getBuyerDashboardData = async () => {
      const response = await axios.get(GET_SELLER_DASHBOARD_DATA, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      if (response.status === 200) {
        setDashboardData(response.data.dashboardData);
      }
      console.log({ response });
    };
    if (userInfo) {
      getBuyerDashboardData();
    }
  }, [userInfo]);

  return (
    <>
      <h2 className="text-3xl text-center font-bold">Bienvenido</h2>
      <h4 className="text-xl text-center">
        {userInfo?.fullName}
      </h4>
      {userInfo && (
        <div className="flex flex-col md:flex-row  justify-center gap-5 min-h-[80vh] my-10 mt-0 px-5 md:px-10">
          <div className="shadow-md h-max p-5 md:p-10 flex flex-col gap-5 min-w-80 w-full md:w-96">
            <div className="flex flex-col items-center md:items-start gap-5">
              <div>
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
                    <span className="text-5xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#62646a] text-lg font-medium">
                  {userInfo.username}
                </span>
                <span className="font-bold text-md">{userInfo?.fullName}</span>
              </div>
            </div>
            <div className="border-t py-5">
              <p>{userInfo.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-10 w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              <div
                className="shadow-md h-max p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/gigs")}
              >
                <h2 className="text-xl">Servicios totales</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold text-center">
                  {dashboardData?.gigs}
                </h3>
              </div>

              <div
                className="shadow-md h-max p-5 md:p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/gigs/create")}
              >
                <h2 className="text-xl">Crear servicio</h2>
                <h3 className="text-[#1DBF73] text-3xl font-extrabold text-center"></h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
