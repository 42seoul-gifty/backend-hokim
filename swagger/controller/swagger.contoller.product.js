/**
 * @swagger
 * /products:
 *  get:
 *      tags:
 *        - product
 *      description: 카테고리에 해당하는 상품을 조회하는 API
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: Bearer 인증 토큰
 *        required: true
 *      - in: query
 *        name: gender
 *        type: string
 *        description: 선택된 성별
 *      - in: query
 *        name: age
 *        type: string
 *        description: 선택된 나이
 *      - in: query
 *        name: price
 *        type: string
 *        description: 선택된 가격
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 상품 리스트 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - data : 해당 상품의 리스트 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/product"
 *          400:
 *              description: 잘못된 요청으로 인해 리시버 정보 조회 실패
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
 * /products/{product_id}:
 *  get:
 *      tags:
 *        - product
 *      description: product_id에 해당하는 상품 정보를 조회하는 API
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: Bearer 인증 토큰
 *        required: true
 *      - in: path
 *        name: product_id
 *        type: string
 *        description: 정보를 조회하고자 하는 상품의 ID
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - data : 상품 정보 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  $ref: "#/components/schemas/product"
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
