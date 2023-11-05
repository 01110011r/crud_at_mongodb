import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./modules/index";
import "dotenv/config";
import { mongoConnect } from "./config";


async function main() {
    await mongoConnect('mongodb://127.0.0.1:27017/test');
    const server = new ApolloServer({ schema });
   
    const port: string | undefined | number = process.env.PORT || 4000;
   
    const { url } = await startStandaloneServer(server, {
        listen: { port: +port }
    });
    

    console.log(`🚀  Server ready at: ${url}`);

};

main();