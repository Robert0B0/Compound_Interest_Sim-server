const usersResolvers = require("./users");
const plansResolvers = require("./plans");

module.exports = {
	Query: {
		...usersResolvers.Query,
		...plansResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...plansResolvers.Mutation,
	},
};
