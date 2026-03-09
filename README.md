# Members Only

A small but fun full-stack app where users can join an exclusive clubhouse and post anonymously. Non-members can read posts but have no idea who wrote them, only members get to peek behind the curtain.

Built as part of [The Odin Project](https://www.theodinproject.com/) to practice authentication, sessions, and role-based access control.

---

## How It Works

There are three levels of access, each unlocking a little more:

- **Visitor** - can read all posts, but the author and timestamp are hidden. Sign up to do more.
- **Member** - enter the secret passcode after signing up to reveal who wrote what and when.
- **Admin** - has full visibility and can delete any post.

---

## Features

- Sign up with a confirmed password and log in securely
- Join the club by entering a secret passcode to unlock member privileges
- Create posts that appear anonymous to non-members
- Members can see the author and timestamp of every post
- Admin users can delete any message

---

## Built With

- **Node.js** & **Express** - server and routing
- **PostgreSQL** - database
- **Passport.js** & **express-session** - authentication and session management
- **bcryptjs** - password hashing
- **express-validator** - server-side form validation and sanitisation
- **EJS** - server-side templating