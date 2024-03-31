# User API Spec

## 1. Register User API

Endpoint :  POST /api/user/register

Request Body :

```json
{
    "username" : "valentinov8060",
    "password" : "************",
    "name" : "Bill Valentinov"
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : "valentinov8060",
        "name" : "Bill Valentinov"
    }
}
```

Response Body Error : 

```json
{
    "errors" : "Username already registered"
}
```

## 2. Login User API

Endpoint : POST /api/user/login

Request Body :

```json
{
    "username" : "valentinov8060",
    "password" : "************"
}
```

Response Body Success : 

```json
{
    "data" : {
        "user_id": "unique-id",
        "token" : "unique-token"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Username or password wrong"
}
```

## 3. Update User API

Endpoint : PATCH /api/user/update
Headers :
- Authorization : token 

Request Body :

```json
{
    "name" : "Valentinov", // optional
    "password" : "************" // optional
}
```

Response Body Success : 

```json
{
    "data" : {
        "user_id": "unique-id",
        "username" : "valentinov8060",
        "name" : "Valentinov"
    }
}
```

Response Body Error : 

```json
{
    "errors" : "Name length max 100"
}
```

## 4. Get User API

Endpoint : GET /api/user/get

Headers :
- Authorization : token

Response Body Success:

```json
{
    "data" : {
        "user_id": "unique-id",
        "username" : "valentinov8060",
        "name" : "Valentinov"
    }
}
```

Response Body Error : 

```json
{
    "errors" : "Unauthorized"
}
```

## 5. Logout User API

Endpoint : DELETE /api/user/logout  

Headers :
- Authorization : token

Response Body Success : 

```json
{
    "data" : "OK"
}
```

Response Body Error : 

```json
{
    "errors" : "Unauthorized"
}
```
