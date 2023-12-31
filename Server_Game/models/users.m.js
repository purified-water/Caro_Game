const path = require("path");
const onlineUsersPath = path.join(__dirname, "../db/onlineUsers.json");
const usersPath = path.join(__dirname, "../db/users.json");
const fs = require('fs');

module.exports = class User {
    constructor(user) {
        this.username = user.username;
        this.fullname = user?.fullname || "No display";
        this.avatar = user?.avatar || "";

    }

    static getEntity(user) {
        const entity = {
            username: user.username,
            fullname: user.fullname,
            avatar: user.avatar,
        };
        return entity;
    }

    static getPlayerInfos(username) {
        const users = require(onlineUsersPath);
        // console.log('Playerinfos: ', users);
        const data = users.find((user) =>user && user.username === username);
        if (data) {
            return new User(data);
        } else {
            return null;
        }
    }


    static async insertOrUpdatePlayer(username) {
        const users = require(onlineUsersPath);
        const data = users.find((user) => user && user.username === username);
        
        if (data) {
            await this.insertPlayer(data);
        } else {
            await this.insertPlayer(data);
        }
    }
    static async insertPlayer(entity) {
        const users = require(onlineUsersPath);
        users.push(entity);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    }
    static async updatePlayer(entity) {
        const users = require(onlineUsersPath);
        const index = users.findIndex((user) =>user && user.username === entity.username);
        users[index] = entity;
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    }

    static async insertPlayerToOnlineList(userI) {
        const users = require(onlineUsersPath);
        // console.log('Users from online list: ', users);
        
        // Find the user with the specified username
        const data = users.find((user) => user && user.username === userI.username);
    
        if (!data) {
            // User not found, push the new user
            users.push(userI);
            fs.writeFileSync(onlineUsersPath, JSON.stringify(users, null, 2));
            console.log('User added to online list:', userI);
        } else {
            console.log('User with the same username already exists in the online list:', userI);
            // You may want to handle this case according to your requirements
        }
    }

    // static async removePlayerFromOnlineList(username) {
    //     await db.removePlayerFromOnlineList(username);
    // }

    // static getPlayerOnlineList() {
    //     return db.getPlayerOnlineList();
    // }

    // static async clearUserOnlineList() {
    //     return await db.clearUserOnlineList();
    // }
};
