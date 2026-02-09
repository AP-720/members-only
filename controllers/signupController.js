const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateSignup = [
	body("firstName")
		.trim()
		.notEmpty()
		.isAlpha()
		.withMessage(`First name is required, must only contain letters.`),
	body("lastName")
		.trim()
		.notEmpty()
		.isAlpha()
		.withMessage(`Last name is required, must only contain letters.`),
	body("username")
		.trim()
		.notEmpty()
		.withMessage(`Email is required.`)
		.isEmail()
		.withMessage(`Must be valid e-mail address.`),
	body("password")
		.trim()
		.notEmpty()
		.withMessage(`Password required.`)
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
		.withMessage(
			`Password must contain at least 8 characters. Including a minium of one lower case letter, one upper case letter, one number and one symbol.`,
		),
	body("confirmPassword")
		.trim()
		.notEmpty()
		.withMessage(`Confirm password required.`)
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage("Passwords do not match. Re-enter and try again."),
];

async function getSignup(req, res) {
	res.render("signup", { title: "Sign up" });
}

const postSignup = [
	validateSignup,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render("signup", { title: "Sign up", errors: errors.array() });
		}

		console.log(req.body);
		res.redirect("/");
	},
];

module.exports = {
	getSignup,
	postSignup,
};
