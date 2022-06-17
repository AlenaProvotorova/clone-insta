import client from "../../client";
import { protectedResolvers } from "../users.utils";

export default {
    Mutation: {
        followUser: protectedResolvers(async(_, {userName}, {loggedInUser}) => {
            const ok = await client.user.findUnique({where: {userName}})
            if(!ok) return {
                ok: false,
                error: "Пользователь не найден"
            }
            await client.user.update({
            where: {
                id: loggedInUser.id
            },
            data: {
                following: {
                    connect: {
                        userName
                    }
                }
            }})
            return {
                ok: true
            }
        })
    }
}