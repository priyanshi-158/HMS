const express = require('express')
const connectDB = require('./utils/conn')
const cors = require('cors')
const path=require('path')

const app = express()
const port = 3000

connectDB();


app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/warden', require('./routes/wardenRoutes'));
app.use('/api/complaint', require('./routes/complaintRoutes'));
app.use('/api/invoice', require('./routes/invoiceRoutes'));
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/request', require('./routes/requestRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/suggestion', require('./routes/suggestionRoutes'));
app.use('/api/hostel',require('./routes/hostelRoutes'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://hostel-management-front.vercel.app");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Set-Cookie", "name=value; SameSite=None; Secure");
  res.send('<h1>HOMEPAGE</h1>');
});