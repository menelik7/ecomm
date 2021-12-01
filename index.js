const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

// Parse incoming POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["nj3n2jniduhsuic897789hcs"],
	})
);

app.use(authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
