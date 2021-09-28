/**
 * @swagger
 * /users/{user_id}:
 *  get:
 *      tags:
 *        - user
 *      description: user_id에 해당하는 유저 정보를 조회하는 API
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: Bearer 인증 토큰
 *        required: true
 *      - in: path
 *        name: user_id
 *        type: string
 *        description: 정보를 조회하고자 하는 유저의 ID
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 특정 유저 정보 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - data : 해당 유저의 상세 정보 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  $ref: "#/components/schemas/user"
 *          400:
 *              description: 잘못된 요청으로 인해 주문 정보 조회 실패
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                          example:
 *                              success: false
 *                              message: error message
 */
