import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { ensureAuthenticated, restrictToRole } from '../middleware/auth.middleware.js';

const adminRestricMiddleware = restrictToRole('ADMIN'); // Create a middleware function that restricts access to routes based on the 'ADMIN' role. This will be used to protect admin-specific routes.
const router = express.Router();

router.use(ensureAuthenticated); // Apply the ensureAuthenticated middleware to all routes in this router, ensuring that only authenticated users can access these routes.

router.use(adminRestricMiddleware); // Apply the adminRestricMiddleware to all routes in this router, ensuring that only users with the 'ADMIN' role can access these routes.
router.get('/users', async(req, res)=>{
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email
  }).from(usersTable)

  return res.json({users})
});

export default router;