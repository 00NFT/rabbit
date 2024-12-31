import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY as string;

const toUrlSafeBase64 = (str: string) =>
  str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromUrlSafeBase64 = (str: string) =>
  str.replace(/-/g, "+").replace(/_/g, "/");

export const encrypt = (payload: string) => {
  try {
    if (!SECRET_KEY) {
      console.log("No Secret Key.");
      return null;
    }
    const encrypted = CryptoJS.AES.encrypt(payload, SECRET_KEY).toString();
    return toUrlSafeBase64(encrypted); 
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
    const encryptedBase64 = fromUrlSafeBase64(encrypted); 
    const decrypted_bytes = CryptoJS.AES.decrypt(encryptedBase64, SECRET_KEY);
    const decrypted = decrypted_bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (e) {
    console.log("Decryption error occur : ", e);
    return null;
  }
};
