"use client";
import { useState } from "react";
import Error from "@/components/Error";
import { ProfileType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getProfileDetails } from "@/api/get";
import Orders from "./Orders";
import ShippingInfo from "./ShippingInfo";
import Dashboard from "./Dashboard";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const sections = ["Dashboard", "Shipping Information", "Orders History"];

  const { data: profileData } = useQuery<ProfileType>({
    queryKey: ["profile"],
    queryFn: getProfileDetails,
  });

  if (!profileData) return <Error />;

  return (
    <div className="max-w-7xl mx-auto mt-20 px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-[70vh]">
        <aside className="bg-white rounded-xl shadow p-6 h-full space-y-4">
          <h2 className=" text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </h2>
          {Object.entries(sections).map((section, index) => {
            return (
              <button key={index} onClick={() => setActiveSection(section[1])}>
                {section}
              </button>
            );
          })}
        </aside>

        <div className="md:col-span-3 bg-white p-10 rounded-xl shadow-md flex flex-col justify-between min-h-[70vh]">
          <>
            <header className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-5">
                {activeSection === "Dashboard" && <Dashboard />}
                {activeSection === "Orders History" && <Orders />}
                {activeSection === "Shipping Information" && <ShippingInfo />}
              </div>
            </header>
          </>
        </div>
      </div>
    </div>
  );
};

export default Profile;
