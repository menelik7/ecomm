const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Parse incoming POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send(`
		<div>
			<form method="POST">
				<input name="email" placeholder="email" />
				<input name="password" placeholder="password" />
				<input name="passwordConfirmation" placeholder="password confirmation" />
				<button>Sign Up</button>
			</form>
		</div>
	`);
});

app.post("/", (req, res) => {
	console.log(req.body);
	const { email } = req.body;
	res.send(`Account created for "${email}"`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
