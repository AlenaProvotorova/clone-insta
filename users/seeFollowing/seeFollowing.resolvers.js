import client from "../../client";

export default {
    Query: {
        seeFollowing: async (_, {userName, lastId}) => {
            const ok = await client.user.findUnique({where: {userName}, select:{id: true}})
            if(!ok) return {
                ok: false,
                error: "Пользователь не найден"
            }
            const following = await client.user
            .findUnique({where: {userName}})
            .following({
                skip: lastId ? 1 : 0,
                take: 5,
                ...(lastId && {cursor: {id: lastId}})
            })
            return {
                ok: true,
                following,
            }
        }
    }
}