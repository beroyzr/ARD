// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getMediaScans } from "../services/api";

const Home = () => {
  const [mediaScans, setMediaScans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMediaScans();
        setMediaScans(data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Medya Taramaları</h1>
      <ul>
        {mediaScans.map((scan, index) => (
          <li key={index}>{scan.name}</li> // Örnek bir veri alanı
        ))}
      </ul>
    </div>
  );
};

export default Home;
