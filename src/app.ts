import * as express from "express"
import * as bodyParser from "body-parser"
import * as passport from 'passport'
import * as session from 'express-session'
import * as busboyBodyParser from 'busboy-body-parser'
import routes from "./routes"
import './auth'

class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
  }
  private config() {
    this.app.use(busboyBodyParser())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ strict: false }))
    this.app.use(bodyParser.text())
    this.app.use(session({ secret: 'SOMETHINGSECRET', resave: false, saveUninitialized: false }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(routes)
  }
}

export default new App().app