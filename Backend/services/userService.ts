import User from "../models/User";

// Kullanıcı oluşturma
export const createUser = async (userData: any) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Tüm kullanıcıları getirme
export const findAllUsers = async () => {
    return await User.find();
};

// Tek bir kullanıcıyı getirme
export const findUserById = async (id: string) => {
    return await User.findById(id);
};

