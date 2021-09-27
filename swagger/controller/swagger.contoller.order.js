/**
 * @swagger
 * /users/{user_id}/orders/{order_id}:
 *  get:
 *      tags:
 *        - order
 *      description: user_id, order_id에 해당하는 주문 정보를 조회하는 API
 *      parameters:
 *      - in: path
 *        name: user_id
 *        type: string
 *        description: 정보를 조회하고자 하는 유저의 ID
 *      - in: path
 *        name: order_id
 *        type: string
 *        description: 정보를 조회하고자 하는 주문의 ID
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 특정 주문 정보 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - data : 해당 주문의 상세 정보 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  $ref: "#/components/schemas/order"
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

/**
 * @swagger
 * /users/{user_id}/orders:
 *  get:
 *      tags:
 *        - order
 *      description: user_id에 해당하는 유저의 모든 주문 정보를 조회하는 API
 *      parameters:
 *      - in: path
 *        name: user_id
 *        type: string
 *        description: 정보를 조회하고자 하는 유저의 ID
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 오더 정보 반환 </br>
 *                  - success : API 실행 결과 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              order:
 *                                  type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/order"
 *          400:
 *              description: 잘못된 요청으로 인해 리시버 정보 수정 실패
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

/**
 * @swagger
 * /users/{user_id}/orders:
 *  post:
 *      tags:
 *        - order
 *      description: user_id에 해당하는 유저의 주문을 생성하는 API
 *      parameters:
 *      - in: path
 *        name: user_id
 *        type: string
 *        description: 주문을 생성하고자 하는 유저의 ID
 *      requestBody:
 *        required: true
 *        description: |
 *          - giver_name : 선물하는 사람 이름 </br>
 *          - giver_phone : 선물하는 사람 번호 </br>
 *          - receiver_name : 선물받는 사람 이름 </br>
 *          - receiver_phone : 선물받는 사람 번호 </br>
 *          - gender : 받는사람의 성별 </br>
 *          - age : 받는사람의 나이대 </br>
 *          - price : 선물 가격대 </br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                giver_name:
 *                  type: string
 *                giver_phone:
 *                  type: string
 *                receiver_name:
 *                  type: string
 *                receiver_phone:
 *                  type: string
 *                gender:
 *                  type: integer
 *                age:
 *                  type: integer
 *                price:
 *                  type: integer
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 페이지 생성에 필요한 정보 반환 </br>
 *                  - success : API 실행 결과 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  properties:
 *                                    merchant_uid:
 *                                      type: string
 *                                    receiver_id:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *          400:
 *              description: 잘못된 요청으로 인해 정보 반환 실패
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

/**
 * @swagger
 * /users/{user_id}/orders/{order_id}:
 *  delete:
 *      tags:
 *        - order
 *      description: user_id, order_id에 해당하는 주문을 삭제하는 API
 *      parameters:
 *      - in: path
 *        name: user_id
 *        type: string
 *        description: 삭제하고 싶은 주문을 가지고 있는 유저의 ID
 *      - in: path
 *        name: order_id
 *        type: string
 *        description: 삭제하고 싶은 주문의 ID
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값 반환 </br>
 *                  - success : API 실행 결과 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *          400:
 *              description: 잘못된 요청으로 인해 sms 전송 실패
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
