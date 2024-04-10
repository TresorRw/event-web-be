/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a user account
 *     tags: [Auth]
 *     description: Route for user to register themselves
 *     security: []
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "your-email@gmail.com"
 *               role:
 *                 type: string
 *                 example: attendee
 *               password:
 *                 type: string
 *                 example: Strong@123
 *               displayName:
 *                 type: string
 *                 example: User
 *     responses:
 *       '201':
 *         description: User is successfull registred
 *       '400':
 *         description: Invalid request body or missing params
 *       '409':
 *         description: Email is already taken
 *       '500':
 *         description: Internal server error
 *
 * /api/auth/signin:
 *   post:
 *     summary: Log into user account
 *     tags: [Auth]
 *     description: Route for user to log into their accoutn
 *     security: []
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "your-email@gmail.com"
 *               password:
 *                 type: string
 *                 example: Strong@123
 *     responses:
 *       '200':
 *         description: User is successfull logged in
 *       '400':
 *         description: Invalid request body or missing params
 *       '404':
 *         description: User can not be found
 *       '406':
 *         description: User exists but incorrect password
 *       '500':
 *         description: Internal server error
 */
