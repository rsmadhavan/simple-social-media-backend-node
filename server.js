const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./db');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
require('dotenv').config();
connectDB();

app.use(express.json());
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api',postRouter);
app.use('/api',commentRouter);



app.listen(PORT,()=>{
  console.log(`Server started on part ${PORT}`);
});

module.exports = app;