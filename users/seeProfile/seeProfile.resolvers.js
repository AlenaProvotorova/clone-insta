import client from "../../client";

export default {
    Query: {
        seeProfile: (_, {userName}) => client.user.findUnique({
            where: {userName},
            // let BD to show results
            include: {
                followers: true,
                following: true
            }
        },
        )
    }
}