import React, { useState } from "react";
import { addMediaScan } from "../services/api";

const MediaScanForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    taramaDonemi: "",
    olayKategorisi: "",
    olayOzeti: "",
    kanitLinkleri: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, kanitLinkleri: formData.kanitLinkleri.split(",") };
      const result = await addMediaScan(data);
      onAdd(result); // Listeyi güncellemek için
      setFormData({ taramaDonemi: "", olayKategorisi: "", olayOzeti: "", kanitLinkleri: "" });
    } catch (error) {
      console.error("Ekleme sırasında hata oluştu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tarama Dönemi:</label>
        <input type="text" name="taramaDonemi" value={formData.taramaDonemi} onChange={handleChange} required />
      </div>
      <div>
        <label>Olay Kategorisi:</label>
        <input type="text" name="olayKategorisi" value={formData.olayKategorisi} onChange={handleChange} required />
      </div>
      <div>
        <label>Olay Özeti:</label>
        <textarea name="olayOzeti" value={formData.olayOzeti} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Kanıt Linkleri (virgülle ayırın):</label>
        <input type="text" name="kanitLinkleri" value={formData.kanitLinkleri} onChange={handleChange} />
      </div>
      <button type="submit">Ekle</button>
    </form>
  );
};

export default MediaScanForm;
