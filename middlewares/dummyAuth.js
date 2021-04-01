var dummyUsers = [
    {
        "firstName" : "John",
        "lastName" : "Doe",
        "email" : "John.Doe@gmail.com",
        "password" : "s3cr3tp4sswo4rd"
    },
    {
        "firstName" : "Joe",
        "lastName" : "Dow",
        "email" : "Joe.Dow@gmail.com",
        "password" : "secretpassword"
    }
]

dummyUserAuthentication = (req, res, next) => {
    const user = []
    dummyUsers.forEach((x) => {
        if (x.email == req.body.email) {
            user.push(x)
        }
    })

    if (!user[0]) {
        res.status(404).send('user not found!');
        console.log('* user not found!')
    } else if (req.session.isAuthenticated) {
        console.log('* User already signed in');
        return next();
    } else {
        let passwordField = user[0].password;
        let reqPassword =  req.body.password
        if (reqPassword === passwordField) {    
            var session = req.session;
            session.isAuthenticated = true;
            session.user = {
                username: user[0].firstName + user[0].lastName,
                userEmail: user[0].email
            };
            session.freqSearchedcWords = {}; 
            // redis.getAllActiveSessions().then((sessions) => {
            //     console.log(sessions);
            // });
            return next();
        } else {
            return res.status(400).send({errors: ['Invalid email or password']});
        }
    }

};

requireAuthentication =  (req, res, next) => {
    if (req.session.isAuthenticated) {
      next();
    }else {
        console.log("* User Unauthenticated")
        res.status(404).send("Unauthenticated!");
    }
};

dummyUserSessionDel = (req, res, next) => {
    req.session.destroy(function(){
        console.log("* User logged out.")
     });
     return next();
}

exports.dummyUserAuthentication = dummyUserAuthentication;
exports.requireAuthentication = requireAuthentication;
exports.dummyUserSessionDel = dummyUserSessionDel;
