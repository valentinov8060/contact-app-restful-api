# Contact API Spec

## 1. Create Contact API

Endpoint : POST /api/contacts

Headers : 
- Authorization : token

Request Body :

```json
{
    "first_name" : "Bill",
    "last_name" : "Valentinov",
    "email" : "bill80@gmail.com",
    "phone" : "123456789098"
}
```

Response Body Success : 

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Bill",
        "last_name" : "Valentinov",
        "email" : "bill80@gmail.com",
        "phone" : "123456789098"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Email is not valid format"
}
```

## 2. Update Contact API

Endpoint : PUT /api/contacts/:idContacts

Headers :
- Authorization : token

Request Body :

```json
{
    "first_name" : "Bill",
    "last_name" : "Valentinov",
    "email" : "bill80@gmail.com",
    "phone" : "123456789098"
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Bill",
        "last_name" : "Valentinov",
        "email" : "bill80@gmail.com",
        "phone" : "123456789098"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Email is not valid format"
}
```

## 3. Get Contact API

Endpoint : GET /api/contacts/:idContacts

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Bill",
        "last_name" : "Valentinov",
        "email" : "bill80@gmail.com",
        "phone" : "123456789098"
    }
}
```

Response Body Error :

```json
{
    "errors" : "Contact is not found"
}
```

## 4. Search Contact API

Endpoint : GET /api/contacts/search

Headers :
- Authorization : token

Query params :
- name : Search by first_name or last_name using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data" : [
        {
        "id" : 1,
        "first_name" : "Bill",
        "last_name" : "Valentinov",
        "email" : "bill80@gmail.com",
        "phone" : "123456789098"
        },
        {
        "id" : 2,
        "first_name" : "Eko",
        "last_name" : "Khannedy",
        "email" : "eko@pzn.com",
        "phone" : "098765432123"
        }
    ],
    "paging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```

Response Body Error :

```json
{
    "errors" : "Bad request"
}
```

## 5. Remove Contact API

Endpoint : DELETE /api/contacts/:idContacts

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
    "errors" : "Contact is not found"
}
```
