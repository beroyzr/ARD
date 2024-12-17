import React, { useEffect, useState } from "react";
import { getMediaScans } from "../services/api";
import MediaScanForm from "../components/MediaScanForm";
import MediaScanList from "../components/MediaScanList";

const MediaScans = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMediaScans();
      setScans(data);
    };
    fetchData();
  }, []);

  const handleAddScan = (newScan) => {
    setScans((prev) => [...prev, newScan]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Hak İhlalleri Yönetimi</h1>
      <MediaScanForm onAdd={handleAddScan} />
      <MediaScanList scans={scans} />
    </div>
  );
};

export default MediaScans;
