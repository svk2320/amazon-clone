const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../../models/user.mongo');

var JWT_SECRET = process.env.JWT_SECRET;

async function httpCreateNewUser(req, res){
    console.log(req.body);
    const { emailAddress, fullName, username, password: plainTextPassword } = req.body;

    if (!emailAddress || !fullName || !username || !plainTextPassword) {
        return res.status(400).json({
            error: 'Missing required property'
        });
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password'})
    }

    if (plainTextPassword.length < 5){
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 6 characters'
        })
    }

    console.log(emailAddress,
                fullName,
                username,
                plainTextPassword
            )

    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            emailAddress,
            fullName,
            username,
            password
        })
        console.log(`User created successfully: ${response}`)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'Username already exits'})
        }
        throw error;
    }
    res.send(req.body);
};


async function httpCheckUser(req, res){
    console.log(req.body);

    const { username, password } = req.body;
    const user = await User.findOne({username})

    if(!user) {
        console.log('Invaild username/password');
        return res.json({ status: 'error', error: 'Invaild username/password'})
    }

    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ 
                    id: user._id, 
                    username: user.username 
                }, JWT_SECRET)

        console.log('user login...')
        console.log(token)
                
        return res.json({ status: 'ok', token: token})
    }

    res.json({ status: 'error', error: 'Invalid username/password' });
};

async function httpUserDetails(req, res) {
    const { token, newPassword } = req.body;
    console.log(token)
    try{
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await User.updateOne(
            { _id },
            {
                $set: { password: hashedPassword }
            }
        )

        console.log('JWT decoded:', user)
        console.log(hashedPassword);
    } catch {
        res.json({status: 'error', error: 'error occured while verification...'})
    }

    res.json({ status: 'ok'})
};

module.exports = {
    httpCreateNewUser,
    httpCheckUser,
    httpUserDetails
}