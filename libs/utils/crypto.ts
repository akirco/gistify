import CryptoJS from 'crypto-js';

const secret =
  process.env['CRYPTOJS_SECRET'] ||
  '+j3VOfica1udPQOCWrUxe3z7owWdybIzoWvD5JBFmVQ=';

export function Encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, secret).toString();
}
export function Decrypt(text: string) {
  return CryptoJS.AES.decrypt(text, secret).toString(CryptoJS.enc.Utf8);
}
