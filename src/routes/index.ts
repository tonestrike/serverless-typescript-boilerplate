// src/routes.ts
import { Router } from "express"
import * as passport from 'passport'

const router = Router()

router.get("/users", (req, res) => {
  res.json({
    status: "success",
    data: [{
      name: "User1"
    }]
  });
})

export default router