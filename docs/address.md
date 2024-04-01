# Address API Spec

## 1. Create Address API

Endpoint : POST /api/contact/:id_contact/address/create

Headers :
- Authorization : token

Request Body :

```json
{
  "street" : "Jalan apa",
  "city" : "Kota apa",
  "province" : "Provinsi apa",
  "country" : "Negara apa",
  "postal_code" : "Kode pos"
}
```

Response Body Success :

```json
{
  "data" : {
    "id_address" : 1,
    "street" : "Jalan apa",
    "city" : "Kota apa",
    "province" : "Provinsi apa",
    "country" : "Negara apa",
    "postal_code" : "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Country is not found" 
}
```

## 2. Update Address API

Endpoint : PUT /api/contact/:id_contact/address/update/:id_address

Headers :
- Authorization : token

Request Body :

```json
{
  "street" : "Jalan apa",
  "city" : "Kota apa",
  "province" : "Provinsi apa",
  "country" : "Negara apa",
  "postal_code" : "Kode pos"
}
```

Response Body Success :

```json
{
  "data" : {
    "id_address" : 1,
    "street" : "Jalan apa",
    "city" : "Kota apa",
    "province" : "Provinsi apa",
    "country" : "Negara apa",
    "postal_code" : "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Country is not found"
}
```

## 3. Get Address API

Endpoint : GET /api/contact/:id_contact/address/get/:id_address

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id_address" : 1,
    "street" : "Jalan apa",
    "city" : "Kota apa",
    "province" : "Provinsi apa",
    "country" : "Negara apa",
    "postal_code" : "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors" : "contact is not found"
}
```

## 4. List Address API

Endpoint : GET /api/contact/:id_contact/address/list

Headers :
- Authorization : token

Response Body Success :

```json 
{
  "data" : [
    {
      "id_address" : 1,
      "street" : "Jalan apa",
      "city" : "Kota apa",
      "province" : "Provinsi apa",
      "country" : "Negara apa",
      "postal_code" : "Kode pos"
    },
    {
      "id_address" : 1,
      "street" : "Jalan apa",
      "city" : "Kota apa",
      "province" : "Provinsi apa",
      "country" : "Negara apa",
      "postal_code" : "Kode pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors" : "contact is not found"
}
```

## 5. Remove Address API

Endpoint : DELETE /api/contacts/:id_contact/address/remove/:id_address

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
  "errors" : "address is not found"
}
```
