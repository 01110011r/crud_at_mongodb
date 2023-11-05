import { GraphQLError } from "graphql";
import { UserModel } from "../model/user.model";

export const resolver = {
    Query: {
        users: async () => {
            try {
                const users = await UserModel.find({});
                return users;
            } catch (error) {
                console.log((error as Error).message);
                return error

            }
        },
        // get user by id
        user: async (_: undefined, { _id }: { _id: string | undefined | null }) => {
            try {
                const oneUser = await UserModel.findById(_id);
                return oneUser;
            } catch (error: any) {
                console.log(error.message);

                throw new GraphQLError(error.message);
            }
        }


    },

    Mutation: {
        createUser: async (_: undefined, { username, email }: { username: string, email: string }) => {
            try {
                const user = await UserModel.find({username});


                if (user[0]) return new GraphQLError("email already exist", {
                    extensions: {
                        code: 'BAD_REQUEST'
                    }
                });

                const newUser = await UserModel.create({ username, email });

                return { msg: "create", data: newUser };
            } catch (error: any) {
                console.log(error.message);

                return new GraphQLError(error.message, {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR'
                    }
                });

            }
        },



            // update
    updateUser: async (_: undefined, { username, email, _id }: { username: string, email: string, _id: string }) => {

        try {

            const newData = await UserModel.findByIdAndUpdate(_id, { username, email });
            if (!newData) return { msg: "user not found!", data: null };

            return { msg: "ok", data: newData };
        } catch (error: any) {
            console.log((error as Error).message);
            throw new GraphQLError(error.message, {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    status: 500
                }
            });

        }

    },



    // delete

    deleteUser: async (_: undefined, { _id }: { _id: string | undefined }) => {
        try {
            _id && await UserModel.findByIdAndDelete(_id);
            return { msg: `deleted was id: ${_id}` };
        } catch (error: any) {
            console.log(error.message);
            throw new GraphQLError(error.message);

        }
    }


    }

}
