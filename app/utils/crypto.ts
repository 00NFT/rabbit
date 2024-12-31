import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY as string;

export const encrypt = (payload: string) => {
  try {
    if (!SECRET_KEY) {
      console.log("No Secret Key.");
      return null;
    }
    const encrypted = CryptoJS.AES.encrypt(payload, SECRET_KEY).toString();
    return encrypted;
  } catch (e) {
    console.log("Encryption error occur : ", e);
    return null;
  }
};

export const decrypt = (encrypted: string) => {
  try {
    if (!SECRET_KEY) {
      console.log("No Secret Key.");
      return null;
    }
    const decrypted_bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = decrypted_bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (e) {
    console.log("Decryption error occur : ", e);
    return null;
  }
};
