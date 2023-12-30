const fs = require('fs');
const path = require('path');


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

    }
}