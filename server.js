const app = require('./app');
// const config = require('./utils/config');
// const logger = require('./utils/logger');

// const PORT = config.PORT || 3001;
// app.listen(PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`);
// });
module.exports = async (req, res) => {
  // If you need to do any custom logic based on the request before passing it to Express,
  // you can do it here
  
  // Pass the request to the Express app
  await app(req, res);
};
