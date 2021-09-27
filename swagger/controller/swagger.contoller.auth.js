/**
 * @swagger
 * /login/kakao:
 *  get:
 *      tags:
 *        - auth
 *      description: 인증된 유저의 인증 토큰과 유저 정보를 반환하는 API
 *      parameters:
 *      - in: header
 *        name: Authorization-Code
 *        schema:
 *          type: string
 *          format: string
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

/**
 * @swagger
 * /login/naver:
 *  get:
 *      tags:
 *        - auth
 *      description: 인증된 유저의 인증 토큰과 유저 정보를 반환하는 API
 *      parameters:
 *      - in: header
 *        name: Authorization-Code
 *        schema:
 *          type: string
 *          format: string
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

/**
 * @swagger
 * /token/refresh:
 *  post:
 *      tags:
 *        - auth
 *      description: 엑세스 토큰을 리프레쉬 시키는 API
 *      requestBody:
 *        required: true
 *        description: |
 *          - refresh_token : 리프레쉬 토큰 </br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refresh_token:
 *                  type: string
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값 반환 </br>
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
 * /logout:
 *  post:
 *      tags:
 *        - auth
 *      description: 인증된 유저를 로그아웃 시키는 API
 *      requestBody:
 *        required: true
 *        description: |
 *          - refresh_token : 리프레쉬 토큰 </br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refresh_token:
 *                  type: string
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값 반환 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
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
