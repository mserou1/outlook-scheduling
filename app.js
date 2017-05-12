/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/*
 * This sample uses an open source OAuth 2.0 library that is compatible with the Azure AD v2.0 endpoint.
 * Microsoft does not provide fixes or direct support for this library.
 * Refer to the library’s repository to file issues or for other support.
 * For more information about auth libraries see: 
 * https://azure.microsoft.com/documentation/articles/active-directory-v2-libraries/
 * Library repo:  https://github.com/jaredhanson/passport
 */

'use strict';
// set up ======================================================================
const express = require('express');
const session = require('express-session');
const stack = require('./routes/stack');
const port = process.env.PORT || 3000;
const fs = require('fs');
const http = require('http');
const uuid = require('uuid');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const emailHelper = require('./utils/emailHelper.js');
const config = require('./utils/config.js');
const graph = require('msgraph-sdk-javascript');

const app = express();
const server = http.createServer(app);

// **IMPORTANT 
// Note that you will need to create a self-signed cert and use a secure server. 
// Below is an example after you have the key cert pair:
// const https = require('https');
// const certConfig = {
// 	key: fs.readFileSync('./utils/cert/server.key', 'utf8'),
// 	cert: fs.readFileSync('./utils/cert/server.crt', 'utf8')
// };
// const server = https.createServer(certConfig, app);

// authentication =================================================================
var callback = (iss, sub, profile, accessToken, refreshToken, done) => {
	done (null, {
		profile,
		accessToken,
		refreshToken
	})
};

passport.use(new OIDCStrategy(config.creds, callback));

const users = {};
passport.serializeUser((user, done) => {
    const id = uuid.v4();
    users[id] = user;
    done(null, id);
});
passport.deserializeUser((id, done) => {
    const user = users[id];
    done(null, user)
});

// configuration ===============================================================					
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(session({
	secret: 'sshhhhhh',
	name: 'graphNodeCookie',
	resave: false,
	saveUninitialized: false,
	cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());


// application =================================================================
app.get('/', stack.login);

app.get('/login',
	passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/');
});

app.get('/token', 
	passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), 
	(req, res) => { 
		res.render('emailSender', { user: req.user.profile});
});

app.post('/emailSender',
	ensureAuthenticated,
	(req, res) => {
		var client = graph.Client.init({
			defaultVersion: 'v1.0',
			debugLogging: true,
			authProvider: function (done) {
				done(null, req.user.accessToken);
			}
		});
		client.api('/me').select(["displayName", "userPrincipalName"]).get((err, me) => {
			if (err) {
				renderError(res, err);
				return;
			}
			const mailBody = emailHelper.generateMailBody(me.displayName, req.body.input_email);
			client.api('/users/me/sendMail').post(mailBody,(err, mail) => {
				if (err){
					renderError(res, err);
					return;
				}
				else
					console.log("Sent an email");
					res.render('emailSender', { user: req.user.profile, status: "success"});
			})
		});
});

app.get('/logout', (req, res) => {
  req.session.destroy( (err) => {
    req.logOut();
	res.clearCookie('graphNodeCookie');
	res.status(200);
	res.redirect('http://localhost:' + port);
  });
});

// listen (start app with node app.js) ======================================
server.listen(port);
console.log("Magic happens here: http://localhost:" + port);

function ensureAuthenticated (req, res, next) {
    if (req.isAuthenticated()) { return next(); }

    res.render('/login');
};

// error handling ===========================================================
function renderError (res, e) {
	res.render('error', {
		message: e.message,
		error: e
	});
	console.error(e);
};
