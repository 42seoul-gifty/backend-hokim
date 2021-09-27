/**
 * @swagger
 * /receiver/{receiver_id}:
 *  get:
 *      tags:
 *        - receiver
 *      description: receiver_id에 해당하는 리시버 정보를 조회하는 API
 *      parameters:
 *      - in: path
 *        name: receiver_id
 *        type: string
 *        description: 정보를 조회하고자 하는 리시버의 ID
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 특정 리시버 정보 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - data : 해당 리시버의 상세 정보 </br>
 *                      - ID :리시버의 ID </br>
 *                      - name :리시버의 이름 </br>
 *                      - phone : 리시버의 전화번호 </br>
 *                      - product : 리시버가 선택한 상품 </br>
 *                      - address : 리시버의 주소 </br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  $ref: "#/components/schemas/receiver"
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
 * /receiver/{receiver_id}:
 *  patch:
 *      tags:
 *        - receiver
 *      description: receiver_id에 해당하는 리시버 정보를 수정하는 API
 *      parameters:
 *      - in: path
 *        name: receiver_id
 *        type: string
 *        description: 정보를 수정하고자 하는 리시버의 ID
 *      requestBody:
 *        required: true
 *        description: |
 *          - product_id : 리시버가 선택한 상품 id </br>
 *          - post_code : 리시버의 우편번호 </br>
 *          - address : 리시버의 주소 </br>
 *          - address_detail : 리시버의 상세주소 </br>
 *          - likes : 좋아요 한 상품 id 리스트</br>
 *          - dislikes : 싫어요 한 상품 id 리스트</br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product_id:
 *                  type: integer
 *                post_code:
 *                  type: string
 *                address:
 *                  type: string
 *                address_detail:
 *                  type: string
 *                likes:
 *                  type: array
 *                  items:
 *                      type: string
 *                dislikes:
 *                  type: array
 *                  items:
 *                      type: string
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
 * /receiver/{receiver_id}/choice:
 *  get:
 *      tags:
 *        - receiver
 *      description: 선물 선택 페이지에 제공되는 API
 *      parameters:
 *      - in: path
 *        name: receiver_id
 *        type: string
 *        description: 정보를 조회하고자 하는 리시버의 ID
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
 *                                    giver_name:
 *                                      type: string
 *                                    giver_phone:
 *                                      type: string
 *                                    products:
 *                                      type: array
 *                                      items:
 *                                          $ref: "#/components/schemas/product"
 *
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
 * /receiver/{receiver_id}/send:
 *  post:
 *      tags:
 *        - receiver
 *      description: 리시버에서 sms를 보내는 API
 *      parameters:
 *      - in: path
 *        name: receiver_id
 *        type: string
 *        description: sms를 보내고자 하는 리시버의 ID
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
