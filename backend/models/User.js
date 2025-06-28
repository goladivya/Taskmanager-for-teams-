const {db} = require("../firebase/firebaseAdmin");




const createUser = async (username, password, role) => {
  await db.collection("users").add({
    username: username.toLowerCase(),
    password: password,
    role: role,
  });
};

const getUser = async (username) => {
  const snapshot = await db.collection("users").where("username", "==", username).get();
  if (snapshot.empty) return null;

  const userDoc = snapshot.docs[0].data();
   

  return {
    username: userDoc.username,
    password: userDoc.password,
    role: userDoc.role,
  };

  
};

module.exports = { createUser, getUser };
