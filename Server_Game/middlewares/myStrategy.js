const passport = require("passport");
const { Strategy } = require("passport-strategy");
const User = require("../models/users.m");

module.exports = class CustomStrategy extends Strategy {
    constructor(verify, options) {
        super();
        this.name = "my-strategy";
        this.verify = verify;
        passport.strategies[this.name] = this; // Register the strategy with  Passport;

        this.accessTokenField =
            options && options.accessToken ? options.accessToken : "accessToken";
    }

    async authenticate(req, options) {
        // Implement the authentication logic here
        let username = '';
        // Check if accessToken is in cookies
        if (req.query.hasOwnProperty(this.accessTokenField)) {
            console.log('\tMy strategy query: ', req.query);

            // console.log('query mystrat: ', req.query);
            // console.log('this.accessTokenField: ', this.accessTokenField);
            const accessToken = req.query[this.accessTokenField];
            console.log('access token: ', accessToken);
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            // Verify accessToken by getting user from auth server
            const response = await fetch(`https://localhost:3003/get-user-by-accessToken`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken }),
            });


            if (!response.ok) {
                throw new Error("Error in getting user by accessToken!");
            }
            // console.log('Authenticate ok mystrat', response);
            const data = await response.json();
            console.log('\t in stratData from response: ', data);
            if (data) {
                username = data.username;

                // Insert or update user to database
                await User.insertOrUpdatePlayer(data);
                await User.insertPlayerToOnlineList(data);

                const maxAge = parseInt(data.maxAge);
                req.session.cookie._expires = new Date(Date.now() + maxAge);
                req.session.cookie.originalMaxAge = maxAge;
            }
        }

        console.log('data from auth server: ', username);
        // Call this.success(user, info) if authentication is successful
        // Call this.fail(info) if authentication fails
        this.verify(username, (err, result) => {
            if (err) {
                console.log('Error in authenticating: ', err);
                this.fail(`Error in authenticating ${err}`);
            }
            if (!result) {
                console.log('eror in authenticating: ', result);
                this.fail(`Failed to authenticate:`);
            } else {
                this.success(result, "Verify successfully!");
            }
        });
    }
};
