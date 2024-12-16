import LawsuitInfo, { ILawsuitInfo } from "../models/LawsuitInfo";

export const createLawsuitInfo = async (data: ILawsuitInfo): Promise<ILawsuitInfo> => {
    const lawsuitInfo = new LawsuitInfo(data);
    return await lawsuitInfo.save();
};

export const getAllLawsuitInfos = async (): Promise<ILawsuitInfo[]> => {
    return await LawsuitInfo.find();
};

export const getLawsuitInfoById = async (id: string): Promise<ILawsuitInfo | null> => {
    return await LawsuitInfo.findById(id);
};

export const updateLawsuitInfo = async (id: string, data: Partial<ILawsuitInfo>): Promise<ILawsuitInfo | null> => {
    return await LawsuitInfo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteLawsuitInfo = async (id: string): Promise<ILawsuitInfo | null> => {
    return await LawsuitInfo.findByIdAndDelete(id);
};
