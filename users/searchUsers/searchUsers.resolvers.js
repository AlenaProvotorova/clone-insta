import client from "../../client";

export default {
    Query: {
        searchUsers: async (_, {keyWord, lastId}) => {
            const list =  await client.user.findMany({
                where: {
                userName: {
                    startsWith: keyWord.toLowerCase()
                }
            },
            skip: lastId ? 1 : 0,
            take: 5,
            ...(lastId && {cursor: {id: lastId}})
        })
            return list
        }
    }
}