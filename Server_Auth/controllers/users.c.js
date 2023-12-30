const accM = require('../models/acc.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    add: async (req,res,next) => {
        try {
            const un = req.body.un;
            const pw = req.body.pw;
            const pwHashed = await bcrypt.hash(pw,saltRounds);
            const rs = await accM.add(new accM(un,pwHashed));
            // const rs = await accM.add(new accM(un,pw))
            console.log(rs);
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const un = req.body.un;
            const pw = rep.body.pw;
            const rs = await accM.get(un); //Phải lấy ra để compare password //THIẾU HÀM GET
            let auth = false;
            if (rs) {
                auth = await bcrypt.compare(pw, rs.Password);
            }
            console.log(rs);
            if (auth) {
                res.redirect('/');

            } else {
                //TO DO : THEM xac thuc
            }
        } catch (error){
            next(error);
        }
    }
}