import client from "../client"

export default {
    User: {
        totalFollowers: async ({id}) => {
          return await client.user.count({where: {following: {some: {id}}}})
        },
        totalFollowing: async ({id}) => {
          return await client.user.count({where: {followers: {some: {id}}}})
        },
        isMe: ({id}, _, {loggedInUser}) => {
            if(!loggedInUser) return false
            return id === loggedInUser.id
        },
        isFollowing: async ({id}, _, {loggedInUser})=>{
            if(!loggedInUser) return false
            const exist = await client.user
            .findUnique({where: {userName: loggedInUser.userName}})
            .following({where: {id}})
            return exist.length !== 0
        }

    }
}