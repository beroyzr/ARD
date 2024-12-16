import ApplicationType from "../models/Applicationtype";

export const createApplicationType = async (data: any) => {
    const applicationType = new ApplicationType(data);
    return await applicationType.save();
};

export const getAllApplicationTypes = async () => {
    return await ApplicationType.find();
};

export const getApplicationTypeById = async (id: string) => {
    return await ApplicationType.findById(id);
};

export const updateApplicationType = async (id: string, data: any) => {
    return await ApplicationType.findByIdAndUpdate(id, data, { new: true });
};

export const deleteApplicationType = async (id: string) => {
    return await ApplicationType.findByIdAndDelete(id);
};
