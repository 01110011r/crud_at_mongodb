import { makeExecutableSchema } from "@graphql-tools/schema";
import fs from "fs";
import Path from "path";
import { resolver } from "./resolvers";

const td=fs.readFileSync(Path.join(process.cwd(), "src", "modules", "schema.gql"), "utf-8");


export default makeExecutableSchema({
    typeDefs:td,
    resolvers:resolver
})