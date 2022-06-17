import {gql} from 'apollo-server'

export default gql`
    type Query {
        searchUsers(keyWord: String!, lastId: Int): [User]
    }
`;