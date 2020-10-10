import * as express from "express"
import * as bodyParser from "body-parser"
import * as passport from 'passport'
import * as session from 'express-session'
import routes from "./routes"
import './auth'

class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
  }
  private config() {
    this.app.use(bodyParser.json())
    this.app.use(session({ secret: 'SOMETHINGSECRET', resave: false, saveUninitialized: false }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(routes)
  }
}

export default new App().app