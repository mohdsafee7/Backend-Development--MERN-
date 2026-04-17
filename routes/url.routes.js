import express from 'express';
import { shortenPostREquestBodySchema } from '../validations/request.validation.js';
import { urlsTable } from '../models/index.js';
import { db } from '../db/index.js';
import { nanoid } from 'nanoid'; // nanoid is a library for generating unique IDs. It is used here to generate unique short codes for the URLs.
const router = express.Router();

router.post('/shorten',async (req, res) => {
  const userId = req.user?.id; // req.user is set by the authentication middleware, and it contains the payload of the token if the token is valid. If the token is not valid, req.user will be undefined.

  if(!userId) {
    return res.status(401).json({ error: 'You must be logged in to access this resource' });
  }
  
  const validationResult = await shortenPostREquestBodySchema.safeParseAsync(req.body);

  if(validationResult.error){
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { url, shortCode } = validationResult.data;

  const shorterCode = shortCode || nanoid(6); // Generate a random short code if not provided

  const [result] = await db.insert(urlsTable).values({
    shortCode: shorterCode,
    targetURL: url,
    userId: req.user.id,
  }).returning({id: urlsTable.id, shortCode: urlsTable.shortCode, targetURL: urlsTable.targetURL});

  return res.status(201).json({ id: result.id, shortCode: result.shortCode, targetURL: result.targetURL });
})

export default router;