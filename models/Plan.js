const { model, Schema } = require("mongoose");

const planSchema = new Schema({
	username: String,
	createdAt: String,
	initial_Investment: Number,
	years_length: Number,
	interest_rate: Number,
	cash_rate: Number,
	monthly_contribution: Number,
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = model("Plan", planSchema);
