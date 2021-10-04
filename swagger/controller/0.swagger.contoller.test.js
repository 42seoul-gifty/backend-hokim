/**
 * @swagger
 * /login/token/user/{user_id}:
 *  get:
 *      tags:
 *        - test
 *      description: 인증된 유저의 인증 토큰과 유저 정보를 반환하는 API
 *      parameters:
 *      - in: path
 *        name: user_id
 *        type: string
 *        required: true
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 특정 유저 정보 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - data : 해당 유저의 인증토큰과 정보 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  properties:
 *                                      access_token:
 *                                          type: string
 *                                      refresh_token:
 *                                          type: string
 *                                      user:
 *                                          $ref: "#/components/schemas/user"
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
