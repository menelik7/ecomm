const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const productsRouter = require("./routes/admin/products");

const app = express();

app.use(express.static("public"));

// Parse incoming POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["nj3n2jniduhsuic897789hcs"],
	})
);

app.use(authRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
