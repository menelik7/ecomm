const usersRepo = require("../../repositories/users");

app.get("/signup", (req, res) => {
	res.send(`
		<div>
			Your id is: ${req.session.userId}
			<form method="POST">
				<input name="email" placeholder="email" />
				<input name="password" placeholder="password" />
				<input name="passwordConfirmation" placeholder="password confirmation" />
				<button>Sign Up</button>
			</form>
		</div>
	`);
});

app.post("/signup", async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;

	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send("Email in use");
	}

	if (password != passwordConfirmation) {
		res.send("Passwords must match!");
	}

	// Create a user
	const user = await usersRepo.create({ email, password });

	// Store the id of that user inside the user's cookie
	req.session.userId = user.id;

	res.send(`Account created for "${email}"`);
});

app.get("/signout", (req, res) => {
	req.session = null;
	res.send("You are now logged out!");
});

app.get("/signin", (req, res) => {
	res.send(`
		<div>
			<form method="POST">
				<input name="email" placeholder="email" />
				<input name="password" placeholder="password" />
				<button>Sign In</button>
			</form>
		</div>
	`);
});

app.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });
	if (!user) {
		return res.send("No exisiting user with that email");
	}

	const validPassword = await usersRepo.comparePasswords(
		user.password,
		password
	);
	if (!validPassword) {
		return res.send("Invalid password!");
	}

	req.session.userId = user.id;
	res.send("You are signed in!");
});
