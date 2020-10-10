import app from "./app"
import { config } from 'dotenv-safe'
import * as serverless from "serverless-http"

config()

module.exports.handler = serverless(app)