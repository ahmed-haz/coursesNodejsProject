const express = require('express');
var cors = require('cors')
require('dotenv').config()
const app = express();
const port = 3000;
app.use(express.json());
const mongoose = require('mongoose');
const coursesRouter = require('./routers/coursesRouters');
const userRouter = require('./routers/userRouter');
const path = require('path');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected successfully");
})

app.use('/api/courses', coursesRouter);
app.use('/api/users', userRouter);

// Handle 404 errors for undefined routes
// app.use( (req, res, next) => {
//     return res.status(404).json({Status: FAIL, data:null, msg: "Route not found", code : 404});
// })

app.use((err, req, res, next)=>{
  res.status(err.statusCode).json({status: err.statusText, data:null, message: err.message, code : err.statusCode});
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});