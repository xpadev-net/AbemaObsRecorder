import sha256 from "crypto-js/sha256.js";
import Base64 from "crypto-js/enc-base64.js";

const hash = (
  { challenge, salt }: { challenge: string; salt: string },
  message: string
) => {
  const hash = Base64.stringify(sha256(message + salt));
  return Base64.stringify(sha256(hash + challenge));
};
export { hash };
