const express = require('express')
const cors = require("cors");
const router = require('./routes/users.route');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/user', router );

app.get('/', (req, res) => {
  res.send('Random user generator api ')
})
app.all("*", (req, res) => { 
res.send("404 Not Found");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})