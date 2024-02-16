const bcrypt = require('bcryptjs');

const encrypt = async (textplain) =>{
    const hash = await bcrypt.hash(textplain,10);
    return hash
}

const compare = async(passwordplain, passwordhash) =>{
    return await bcrypt.compare(passwordplain, passwordhash)
}


module.exports = {encrypt, compare}