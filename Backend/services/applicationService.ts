import Application from "../models/Application";

// Başvuru oluştur
export const createApplication = async (data: any) => {
    const application = new Application(data);
    return await application.save();
};

// Tüm başvuruları getir
export const getAllApplications = async () => {
    return await Application.find();
};

// ID ile başvuru getir
export const getApplicationById = async (id: string) => {
    return await Application.findById(id);
};

// Başvuru güncelle
export const updateApplication = async (id: string, data: any) => {
    return await Application.findByIdAndUpdate(id, data, { new: true });
};

// Başvuru sil
export const deleteApplication = async (id: string) => {
    return await Application.findByIdAndDelete(id);
};
