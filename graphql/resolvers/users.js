const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
	validateRegisterInput,
	validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SECRET_KEY,
		{ expiresIn: "2h" }
	);
}

module.exports = {
	Query: {
		async getUsers() {
			try {
				const users = await User.find().sort({ createdAt: -1 });
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({ username });
			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = "Wrong credentials";
				throw new UserInputError("Wrong credentials", { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},

		async register(
			_,
			{ registerInput: { username, password, confirmPassword } }
		) {
			const { errors, valid } = validateRegisterInput(
				username,
				password,
				confirmPassword
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			//user must be unique:
			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: "Username taken",
					},
				});
			}
			//hash password and create an auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
