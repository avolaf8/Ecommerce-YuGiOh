
Endpoints :
1. POST /register
2. POST /login
3. POST /products/:productId
4. POST /coast
5. POST /payment
6. GET /products
7. GET /cart
8. GET /shipping
9. PATCH /checkout
10. DELETE /cart/:id

&nbsp;
# 1. Post /register
        Request:
            body:
                {
                    "username": "string",
                    "email": "string",
                    "password": "string",
                }
        Response(201-Created)
            {
                "id": "integer",
                "username": "string",
                "email": "string",
                "password": "string",
            }
        Response(400 - Bad Request)
            {
                 "message": "Username is required"
            }
            OR
            {
                 "message": "Email is required"
            }
            OR
            {
                "message": "Password is required"
            }
&nbsp;
# 2. POST /login

## Request:

### body:
```json 
{
    "email": "string",
    "password":"string"
}

```
## Response (201-Created)

```json 

    {
        "email": "string",
        "password":"string"
    }
```

## Response (400 - Bad Request)

```json
    {
            "message": "Email is required"
    }
    OR
    {
            "message": "Password is required"
    }

```

&nbsp;
# 3. Get /products
Description: get all products from 3rd party API 

## Request
### headers:
```json
{
    "access_token": "string"
}

```
### Response (200 - OK)
```json

        {
  "data": [
    {
      "id": 34541863,
      "name": "\"A\" Cell Breeding Device",
      "type": "Spell Card",
      "frameType": "spell",
      "desc": "During each of your Standby Phases, put 1 A-Counter on 1 face-up monster your opponent controls.",
      "race": "Continuous",
      "archetype": "Alien",
      "card_sets": [
        {
          "set_name": "Force of the Breaker",
          "set_code": "FOTB-EN043",
          "set_rarity": "Common",
          "set_rarity_code": "(C)",
          "set_price": "1.31"
        }
      ],
      "card_images": [
        {
          "id": 34541863,
          "image_url": "https://images.ygoprodeck.com/images/cards/34541863.jpg",
          "image_url_small": "https://images.ygoprodeck.com/images/cards_small/34541863.jpg",
          "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/34541863.jpg"
        }
      ],
      "card_prices": [
        {
          "cardmarket_price": "0.10",
          "tcgplayer_price": "0.16",
          "ebay_price": "4.99",
          "amazon_price": "24.45",
          "coolstuffinc_price": "0.25"
        }
      ]
    },
    {
      "id": 64163367,
      "name": "\"A\" Cell Incubator",
      "type": "Spell Card",
      "frameType": "spell",
      "desc": "Each time an A-Counter(s) is removed from play by a card effect, place 1 A-Counter on this card. When this card is destroyed, distribute the A-Counters on this card among face-up monsters.",
      "race": "Continuous",
      "archetype": "Alien",
      "card_sets": [
        {
          "set_name": "Gladiator's Assault",
          "set_code": "GLAS-EN062",
          "set_rarity": "Common",
          "set_rarity_code": "(C)",
          "set_price": "2.1"
        }
      ],
      "card_images": [
        {
          "id": 64163367,
          "image_url": "https://images.ygoprodeck.com/images/cards/64163367.jpg",
          "image_url_small": "https://images.ygoprodeck.com/images/cards_small/64163367.jpg",
          "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/64163367.jpg"
        }
      ],
      "card_prices": [
        {
          "cardmarket_price": "0.09",
          "tcgplayer_price": "0.22",
          "ebay_price": "1.15",
          "amazon_price": "0.50",
          "coolstuffinc_price": "0.25"
        }
      ]
    },  
    },...

```

# 4. Get /cart
Description: get all myCart based on UserId from database
## Request:
headers:
```json
    {
            "access_token": "string"
    }
```
## Response (200-OK)
```json
[
   {
    "id": 5,
    "UserId": 1,
    "ProductId": 34541863,
    "thirdAPI": null,
    "status": "unpaid",
    "createdAt": "2023-04-05T22:16:40.582Z",
    "updatedAt": "2023-04-05T22:16:40.582Z"
  },
  {
    "id": 6,
    "UserId": 1,
    "ProductId": 64163367,
    "thirdAPI": null,
    "status": "unpaid",
    "createdAt": "2023-04-06T00:40:11.363Z",
    "updatedAt": "2023-04-06T00:40:11.363Z"
  },
  {
    "id": 7,
    "UserId": 1,
    "ProductId": 49140998,
    "thirdAPI": null,
    "status": "unpaid",
    "createdAt": "2023-04-06T00:50:10.348Z",
    "updatedAt": "2023-04-06T00:50:10.348Z"
  },.
]
```
## Response (400 - Bad Request)
```json
{
    "message": "Unauthorized"
}
OR
{
    "message": "Data not found"
}
```

# 5. Patch /checkout
## Request:
headers:
```json
{
    "access_token": "string"
}
```
## Response (200-OK)
```json
{
    "message": "pleas check your email for recipes detail information

}
```
## Response (404 - Not Found)
```json
{
    "message": "Data not found"
}
```

# 6. Get /shipping
Description: get cities from data 3rd party Api Raja Ongkir 

## Request:

### headers:
```json
{
    "access_token": "string"
}
```
## Response (200 - OK)
```json
[
    {
        "rajaongkir": {
            "query": [],
            "status": {
                "code": 200,
                "description": "OK"
            },
            "results": [
                {
                    "city_id": "1",
                    "province_id": "21",
                    "province": "Nanggroe Aceh Darussalam (NAD)",
                    "type": "Kabupaten",
                    "city_name": "Aceh Barat",
                    "postal_code": "23681"
                }..
            ]
        }
    },
]
```

#  7. Post /shipping
## Request:
### headers:
```json
{
    "access_token": "string"
}
```
### query:

```json
{
    destination
}
```
## Response (200 - OK)
```json
{
    30000
}
```

 # 8. Post /paymentGetWay
## Request:
### headers:
```json
{
    "access_token": "string"
}
```
## Response (200 - OK)
```json
{
    access_token: 'string'
}
```
## Response (400 - Bad request)
```json
{
    error_messages: 
    [ 
        'transaction_details.gross_amount is not a number' 
    ]
}
```
# 9. Delete /cart/:id
Description: Delete success
## Request:
headers:
```json
{
    "access_token": "string"
}
```
### params:
```json
{
    "id": "integer (required)"
}
```
## Response (200-OK)
```json
{
    "message": "Delete success"
}
```
## Response (404)
```json
{
    message: "not found"
}
```

# 10. POST /products/:productId
## Request:
### User:
```json
{
    UserId: "integer"
}
```
### params:
```json
{
    ProductId: "integer"
}
```
### body:
```json
{
    thirdAPI: 'string'
}
```
## Response(201-Created)
```json
{
    message: "add to cart"
}
```
# 11. Global Error
## Response (500)
```json
{
        "message": "Internal server error"
}
```

