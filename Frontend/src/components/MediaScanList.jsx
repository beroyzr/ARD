import React from "react";

const MediaScanList = ({ scans }) => {
  return (
    <div>
      <h2>Hak İhlalleri Listesi</h2>
      {scans.length === 0 ? (
        <p>Henüz kayıt yok.</p>
      ) : (
        <ul>
          {scans.map((scan) => (
            <li key={scan._id}>
              <strong>Tarama Dönemi:</strong> {scan.taramaDonemi} <br />
              <strong>Olay Kategorisi:</strong> {scan.olayKategorisi} <br />
              <strong>Olay Özeti:</strong> {scan.olayOzeti} <br />
              <strong>Kanıt Linkleri:</strong> {scan.kanitLinkleri.join(", ")} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MediaScanList;
