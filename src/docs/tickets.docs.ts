/**
 * @swagger
 * /api/tickets/buy:
 *   post:
 *     summary: This route allows user to register on events
 *     tags: [Tickets]
 *     description: Route for attendees to register themselves
 *     requestBody:
 *       description: Event and user information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contactName:
 *                 type: string
 *                 example: "John"
 *               contactNumber:
 *                 type: string
 *                 example: <Contact to be checked if needed>
 *               eventId:
 *                 type: string
 *                 example: 65febc0ac8a818235215e4d6
 *     responses:
 *       '201':
 *         description: Ticket is created successfully
 *       '400':
 *         description: Invalid request body or missing params
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Event is not found
 *       '409':
 *         description: You have already bought a ticket for the event
 *       '500':
 *         description: Internal server error
 *
 * /api/tickets:
 *   get:
 *     summary: This route allows user to view tickets
 *     tags: [Tickets]
 *     description: Route for attendees to view tickets
 *     responses:
 *       '200':
 *         description: Tickets fetched successfully
 *       '401':
 *         description: Unauthorized
 *
 * /api/tickets/{ticketId}:
 *   get:
 *     summary: This route allows user to view specific ticket
 *     tags: [Tickets]
 *     description: Route for attendees to view specific ticket
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         description: Ticket ID to be fetched
 *         scheme:
 *          type: string
 *     responses:
 *       '200':
 *         description: Tickets fetched successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Ticket is not found
 *
 * /api/tickets/{ticketId}/cancel:
 *   delete:
 *     summary: This route allows user to cancel view tickets
 *     tags: [Tickets]
 *     description: Route for attendees to cancel their tickets
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         description: Ticket ID to be fetched
 *         scheme:
 *          type: string
 *     responses:
 *       '200':
 *         description: Tickets is canceled successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Ticket is not found
 *       '500':
 *         description: Problem while canceling ticket
 */
