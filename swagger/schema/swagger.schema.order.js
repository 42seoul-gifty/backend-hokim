/**
 * @swagger
 *  components:
 *      schemas:
 *          order:
 *              type: object
 *              properties:
 *                  giver_name:
 *                      type: string
 *                  giver_phone:
 *                      type: string
 *                  receiver:
 *                      $ref: "#/components/schemas/receiver"
 *                  order_date:
 *                      type: string
 *                  preference:
 *                      $ref: "#/components/schemas/preference"
 *                  status:
 *                      type: string
 */
