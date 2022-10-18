import express, { Application } from 'express'
import morgan from 'morgan'
import routes from './../routes/index.routes'

class Server {
  private app: Application
  public static readonly PORT: number = 3000
  public port: string | number

  constructor() {
    this.app = express()
    this.middleware()
  }

  middleware() {
    this.app.use(morgan('dev'))

    //*  WRITING TO THE BODY
    this.app.use(express.json({ limit: '50mb' }))

    // * PARSE TO THE BODY
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }))

    this.app.use('/', routes)
  }

  listen() {
    this.app.listen((this.port = process.env.PORT || Server.PORT), () => {
      console.log(`Server on port ${this.port}`)
    })
  }
}

export default Server
