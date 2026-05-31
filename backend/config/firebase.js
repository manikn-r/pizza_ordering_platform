const admin = require("firebase-admin");
require("dotenv").config();
const firebaseConfig = require('../cred/serviceKey.json')

console.log("firebase connected");


// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore(); // If you are using Firestore
const auth = admin.auth();    // If you are verifying user tokens

module.exports = { admin, db, auth };