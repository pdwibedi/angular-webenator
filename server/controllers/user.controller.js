var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');

module.exports.login = function (req, res) {
    var user = req.body;
    var userFile = path.join(getUserStore(), user.username, 'data.json'); // get user file

    if (!fs.existsSync(userFile)) {
        res.status(400).send('Invalid username/password');
    }

    var obj = JSON.parse(fs.readFileSync(userFile)); // create user object from file

    if (obj.profile.password !== user.password) {
        res.status(400).send('Invalid username/password');
    }

    res.json(user);
};

module.exports.register = function (req, res) {
    var user = req.body; //get user object from request
    var userStore = getUserStore();
    var newUserPath = path.join(userStore, user.username);

    if (fs.existsSync(newUserPath)) {
        res.status(400).send('User with ' + user.username + 'already exists.');
    }
    else {
        // get template data path
        var template = path.join(__dirname, '../data/user.json');
        var userFile = path.join(newUserPath, 'data.json');
        // create new data file for your from template
        fse.copySync(template, userFile);
        // update user credentials in json file
        var obj = JSON.parse(fs.readFileSync(userFile)); // create user object from file
        obj.profile = user;
        fs.writeFileSync(userFile, JSON.stringify(obj)); // update json object into file
        //delete user secure details
        delete user.username;
        delete user.password;
        res.json(user);
    }
};

function getUserStore() {
    return path.join(__dirname, '../../users');
}