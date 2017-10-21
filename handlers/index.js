const bcrypt = require('bcrypt');

module.exports = {
  passwordHash: password => bcrypt.hash(password, 11),
  passwordCompare: (password, hash) => bcrypt.compare(password, hash)
}
