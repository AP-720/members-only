require("dotenv").config();
const express = require("express");
const path = require("node:path");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");

const pool = require("./db/pool");
const PgSession = require("connect-pg-simple")(session);

// Routers

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");

const app = express();
const PORT = 3000;

// Static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session store
const sessionStore = new PgSession({
	pool,
});

// Middleware
app.use(
	session({
		store: sessionStore,
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
		},
	}),
);
app.use(express.urlencoded({ extended: false }));
app.use(passport.session());

app.use((req, res, next) => {
	console.log(req.session);
	console.log(req.user);
	next();
});

// currentUser Middleware

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);

app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(`Listening on port:${PORT}`);
});
