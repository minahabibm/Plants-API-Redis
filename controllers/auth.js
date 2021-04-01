exports.authLogin = async (req, res) => {
    try {
        res.status(200).send("Hello " + req.session.user.username + ", now you can search through the plant Kingdoms!" )
        console.log("* POST Request @ /login")
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}

exports.authLogout = async (req, res) => {
    try {
        res.status(200).send('User logged out.')
        console.log("* GET Request @ /logout")
    } catch(err) {
        res.status(500).send({message: err.message});
    }
}