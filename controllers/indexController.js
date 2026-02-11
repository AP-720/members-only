const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

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

module.exports = {
	getIndex,
	postSendMessage,
};
