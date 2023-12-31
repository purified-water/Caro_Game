const User = require('../models/users.m');

module.exports = {
    getUserByToken: async (req, res) => {
        // console.log('Cookies in getUser: ', req.cookies);
        // console.log('\tBody in getUser: ', req.body);
        // LỖI Ở ĐÂY< KHÔNG TÌM THẤY ACCESS TOKEN
        const accessToken = req.body.accessToken;
        const userFromToken = await User.getUserByToken(accessToken);
        
        // console.log('User accessToken: ', userFromToken);
        if (userFromToken != null) {
            const username = userFromToken.username;
            const user = await User.getByUN(username);
            if (user != null) {
                const package = {
                    username: user.username,
                    maxAge: user.maxAge,
                };
                // if (user.permissions.includes("fullname")) {
                //     package.fullname = user.fullname
                // }
                // if (user.permissions.includes("username")) {
                //     package.username = user.username
                // }
                // if (user.permissions.includes("avatar")) {
                //     package.get_img_src = true;
                // }
                res.json(package);
            } else {
                res.json({});
            }
        } else {
            res.json({});
        }
    }
}