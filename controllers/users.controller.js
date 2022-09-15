const { getUserData, saveUserData } = require('../utils/userData');

// get random user data
module.exports.getRandomUser = (req, res) => {
  const existUsers = getUserData();

  const randomIndex = Math.floor(Math.random() * existUsers.length);

  const randomUser = existUsers[randomIndex];

  res.status(200).send({
    success: true,
    randomUser,
  });
};

// get all user data
module.exports.getAllUsers = (req, res) => {
  const existUsers = getUserData();

  res.status(200).send({
    success: true,
    existUsers,
  });
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

// user data update
module.exports.updateUser = (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  const existUsers = getUserData();

  const isExist = existUsers.find((user) => user.id == id);
  if (!isExist) {
    return res.status(409).send({ error: true, message: 'User not exist' });
  }

  const updateUser = existUsers.find((user) => user.id == id);

  userData.gender ? (updateUser.gender = userData.gender) : '';
  userData.name ? (updateUser.name = userData.name) : '';
  userData.contact ? (updateUser.contact = userData.contact) : '';
  userData.address ? (updateUser.address = userData.address) : '';
  userData.photoUrl ? (updateUser.photoUrl = userData.photoUrl) : '';
  saveUserData(existUsers);

  res
    .status(200)
    .send({ success: true, message: 'User data updated successfully' });
};

// update multiple user
module.exports.bulkUpdate = (req, res) => {
  const userData = req.body;
  const existUsers = getUserData();

  if (userData.length < 2) {
    return res
      .status(404)
      .send({ error: true, message: 'Please provide multiple user data' });
  }

  userData?.map((data) => {
    const updateUser = existUsers.find((user) => user.id == data.id);
    data.gender ? (updateUser.gender = data.gender) : '';
    data.name ? (updateUser.name = data.name) : '';
    data.contact ? (updateUser.contact = data.contact) : '';
    data.address ? (updateUser.address = data.address) : '';
    data.photoUrl ? (updateUser.photoUrl = data.photoUrl) : '';
  });

  saveUserData(existUsers);

  res.status(200).send({
    success: true,
    message: 'Multiple user data updated successfully',
  });
};

// delete a user
module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const existUsers = getUserData();

  const isExist = existUsers.find((user) => user.id == id);
  if (!isExist) {
    return res.status(409).send({ error: true, message: 'User not exist' });
  }

  const filterUser = existUsers.filter((user) => user.id != id);
  saveUserData(filterUser);

  res.status(200).send({ success: true, message: 'User removed successfully' });
};
