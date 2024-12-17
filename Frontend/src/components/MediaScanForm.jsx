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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 bg-white rounded-lg shadow">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Tarama Dönemi:</span>
        </label>
        <input type="text" name="taramaDonemi" value={formData.taramaDonemi} onChange={handleChange} className="input input-bordered w-full" required />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Olay Kategorisi:</span>
        </label>
        <input type="text" name="olayKategorisi" value={formData.olayKategorisi} onChange={handleChange} className="input input-bordered w-full" required />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Olay Özeti:</span>
        </label>
        <textarea name="olayOzeti" value={formData.olayOzeti} onChange={handleChange} className="textarea textarea-bordered w-full" required></textarea>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Kanıt Linkleri (virgülle ayırın):</span>
        </label>
        <input type="text" name="kanitLinkleri" value={formData.kanitLinkleri} onChange={handleChange} className="input input-bordered w-full" />
      </div>
      <button type="submit" className="btn btn-primary w-full">Ekle</button>
    </form>
  );
};

export default MediaScanForm;
