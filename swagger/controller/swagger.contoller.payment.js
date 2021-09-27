/**
 * @swagger
 * /payment/validation:
 *  post:
 *      tags:
 *        - payment
 *      description: 주문의 유효성을 검사하는 API
 *      requestBody:
 *        required: true
 *        description: |
 *          - merchant_uid : 유저가 주문한 상품의 uid </br>
 *          - imp_uid : iamport 결제의 uid </br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                merchant_uid:
 *                  type: string
 *                imp_uid:
 *                  type: string
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - message : API 실행 결과 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *          400:
 *              description: 잘못된 요청으로 인해 주문 인증 실패 혹은 유효하지 않은 주문
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
