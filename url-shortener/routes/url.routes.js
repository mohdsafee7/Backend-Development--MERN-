import express from 'express';
import { shortenPostREquestBodySchema } from '../validations/request.validation.js';
import { urlsTable } from '../models/index.js';
import { db } from '../db/index.js';
import { nanoid } from 'nanoid'; // nanoid is a library for generating unique IDs. It is used here to generate unique short codes for the URLs.
import { ensureAuthenticated } from '../middleware/auth.middleware.js'; // ensureAuthenticated is a middleware function that checks if the user is authenticated. It is used to protect the /shorten route, so that only authenticated users can create short URLs.
import { eq } from 'drizzle-orm';
const router = express.Router();



router.post('/shorten', ensureAuthenticated, async (req, res) => {
  // const userId = req.user?.id; // req.user is set by the authentication middleware, and it contains the payload of the token if the token is valid. If the token is not valid, req.user will be undefined.

  // if(!userId) {
  //   return res.status(401).json({ error: 'You must be logged in to access this resource' });
  // }
  
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

// This route is for redirecting the short URL to the target URL. It is a public route, so it does not require authentication.
//it is placed after the /shorten route, because if it is placed before the /shorten route, it will catch all the requests to /shorten and return 404 for them.
router.get('/:shortCode', async (req, res) => {
  const code = req.params.shortCode;

  const [url] = await db.select({
    targetURL: urlsTable.targetURL,
  }).from(urlsTable).where(eq(urlsTable.shortCode, code));

  if(!url){
    return res.status(404).json({ error: 'Short URL not found' });
  }
  
  return res.redirect(url.targetURL);
});

export default router;