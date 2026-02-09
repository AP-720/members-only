require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");

const PORT = 3000;

// Static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);

app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(`Listening on port:${PORT}`);
});
