import api from "./api"; // ใช้ api ที่ import มา
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORE_API = `${BASE_URL}${import.meta.env.VITE_STORE_API}`;

// สร้างร้านค้าใหม่
const createStore = async (storeData) => {
    try {
      const response = await api.post(STORE_API, storeData);
      return response; // ส่งคืนทั้ง response เพื่อให้สามารถตรวจสอบ status ได้
    } catch (error) {
      console.error("Failed to create store:", error);
      throw error; // Re-throw the error เพื่อให้จัดการ error ที่อื่นได้
    }
  };

  // ดึงร้านค้าทั้งหมด
 const getAllStores = async () => { // Make sure to export it
    try {
      
      
      const response = await api.get(`/api/v1/stores`);
      return response; // Return the data from the response
    } catch (error) {
      console.error("Failed to get all stores:", error);
      throw error; // Re-throw the error so it can be handled elsewhere
    }
  };

  // ดึงร้านค้าด้วย ID
const getStoreById = async (storeId) => {
    try {
      const response = await api.get(`${STORE_API}${storeId}`);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error(`Failed to get store with id ${storeId}:`, error);
      throw error; // Re-throw the error so it can be handled elsewhere
    }
  };
  
  // อัปเดตร้านค้าด้วย ID
  const updateStore = async (storeId, storeData) => {
    try {
      const response = await api.put(`${STORE_API}${storeId}`, storeData);
      return response.data; // Return the updated data from the response
    } catch (error) {
      console.error(`Failed to update store with id ${storeId}:`, error);
      throw error; // Re-throw the error so it can be handled elsewhere
    }
  };
  
  // ลบร้านค้าด้วย ID
  const deleteStore = async (storeId) => {
    try {
      const response = await api.delete(`${STORE_API}/${storeId}`); // เพิ่ม / ก่อน storeId
      return response.data; // Return the result from the response
    } catch (error) {
      console.error(`Failed to delete store with id ${storeId}:`, error);
      throw error; // Re-throw the error so it can be handled elsewhere
    }
  };
  
  // Export ฟังก์ชันทั้งหมดใน StoreService
  const StoreService = {
    createStore,
    getAllStores,
    getStoreById,
    updateStore,
    deleteStore,
  };
  
  export default StoreService;