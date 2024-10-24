// Home.jsx
import Map from "../component/Map"; // แก้ไขเส้นทางให้ถูกต้องตามโครงสร้างโฟลเดอร์ของคุณ
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import "tailwindcss/tailwind.css";

import StoreService from "../services/Store.services";
import { useEffect, useState } from "react";

const Home = () => {
  const [stores, setStores] = useState({});
  useEffect(() => {
    const FetchStores = async () => {
      const respone = await StoreService.getAllStores();
      console.log(respone.data);

      setStores(respone);
    };

    FetchStores();
  }, []);

  console.log(stores);

  return (
    <div>
      <Navbar className="fixed top-0 left-0 w-full z-50" />
      <Navbar />
      <div className="mt-24"></div>
      <Map />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
