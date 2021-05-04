const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	persistedQueries: true,
	introspection: true,
	context: ({ req }) => ({ req }),
});

mongoose
	.connect(MONGODB, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to Database");
		return server.listen({ port: PORT });
	})
	.then((res) => console.log(`Server running at ${res.url}`))
	.catch((err) => console.log(err));
