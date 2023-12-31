const userModel = require('../models/users.m');
const bcrypt = require('bcrypt');

module.exports = {
    logIn: async(req, res, next) => {
        try {
            // console.log("LOGIN", req);
            const query = await userModel.getByUN(req.body.username);
            const passwordInDB = query.password;
            // console.log('DB PW', passwordInDB);

            // So sánh password
            let match = bcrypt.compareSync(req.body.password, passwordInDB);

            if (match) {
                console.log('Dang nhap thanh cong');

                // gửi username tới request page
                res.redirect(`/request?username=${req.body.username}&fullname=${query.fullname}`);
            } else {
                console.log('Dang nhap that bai');
                alert('Dang nhap that bai');
                res.redirect('/'); //Quay lai trang log in
            }
            
            
            // console.log(req.user);
            // console.log("PASSWORD", req.session.pw);
            // console.log("USNAME", req.session.un);
           
            
        } catch (error) {
            next(error);
        }
    }
}