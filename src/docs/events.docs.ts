/**
 * @swagger
 * /api/events/:
 *   post:
 *     summary: Organizers's route to create new event
 *     tags: [Events]
 *     description: Route for event organizers to create a new event
 *     requestBody:
 *       description: Event information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "event 1"
 *               description: 
 *                 type: string
 *                 example: This is event 1
 *               category: 
 *                 type: string
 *                 example: conference
 *               startDateTime: 
 *                 type: string
 *                 example: 2024-02-13T12:30:45.000Z
 *               endDateTime: 
 *                 type: string
 *                 example: 2024-02-13T12:30:45.000Z
 *               location: 
 *                 type: string
 *                 example: BK Arena
 *               price: 
 *                 type: number
 *                 example: 50000
 *     responses:
 *       '201':
 *         description: Event is created successfully
 *       '400':
 *         description: Invalid request body or missing params
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * 
 * /api/events:
 *   get:
 *     summary: Any user route to view available events
 *     tags: [Events]
 *     security: []
 *     description: Route for users events
 *     parameters: 
 *      - in: query
 *        name: perPage
 *        description: Number of events to be fetched
 *        scheme:
 *          type: number
 *      - in: query
 *        name: page
 *        description: Page number
 *        scheme:
 *          type: number
 *     responses:
 *       '200':
 *         description: Array of events
 *       '500':
 *         description: Internal server error
 * 
 * /api/events/{eventId}:
 *   get:
 *     summary: View specific event
 *     tags: [Events]
 *     security: []
 *     description: Route for users events
 *     parameters: 
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: Event ID to be fetched
 *         scheme: 
 *          type: string
 *     responses:
 *       '200':
 *         description: Event fetched successfully
 *       '400':
 *         description: Missing or invalid eventId
 *       '500':
 *         description: Internal server error
 * 
 * /api/events/search?:
 *   get:
 *     summary: Search event based on certain criteria
 *     tags: [Events]
 *     security: []
 *     parameters: 
 *       - in: query
 *         name: q
 *         description: Search term
 *         scheme: 
 *          type: string
 *       - in: query
 *         name: cat
 *         description: Event category
 *         scheme: 
 *          type: string
 *       - in: query
 *         name: perPage
 *         description: Number of events to be fetched
 *         scheme: 
 *          type: number
 *       - in: query
 *         name: page
 *         description: Page number
 *         scheme: 
 *          type: number
 *     responses:
 *       '200':
 *         description: Event fetched successfully
 *       '404':
 *         description: No event found based on given criteria
 * 
 * /api/events/{eventId}/attendees:
 *   get:
 *     summary: Search event based on certain criteria
 *     tags: [Events]
 *     parameters: 
 *       - in: path
 *         name: eventId
 *         description: Event ID to look for
 *         scheme: 
 *          type: string

 *     responses:
 *       '200':
 *         description: Attendees for an event fetched successfully
 *       '400':
 *         description: Missing or invalid parameter(s)
 *       '401':
 *         description: Unauthenticated
 *       '403':
 *         description: Unauthorized to perform this action
 *       '404':
 *         description: No event found
 * 
 * /api/events/{eventId}/:
 *   patch:
 *     summary: Update an event 
 *     tags: [Events]
 *     parameters: 
 *       - in: path
 *         name: eventId
 *         description: Event ID to look for
 *         scheme: 
 *          type: string
 *     requestBody:
 *       description: Event information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Event 1"
 *               description: 
 *                 type: string
 *                 example: This is event 1
 *               category: 
 *                 type: string
 *                 example: conference
 *               startDateTime: 
 *                 type: string
 *                 example: 2024-02-13T12:30:45.000Z
 *               endDateTime: 
 *                 type: string
 *                 example: 2024-02-13T12:30:45.000Z
 *               location: 
 *                 type: string
 *                 example: BK Arena
 *               price: 
 *                 type: number
 *                 example: 50000
 *     responses:
 *       '200':
 *         description: Event is updated successfully
 *       '400':
 *         description: Missing or invalid parameter(s)
 *       '401':
 *         description: Unauthenticated
 *       '403':
 *         description: Unauthorized to perform this action
 *       '404':
 *         description: No event found
 * 
 * /api/events/{eventId}?:
 *   delete:
 *     summary: Delete an event based in its ID
 *     tags: [Events]
 *     description: Delete an event in your accoutn
 *     parameters: 
 *       - in: path
 *         name: eventId
 *         description: Event ID to look for
 *         scheme: 
 *          type: string
 *     responses:
 *       '200':
 *         description: Event is deleted successfully
 *       '404':
 *         description: Event is not found
 *       '500':
 *         description: Internal server error
 */
