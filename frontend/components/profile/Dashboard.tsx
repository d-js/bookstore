"use client"

import { getProfileDetails } from "@/api/get";
import { ProfileType } from "@/types/types";
import { TOKEN_IDENTIFIER } from "@/utils/constants/constant";
import { ROUTE_LOGIN } from "@/utils/routes/pageRoutes";
import { useQuery } from "@tanstack/react-query";
import router from "next/router";

const Dashboard = () => {
  const { data: profileData } = useQuery<ProfileType>({
    queryKey: ["profile"],
    queryFn: getProfileDetails,
  });

  const logout = () => {
    localStorage.removeItem(TOKEN_IDENTIFIER);
    router.push(ROUTE_LOGIN);
  };

  return (
    <div>
      <p>{profileData?.name}</p>
      <p>{profileData?.lastname}</p>
      <p>{profileData?.age}</p>
      <p>{profileData?.country}</p>

      <p className="font-extrabold font-stretch-extra-condensed text-red-600">
        Attention, if u logout u cannot oreder item anymore until you login back
      </p>
      <div className="mt-auto pt-10">
        <button
          className="w-full rounded-md bg-red-600 py-3 text-white font-semibold hover:bg-red-700 hover:cursor-pointer transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
