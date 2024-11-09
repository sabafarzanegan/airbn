import { fetchStats } from "@/lib/actions/formAction";
import React from "react";
import AdminCard from "./AdminCard";

async function StatsContainer() {
  const stats = await fetchStats();
  console.log(stats);

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4">
      <AdminCard lable="کاربران" count={stats.usersCount} />
      <AdminCard lable="آگهی ها" count={stats.propertiesCount} />
      <AdminCard lable="رزروها" count={stats.bookingsCount} />
    </div>
  );
}

export default StatsContainer;
