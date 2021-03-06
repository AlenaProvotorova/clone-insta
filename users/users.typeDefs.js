import {gql} from 'apollo-server'

export default gql`
    type User {
       id: Int!
       firstName: String!
       lastName: String
       userName: String!
       email: String!
       bio: String
       avatar: String
       createdAt: String!
       updatedAt: String!
       followers: [User]
       following: [User]
       totalFollowers: Int!
       totalFollowing: Int!
       isMe: Boolean!  
       isFollowing: Boolean!
    }
`;

