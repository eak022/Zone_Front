import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";
import LocationMap from "./LocationMap";
import StoreService from "../services/Store.services";
import { useNavigate } from "react-router-dom";

// Define custom icons
const storeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9198/9198446.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const houseIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7720/7720526.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const selectedStoreIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7877/7877890.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

function Map({ storeData }) {
  const center = [13.838500199744178, 100.02534412184882];
  const [stores, setStores] = useState([]);
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);
  const navigate = useNavigate(); // สร้าง instance ของ navigate

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await StoreService.getAllStores();
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
    handlerGetLocation(); // Get location on mount
  }, []);

  const handlerGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    if (!myLocation.lat || !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your valid location",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      selectedStore.latitude,
      selectedStore.longitude
    );

    if (distance <= selectedStore.deliveryRadius) {
      Swal.fire({
        title: "Success",
        text: "You are within the delivery zone for " + selectedStore.name,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "You are outside the delivery zone for " + selectedStore.name,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleDelete = async (storeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await StoreService.deleteStore(storeId); // ลบ store โดยใช้ storeId
          Swal.fire("Deleted!", "Store has been deleted.", "success");
          setStores(stores.filter((store) => store.storeId !== storeId)); // อัพเดท state
        } catch (error) {
          Swal.fire("Error!", "Failed to delete store.", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="button-container">
        <button className="get-location-btn" onClick={handlerGetLocation}>
          Get My Location
        </button>
        <button className="get-location-btn" onClick={handleLocationCheck}>
          Check Delivery Availability
        </button>
      </div>

      <div>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "80vh", width: "80%", margin: "0 auto" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stores.length > 0 &&
            stores.map((store) => (
              <Marker
                key={store.storeId}
                position={[store.latitude, store.longitude]}
                icon={
                  selectedStore && selectedStore.storeId === store.storeId
                    ? selectedStoreIcon
                    : storeIcon
                }
                eventHandlers={{
                  click: () => {
                    setSelectedStore(store);
                  },
                }}
              >
                <Popup className="popup">
                  <b>{store.storeName}</b>
                  <p>{store.address}</p>
                  <p>Delivery Radius: {store.deliveryRadius} meters</p>
                  <a href={store.direction}>Get Direction</a>
                  <button
                    onClick={() => navigate(`/edit/${store.storeId}`)} // นำทางไปยังหน้าแก้ไข
                    className="popup-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(store.storeId)} // เรียกใช้ฟังก์ชัน handleDelete
                    className="popup-button"
                  >
                    Delete
                  </button>
                </Popup>
              </Marker>
            ))}

          <LocationMap
            myLocation={myLocation}
            icon={houseIcon}
            onLocationSelect={setMylocation}
          />

          {selectedStore && (
            <>
              <Circle
                center={[selectedStore.latitude, selectedStore.longitude]}
                radius={selectedStore.deliveryRadius}
                color="#008163"
                fillColor="#008163"
                fillOpacity={0.2}
                weight={1.5}
              />
              <Marker
                position={[selectedStore.latitude, selectedStore.longitude]}
                icon={selectedStoreIcon}
              >
                <Popup>
                  <b>{selectedStore.name}</b>
                  <p>{selectedStore.address}</p>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
