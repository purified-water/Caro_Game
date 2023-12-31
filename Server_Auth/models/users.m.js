const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const usersFilePath = path.join(__dirname, '../db/users.json');

module.exports = {
    add: async (username, fullname, password, avatar) => {
        try {
            // Load existing users from the file
            const users = require(usersFilePath);
            console.log('User count: ', users.length);
            // Taoj id moi
            const id = users.length + 1;
            // Create a new user object
            const newUser = {
                id,
                username,
                fullname,
                password,
                avatar
            };

            // Add the new user to the array
            users.push(newUser);

            // Write the updated array back to the file
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getByUN: async function (un) {
        try {
            const users = require(usersFilePath);
            const rs = await users.find(user => user.username === un);
            return rs;
        } catch (error) {
            console.log(error);
        }

    },
    getUserByToken: async function(token) {
        try {
          const user = jwt.verify(token, process.env.SECRET_KEY);
          return user;
        } catch (err) {
          return null;
        }
      },
    update: async function (un, fullname, password) {
        try {
            const users = require(usersFilePath);
            const user = await users.find(user => user.username === un);
            // TO DO: THÊM CHECK TOKEN PERMISSION
            if (user) {
                user.username = un;
                user.fullname = fullname;
                user.password = password;
                fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

}