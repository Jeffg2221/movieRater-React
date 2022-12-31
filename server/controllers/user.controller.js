const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
// import the model to make queris to the DB
const User = require("../models/user.model")

//Register
module.exports.register = (requestObj, responseObj) => {
    User.find({ email: requestObj.body.email })
        .then(usersWithEmail => {
            console.log("response when finding user", usersWithEmail)
            if (usersWithEmail.length === 0) {
                User.create(requestObj.body)
                    .then(user => {
                        const userToken = jwt.sign({
                            id: user._id,
                            firstName: user.firstName
                        }, process.env.SECRET_KEY);
                        responseObj.cookie("usertoken", userToken, process.env.SECRET_KEY, {
                            httpOnly: true
                        })
                            .json({ msg: "success!", user: user });
                    })
                    .catch(err => {
                        console.log("Server Error")
                        responseObj.status(400).json(err)
                    })
            } else {
                //else --> the email is already taken so we will send back an error message
                responseObj.json({ errors: { email: { message: "Email is taken!" } } })
            }
        })
    // .catch(err => {
    //     console.log("Server Error")
    //     responseObj.status(400).json(err)
    // });

}


//Login

module.exports.login = async (requestObj, responseObj) => {
    const user = await User.findOne({ email: requestObj.body.email }); //see if the user exists in db

    if (user === null) {
        // email not found in users collection
        return responseObj.status(400).json({ error: "User not found. Who YOU?!" })
    }
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(requestObj.body.password, user.password);
    if (!correctPassword) {
        // password wasn't a match!
        return responseObj.status(400).json({ error: "Password is incorrect!" })
    }
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id,
        firstName: user.firstName
    }, process.env.SECRET_KEY);
    // note that the response object allows chained calls to cookie and json
    responseObj
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: "success!" });
        }



//Get logged in user
module.exports.getLoggedInUser = (requestObj, responseObj) => {

    const decodedJWT = jwt.decode(requestObj.cookies.usertoken, { complete: true })
    // decodedJWT.payload.id
    User.findById({ _id: decodedJWT.payload.id })
        .then(foundUser => {
            responseObj.json({ results: foundUser })
        })
        .catch(err => {
            responseObj.json(err)
        })
}

//Logout

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.findOneUser = (requestObj, responseObj) => {
    User.findById(requestObj.params.id)
        .then(oneUser => {
            responseObj.json(oneUser)
        })
        .catch(err => {
            console.log("Server Error")
            responseObj.json(err)
        });
}

module.exports.findAllUsers = (requestObj, responseObj) => {
    User.find()
        .then((allDaUsers) => {
            responseObj.json(allDaUsers)
        })
        .catch(err => {
            console.log("Server Error")
            responseObj.json(err)
        });
}


//Update 
module.exports.updateUser = (requestObj, responseObj) => {
    User.findByIdAndUpdate(
        requestObj.params.id,
        requestObj.body,
        { new: true, runValidators: true })
        .then(updatedUser => {
            responseObj.json(updatedUser)
        })
        .catch(err => {
            console.log("Server Error")
            responseObj.json(err)
        });
}