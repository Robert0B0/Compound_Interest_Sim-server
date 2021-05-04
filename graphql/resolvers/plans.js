const { UserInputError } = require("apollo-server-errors");
const Plan = require("../../models/Plan");
const { validatePlanInput } = require("../../util/validators");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		async getPlans() {
			try {
				const plans = await Plan.find().sort({ createdAt: -1 });
				return plans;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getPlan(_, { planId }) {
			try {
				const plan = await Plan.findById(planId);
				if (plan) {
					return plan;
				} else throw new Error("Plan not found");
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createPlan(
			_,
			{
				initial_Investment,
				interest_rate,
				years_length,
				cash_rate,
				monthly_contribution,
			},
			context
		) {
			const user = checkAuth(context);

			const { valid, errors } = validatePlanInput(
				initial_Investment,
				interest_rate,
				years_length,
				cash_rate,
				monthly_contribution
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const newPlan = new Plan({
				username: user.username,
				user: user.indexOf,
				createdAt: new Date().toISOString(),
				initial_Investment,
				interest_rate,
				years_length,
				cash_rate,
				monthly_contribution,
			});

			const plan = await newPlan.save();
			return plan;
		},

		async modifyPlan(
			_,
			{
				planId,
				initial_Investment,
				interest_rate,
				years_length,
				cash_rate,
				monthly_contribution,
			}
		) {
			const plan = await Plan.findById(planId);

			const { valid, errors } = validatePlanInput(
				initial_Investment,
				interest_rate,
				years_length,
				cash_rate,
				monthly_contribution
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			plan({
				initial_Investment,
				interest_rate,
				years_length,
				cash_rate,
				monthly_contribution,
			});

			plan.save();
			return plan;
		},

		async deletePlan(_, { planId }, context) {
			const user = checkAuth(context);
			try {
				const plan = await Plan.findById(planId);
				if (user.username === plan.username) {
					await plan.delete();
					return "Plan deleted.";
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
