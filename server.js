require('dotenv').config()
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import logger from 'morgan'
import {typeDefs, resolvers} from './schema';
import { getUser, protectResolvers } from './users/users.utils';

  const apollo = new ApolloServer({typeDefs, resolvers, context: async({req}) => {
    return  {
      loggedInUser: await getUser(req.headers.token),
      protectResolvers
    }
  }});

  const PORT = process.env.PORT

  const app = express()
  app.use(logger('tiny'))
  app.use('/static', express.static("uploads"))

  apollo.applyMiddleware({app})
  
  app.listen({port: PORT}, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    })
 

  //todo
  // вернуть файл к предыдущему состоянию, если будет использоваться облачное хранилище