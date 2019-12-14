"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var index_1 = __importDefault(require("./schemas/index"));
var index_2 = __importDefault(require("./resolvers/index"));
var dataSources_1 = __importDefault(require("./dataSources"));
var server = new apollo_server_1.ApolloServer({
    typeDefs: index_1.default,
    resolvers: index_2.default,
    dataSources: function () {
        return {
            smhiApi: new dataSources_1.default()
        };
    }
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
