const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registeruser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const sql = "insert into auth.users (username, password) VALUES (?, ?)";
    db.query(sql, [username, hash], (err, result) => {
      if (err)
        return res.status(500).json({ message: "error registering user" });

      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

const loginuser = (req,res) => {
    const {username,password}=req.body
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required"});
      }
   const sql='select password from auth.users where username=?'    
   db.query(sql,[username],(err,result)=>{
    if(err) return res.status(500).json({message: "Invalid username or password",err: err})
    
    bcrypt.compare(password,result[0].password,(err,isMatch)=>{
        if(err || !isMatch) return res.status(401).json({ message: "Invalid username or password" });

      const token = jwt.sign({ id: result.id }, "a4%7n^#9B!zDkP2w$X@QyM!t8Hj#R$4L", { expiresIn: "1h" });
      res.json({ message: "Login successful",token });
    })
   })
};

const logoutuser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  };

module.exports = { registeruser, loginuser, logoutuser };
