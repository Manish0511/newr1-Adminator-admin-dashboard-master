import CryptoJS from "crypto-js";

const secretPass = import.meta.env.VITE_SECRETPASS;

export const encrypt = (plainText) => {
    return CryptoJS.AES.encrypt(
        JSON.stringify(plainText),
        secretPass
    ).toString();
};

export const decrypt = (encryptText) => {
    const bytes = CryptoJS.AES.decrypt(encryptText, secretPass);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};