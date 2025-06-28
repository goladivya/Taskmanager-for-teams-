const admin = require("firebase-admin");
const serviceAccount = require("./todo-5b400-firebase-adminsdk-fbsvc-1c917c5a91.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


module.exports = {db};