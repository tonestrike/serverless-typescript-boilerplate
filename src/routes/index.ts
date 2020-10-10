// src/routes.ts
import { Router } from "express"
import * as passport from 'passport'
import * as AWS from 'aws-sdk'

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE === 'true'
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }
    : undefined  
)

const router = Router({
  mergeParams: true
})

router.get("/users", (req, res) => {
  res.json({
    status: "success",
    data: [{
      name: "User1"
    }]
  });
})

router.post('/users', function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== 'string') {
    return res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: 'users-table-local',
    Item: {
      userId: userId,
      name: name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    } else {
      res.json({ userId, name });
    }
  });
})

export default router