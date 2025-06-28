const { createUser, getUser } = require("../models/User.js");
const {db} = require("../firebase/firebaseAdmin");


const signup = async (req, res) => {
  let { username, password, role } = req.body;
  username = username.toLowerCase();
  const existingUser = await getUser(username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  await createUser(username, password, role);
  res.status(201).json({ message: "Signup successful" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  
  const user = await getUser(username);
  console.log("Fetched User: ", user);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

res.status(200).json({ username: user.username, role: user.role });
};

const getAllOfficers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").where("role", "==", "officer").get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No officers found" });
    }

    const officers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(officers);
  } catch (err) {
    console.error("Error fetching officers:", err);
    res.status(500).json({ error: "Failed to fetch officers" });
  }
};


const resetpassword = async(req,res)=>{
  const {username, newPassword} = req.body;
  try{
    const snapshot = await db.collection("users").where("username","==",username.toLowerCase()).get();
    if(snapshot.empty){
      return res.status(404).json({error:"User not found"});
    }
    const userRef = snapshot.docs[0].ref;
    await userRef.update({password:newPassword});

    res.status(200).json({message:"Password updated successfully"})
  }catch(err){
    console.error("Error ressetting password:",err);
    res.status(500).json({error:"Failed to reset password"})
  }

};

module.exports = { signup, login ,getAllOfficers,resetpassword};
