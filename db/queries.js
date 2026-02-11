const pool = require("./pool");

async function postSignUp(firstName, lastName, username, hashedPassword) {
	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		await client.query(
			`INSERT INTO users (first_name, last_name, email, password)
             VALUES ($1,$2,$3,$4)`,
			[firstName, lastName, username, hashedPassword],
		);

		await client.query("COMMIT");
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("postSignUp:", err);
		throw err;
	} finally {
		client.release();
	}
}

async function postNewMessage(user_id, title, content) {
	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		await client.query(
			`
			INSERT INTO messages (user_id, title, content)
			VALUES ($1, $2, $3)
			`,
			[user_id, title, content],
		);

		await client.query("COMMIT");
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("postNewMessage:", err);
		throw err;
	} finally {
		await client.release();
	}
}

module.exports = {
	postSignUp,
	postNewMessage,
};
