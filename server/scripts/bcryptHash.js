// generateHash.js
const bcrypt = require('bcryptjs');

const plainPassword = '123456';

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log('✅ Bcrypt hash:', hash);
});
