require("dotenv").config(); 
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db");
const authRoutes  = require("./routes/authRoutes");

dotenv.config();    
const app=express()
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())


app.use(
    session({
      key: "userId", // Name of the session ID cookie
      secret: process.env.SESSION_SECRET || 'supersecret', // Secret key for signing the session ID
      resave: false, // Prevents session being saved if nothing has changed
      saveUninitialized: false, // Don’t create session until something is stored
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // Protect against XSS (JavaScript cannot access cookies)
        secure: false, // Set true if using HTTPS
      },
    })
  );

  app.get("/", (req, res) => {
    res.send("Auth Backend is running!");
  });
app.use("/api/auth",authRoutes)
 const PORT= process.env.PORT || 5000
  app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
  })