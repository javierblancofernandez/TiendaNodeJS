const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users');

const expiresIn = 60 * 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { user: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn }
      );
      console.log(token);
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        res.status(200).send({ status: 'ok', data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: 'invalid password', message: '' });
      }
    } else {
      res.status(401).send({ status: 'user not found', message: '' });
    }
  } catch (e) {
    res.status(500).send({ status: 'error', message: e.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, data } = req.body;
    const hash = await bcrypt.hash(password, 15);

    // await Users.create({
    //   username,
    //   email,
    //   password: hash,
    //   data
    // });

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;

    await user.save();

    console.log('hash', hash);

    res.status(200).send({ status: 'ok', message: 'user created' });
  } catch (error) {
    if (error.code && error.code === 1100) {
      res
        .status(400)
        .send({ status: 'Duplicado valor', message: error.keyValue });
      return;
    }
    console.log('error:', error);
    res
      .status(500)
      .send({ status: 'Duplicado valor', message: error.keyValue });
  }
};
const deleteUser = async (req, res) => {
  try {
    console.log('req.sessionData :', req.sessionData.userId);
    const { username, email, data, userId } = req.body;
    const user = await Users.findById(userId);

    await Users.findByIdAndRemove(userId);
    res.status(200).send({
      status: 'ok',
      message: `user deleted ${user.username} ${user.email}`
    });
  } catch (error) {
    if (error.code && error.code === 1100) {
      res
        .status(400)
        .send({ status: 'no encontrado', message: error.keyValue });
      return;
    }
    res
      .status(500)
      .send({ status: 'no encontrado user', message: error.keyValue });
  }
};

const getUser = async (req, res) => {
  const usuarios = await Users.find();
  res.status(200).send({usuarios});
  console.log(req);
};

const updateUser = async (req, res) => {
  try {
    console.log('req.sessionData :', req.sessionData.userId);
    const { username, email, data } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userId, {
      username
    });
    res.status(200).send({ status: 'ok', message: 'user actualizado' });
  } catch (error) {
    if (error.code && error.code === 1100) {
      res
        .status(400)
        .send({ status: 'Duplicado valor', message: error.keyValue });
      return;
    }
    res
      .status(500)
      .send({ status: 'Duplicado valor', message: error.keyValue });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  login
};
