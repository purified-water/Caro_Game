// const tbName = 'Users';
module.exports = {
    // constructor(un, pw){
    //     this.Username = un;
    //     this.Password = pw;
    // }
    getUsersCount: async function() {
        try {
            const query = await db.one(`select count(*) from public."Users"`);
            const rs = parseInt(query.count, 10);
            if (isNaN(rs)) {
                return 0;
            }
            return rs;
        } catch (error) {
            console.log(error);
        }


    },

    add: async function(un, pw, name, em, dob, per) {
        try {
            const newID = await this.getUsersCount() + 1;
            console.log('ID NEW', newID);
            const rs = await db.none(`INSERT INTO public."Users" ("ID", "Username", "Password", "Name", "Email", "DOB", "Permission") 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,[newID, un, pw, name, em, dob, per]);
            
        } catch (error) {
            console.log(error);
        }
        
    },

    getByMail: async function(mail) {
        try {
            const rs = await db.one(`SELECT * FROM public."Users" WHERE "Email" = $1`, [mail]);
            return rs;
        } catch (error) {
            console.log(error);
        }
      
    },
    getByID: async function(id) {
        try {
            const rs = await db.query(`SELECT * FROM public."Users" WHERE "id" = $1`, [id]);
            return rs;
        } catch (error) {
            console.log(error);
        }
      
    },
    getByUN: async function(un) {
        try {
            const rs = await db.query(`SELECT * FROM public."Users" WHERE "Username" = $1`, [un]);
            if (rs.length > 0) {
                const firstEntry = rs[0];
                return firstEntry;
            }
            return rs;
        } catch (error) {
            console.log(error);
        }
      
    }
}