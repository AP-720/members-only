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

module.exports = {
    postSignUp,
}