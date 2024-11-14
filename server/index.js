const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
require('dotenv').config()
const app = express()
const port =process.env.PORT || 3000
app.use(express.json())
app.use(cors())
const crypto = require('crypto');


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB}:${process.env.password}@cluster0.hwuf8vx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function run() {
    try {
  
  
  
      const database = client.db('VeryfiUserDB')
      const usersCollection = database.collection("users");
  





      // mailer

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "saef.ratul@gmail.com",
          pass: "xnou oveh ebyq bskt",
        },
      });
  
      app.post('/api/v1/register', async (req, res) => {
        const { name, email, password } = req.body
        const existing = await usersCollection.findOne({ email: email })
        if (existing) {
          return res.status(401).send({ message: 'user exist' });
        }
  

         const otp= crypto.randomInt(100000, 1000000).toString();
         const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        //  password hash
        const hashPassword = await bcrypt.hash(password, 10)
        const user = {
          name: name,
          email: email,
          password: hashPassword,
          role: 'user',
          otp:otp,
          otpExpiresAt:otpExpiresAt,
          isVerified: false
        }
      

        const mailOptions = {
          from: "admin@gmail.com",
          to: email,
          subject: "Send Otp",
          text: otp,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", info.response);
          }
        });

        await usersCollection.insertOne(user);
        console.log(user);
        res.status(200).send({
          status: true
        })
      })
  
  
      app.post("/api/v1/login", async (req, res) => {
      try {
        const { email, password } = req.body;
  
        const user = await usersCollection.findOne({ email: email });
  
        if (!user) {
          return res.status(401).send({ message: "Invalid email" });
        }
        if (user.isVerified===false) {
          return res.status(401).send({ message: "Invalid User" });
        }
  
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
          return res.status(401).send({ message: "Invalid password" });
        }
        const token = jwt.sign(
          { id: user._id, role: user.role, name: user.name, email: user.email},
          process.env.SecretToken,
          { expiresIn: '100d' }
        );
  
        res.send({ status: true, token });
      } catch (error) {
        res.send(error)
      }
      });
 

      //verify api
      app.post('/api/v1/verify-otp',async(req,res)=>{
        try {
          const { email, otp } = req.body;


          const user = await usersCollection.findOne({ email });
          if (!user) {
            return res.status(400).send({ message: 'User not found' });
          }

          if (user.otp && user.otpExpiresAt > Date.now()) {
            await usersCollection.updateOne(  { email },

              {$set:{ isVerified: true},$unset: { otp: "", otpExpiresAt: "" }}
            )
            return res.status(200).send({ message: 'User verified successfully' });
          }else {
            return res.status(400).send({ message: 'Invalid or expired OTP' });
          }
        } catch (error) {
          console.log(error);
          res.send('Server Internal Server')
        }
      })
  

      // next logic
  
   
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Server Running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})