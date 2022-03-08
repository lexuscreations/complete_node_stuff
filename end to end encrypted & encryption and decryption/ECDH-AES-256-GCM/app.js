const crypto = require('crypto');

const user1 = crypto.createECDH('secp256k1');
user1.generateKeys();

const user2 = crypto.createECDH('secp256k1');
user2.generateKeys();

const user1PublicKeyBase64 = user1.getPublicKey().toString('base64');
const user2PublicKeyBase64 = user2.getPublicKey().toString('base64');

const user1SharedKey = user1.computeSecret(user2PublicKeyBase64, 'base64', 'hex');
const user2SharedKey = user2.computeSecret(user1PublicKeyBase64, 'base64', 'hex');

console.log(user1SharedKey === user2SharedKey);
console.log('user1 shared Key: ', user1SharedKey);
console.log('user2 shared Key: ', user2SharedKey);

const MESSAGE = 'this is some random message...';

const IV = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(user1SharedKey, 'hex'), IV);

let encrypted = cipher.update(MESSAGE, 'utf8', 'hex');
encrypted += cipher.final('hex');

const auth_tag = cipher.getAuthTag().toString('hex');

console.table({
  IV: IV.toString('hex'),
  encrypted: encrypted,
  auth_tag: auth_tag
});

const payload = IV.toString('hex') + encrypted + auth_tag;

const payload64 = Buffer.from(payload, 'hex').toString('base64');
console.log(payload64);

//user2 will do from here
const user2_payload = Buffer.from(payload64, 'base64').toString('hex');

const user2_iv = user2_payload.substr(0, 32);
const user2_encrypted = user2_payload.substr(32, user2_payload.length - 32 - 32);
const user2_auth_tag = user2_payload.substr(user2_payload.length - 32, 32);

console.table({ user2_iv, user2_encrypted, user2_auth_tag });

try {
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(user2SharedKey, 'hex'), Buffer.from(user2_iv, 'hex'));

  decipher.setAuthTag(Buffer.from(user2_auth_tag, 'hex'));

  let decrypted = decipher.update(user2_encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  console.table({ DecyptedMessage: decrypted });
} catch (error) {
  console.log(error.message);
}
