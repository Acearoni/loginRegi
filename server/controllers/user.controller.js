const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
console.log(secretKey)

//.then and .catch are promises, they are asyncronis code. Or you can do tryC
module.exports = {
    registerUser: async (req, res) => {
        try {
            //check if user already exists
            const potentialUser = await User.findOne({ email: req.body.email })
            if (potentialUser) {
                res.status(500).json({ message: 'This email already exists, please log in.' })
            }
            else {
                const newUser = await User.create(req.body) //all the form information
                const userToken = jwt.sign({ id: newUser._id, email: newUser.email }, secretKey, { expiresIn: '2h' })
                console.log(jwt.decode(userToken, { complete: true }))
                console.log(userToken)
                res.status(201).cookie('userToken', userToken, { httpOnly: true, sameSite: 'None', secure: true }).json(newUser)
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
    },
    loginUser: async(req, res) => {
        try {
            //Check if email exists in the DB, if it does, check if the password hash matches, all done within Bcrypt.
            const potentialUser = await User.findOne({ email: req.body.email })
            if(potentialUser){
                //if it does, check if the password hash matches, all done within Bcrypt.
                const passwordsMatch = await bcrypt.compare(req.body.password, potentialUser.password)
                if(passwordsMatch) {
                    const userToken = jwt.sign({ id: potentialUser._id, email: potentialUser.email }, secretKey, { expiresIn: '2h' })
                    res.status(201).cookie('userToken', userToken, { httpOnly: true, sameSite: 'None', secure:true }).json(potentialUser)
                } else {
                    res.status(500).json({message: 'Invalid Email or Password'}) //be vague for login messages for hacking purposes. You don't want someone to know that you got the password OR the email correct.
                }
            } else {
                res.status(500).json({message: 'Invalid Email or Password'})
            }
        }
        catch(err) {
            res.status(500).json({error: err})
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message: 'User logged out successfully'})
    }
}


// Could also do
// module.exports = {
//     registerUser: async (req, res) => {
//         User.findOne({email:req.body.email})
//             .then((thatUser) => {
//                 res.json(thatUser)
//             })
//     }
// }

//thatUser is just "potentialUser"