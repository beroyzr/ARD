import axios from "axios";

// Change this to your deployed backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Axios örneğini oluşturuyoruz.
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer token' gibi başlıkları buraya ekleyebilirsiniz.
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

// Login API Function
export const login = async (email, password) => {
  try {
    const { data } = await axiosInstance.post('/login', { email, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};