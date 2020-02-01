/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');

const isValidHost = (req, res, next) => {
  const validHosts = ['devilgipsy', 'localhost'];
  if (validHosts.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'access denied' });
  }
  // const { token } = req.headers;
  // console.log('soy el token', token);
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      console.log('jwt data ', data);
      // if (data.user !== req.body.userId && data.role !== 'admin') {
      //   throw {
      //     code: 403,
      //     status: 'access denied',
      //     message: 'missing permision or invalid role'
      //   };
      // }
      req.sessionData = { userId: data.user};
      next();
    } else {
      // eslint-disable-next-line no-throw-literal
      throw { code: 403, status: 'access denied', message: 'no existe token' };
      // res
      //   .status(403)
      //   .send({ status: 'access denied', message: 'no existe token' });
    }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'error jal', message: e.message });
  }
};

module.exports = { isValidHost, isAuth };
