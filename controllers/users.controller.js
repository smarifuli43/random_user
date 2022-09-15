const { getUserData, saveUserData } = require('../utils/userData');

module.exports.home = (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'This is home. api connected',
  });
};


// get random user data
module.exports.getRandomUser = (req, res) => {
  const existUsers = getUserData();

  const randomIndex = Math.floor(Math.random() * existUsers.length);

  const data = existUsers[randomIndex];
  console.log(data)

  res.status(200).send({
    success: true,
    message: 'User data added successfully',
    // data,
  });
};

module.exports.getAllUsers = (req, res) => {
  res.send('all users');
};

// Save a random user
module.exports.saveRandomUser = (req, res) => {
  const existUsers = getUserData();
  const userData = req.body;

  const { id, gender, name, contact, address, photoUrl } = userData;

  if (
    id == null ||
    gender == null ||
    name == null ||
    contact == null ||
    address == null ||
    photoUrl == null
  ) {
    return res.status(401).send({ error: true, message: 'User data missing' });
  }

  const isExist = existUsers.find((user) => user.id == id);

  if (isExist) {
    return res.status(409).send({ error: true, message: 'user already exist' });
  }

  existUsers.push(userData);
  saveUserData(existUsers);

  res
    .status(200)
    .send({ success: true, message: 'User data added successfully' });
};

module.exports.updateUser = (req, res) => {
  res.send('updated');
};
module.exports.bulkUpdate = (req, res) => {
  res.send('bulk updated');
};

module.exports.deleteUser = (req, res) => {
  res.send('deleted');
};