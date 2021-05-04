const { gql } = require("apollo-server");

module.exports = gql`
	type Plan {
		id: ID!
		username: String!
		createdAt: String!
		initial_Investment: Int!
		years_length: Int!
		interest_rate: Int!
		cash_rate: Int
		monthly_contribution: Int
	}
	type User {
		id: ID!
		username: String!
		password: String!
		token: String!
		createdAt: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
	}
	type Query {
		getPlans: [Plan]
		getPlan(planId: ID!): Plan
		getUsers: [User]
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createPlan(
			initial_Investment: Int!
			interest_rate: Int!
			years_length: Int!
			cash_rate: Int
			monthly_contribution: Int
		): Plan!
		modifyPlan(
			planId: ID!
			initial_Investment: Int!
			interest_rate: Int!
			years_length: Int!
			cash_rate: Int
			monthly_contribution: Int
		): Plan!
		getPlan(planId: ID!): Plan!
		deletePlan(planId: ID!): String!
	}
`;
