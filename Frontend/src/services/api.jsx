import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Axios örneğini oluşturuyoruz.
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer token' gibi başlıkları buraya ekleyebilirsiniz.
  }
});

// Media scan'leri çekmek için GET isteği.
export const getMediaScans = async () => {
  try {
    const response = await axiosInstance.get('/mediascan');
    return response.data;
  } catch (error) {
    console.error("Error fetching media scans:", error);
    throw error; // Hata yönetimi için hatayı tekrar fırlatıyoruz.
  }
};

// Yeni media scan eklemek için POST isteği.
export const addMediaScan = async (data) => {
  try {
    const response = await axiosInstance.post('/mediascan', data);
    return response.data;
  } catch (error) {
    console.error("Error adding media scan:", error);
    throw error;
  }
};

// New API Functions
export const getCases = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/cases`);
  return data;
};

export const addCase = async (caseData) => {
  const { data } = await axios.post(`${API_BASE_URL}/cases`, caseData);
  return data;
};