/**
 * @swagger
 * /ages:
 *  get:
 *      tags:
 *        - category
 *      description: age에 해당하는 카테고리를 조회하는 API
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 카테고리 리스트 반환 </br>
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
 *                                    properties:
 *                                      id:
 *                                        type: integer
 *                                      value:
 *                                        type: string
 *          400:
 *              description: 잘못된 요청으로 인해 조회 실패
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
 * /prices:
 *  get:
 *      tags:
 *        - category
 *      description: price에 해당하는 카테고리를 조회하는 API
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 카테고리 리스트 반환 </br>
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
 *                                    properties:
 *                                      id:
 *                                        type: integer
 *                                      value:
 *                                        type: string
 *          400:
 *              description: 잘못된 요청으로 인해 조회 실패
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
 * /genders:
 *  get:
 *      tags:
 *        - category
 *      description: gender에 해당하는 카테고리를 조회하는 API
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 카테고리 리스트 반환 </br>
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
 *                                    properties:
 *                                      id:
 *                                        type: integer
 *                                      value:
 *                                        type: string
 *          400:
 *              description: 잘못된 요청으로 인해 조회 실패
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
