import 'reflect-metadata'
import dotenv from 'dotenv'
import Server from './server/server'
import { AppDataSource } from './data-source'

dotenv.config()

const server = new Server()
server.listen()

AppDataSource.initialize()
  .then(async (connection) => {
    if (connection) {
      console.log('****** Connection with data base is success ******')
    }
  })
  .catch((error) => console.log(error + '**** Error in connection wit data base ****' + error))
