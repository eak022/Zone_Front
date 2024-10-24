import { useState, useEffect } from "react"; // นำเข้า useState และ useEffect จาก React
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/StoreContext"; // นำเข้า AuthContext
import Swal from "sweetalert2";
import Tokenservice from "../services/token.services"; // นำเข้า Tokenservice


function Edit() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext(); // ดึงข้อมูลผู้ใช้จาก AuthContext
  const { storeId } = useParams(); // รับ storeId จาก URL
  const base_url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // ถ้าผู้ใช้ไม่ได้ล็อกอิน ให้แสดง SweetAlert แล้วเปลี่ยนเส้นทางไปที่หน้า Login
    if (!currentUser) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'Please log in to edit a store.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate("/login");
      });
    } else {
      const fetchStoreData = async () => {
        try {
          const response = await fetch(`${base_url}/api/v1/stores/${storeId}`, {
            headers: {
              'x-access-token': Tokenservice.getLocalAccessToken(), // Ensure token is included
            },
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
  
          const data = await response.json();
          setStore(data);
        } catch (error) {
          console.error('Error fetching store data:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to load store data.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };
  
      fetchStoreData();
    }
  }, [currentUser, navigate, storeId]);

  // สร้าง state สำหรับเก็บข้อมูล Store
  const [store, setStore] = useState({
    storeId: "",
    storeName: "",
    address: "",
    latitude: "",
    longitude: "",
    deliveryRadius: "",
  });

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!store.storeName || !store.address || !store.latitude || !store.longitude || !store.deliveryRadius) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await fetch(`${base_url}/api/v1/stores/${storeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'x-access-token': Tokenservice.getLocalAccessToken(), // Include token here
        },
        body: JSON.stringify(store),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Store updated successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Redirect to home or refresh stores
        navigate("/"); 
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Failed to update Store',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error("Error updating Store:", error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while updating the store.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCancel = () => {
    navigate("/"); // เปลี่ยนเส้นทางไปที่หน้า Home
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl text-center font-bold text-white bg-[#008163] shadow-lg p-4 rounded mb-6">
        Edit Store
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["storeName", "address", "latitude", "longitude", "deliveryRadius"].map((field, index) => (
          <label key={index} className="block">
            <span className="text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#008163]"
              placeholder={field}
              name={field}
              onChange={handleChange}
              value={store[field]}
              style={{ backgroundColor: '#F7F7F8' }}
            />
          </label>
        ))}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="get-location-btn text-white py-2 px-4 rounded"
            type="submit"
          >
            Update Store
          </button>
          <button
            className="get-location-btn text-white py-2 px-4 rounded"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
