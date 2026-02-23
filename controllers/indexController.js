require("dotenv").config();
const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const { isAuth } = require("../routes/authMiddleware");

const validateMessage = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title can not be empty.")
		.isLength({ min: 1, max: 50 })
		.withMessage("Title must be between 1 and 50 characters long."),
	body("content")
		.trim()
		.notEmpty()
		.withMessage("Message content can not be empty.")
		.isLength({ min: 1, max: 255 })
		.withMessage("Title must be between 1 and 255 characters long."),
];

async function getIndex(req, res) {
	try {
		const messages = await db.getMessages();
		res.render("index", { title: "Members Only", messages });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
}

const postSendMessage = [
	validateMessage,
	isAuth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render("index", { title: "Members Only", errors: errors.array() });
		}

		const user_id = req.user.id;
		const { title, content } = matchedData(req);

		try {
			await db.postNewMessage(user_id, title, content);
			res.redirect("/");
		} catch (err) {
			console.error(err);
			res.status(500).send("Server error");
		}
	},
];

const getAdvancedSettings = [
	isAuth,
	async (req, res) => {
		res.render("advancedSettings", { title: "Members Only" });
	},
];

const postBecomeMember = [
	isAuth,
	async (req, res) => {
		const membership_code = req.body.membership_code.trim();

		const user_id = req.user.id;
		// Needed to make sure it matched the shape expected, rather than an array of strings. 
		const errors = [{ msg: "Incorrect code." }]

		try {
			if (process.env.MEMBERSHIP_CODE === membership_code) {
				await db.updateMembershipStatus(user_id);
				res.redirect("/");
			} else {
				res.render("advancedSettings", { title: "Members Only", errors });
			}
		} catch (err) {
			console.error(err);
			res.status(500).send("Server error");
		}
	},
];

module.exports = {
	getIndex,
	postSendMessage,
	getAdvancedSettings,
	postBecomeMember,
};
