const bcrypt = require('bcrypt');

async function generateHash() {
    const password = "pw";
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hash);
}

generateHash();
