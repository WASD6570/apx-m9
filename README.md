# Desafio Modulo 9
## Ecommerce Backend



## Requisitos


### Endpoints
* Los endpoints de la API que deberás entregar son los siguientes:
```http
POST /auth
```
- Recibe un email y encuentra/crea un user con ese email y le envía un código vía email.

```http
POST /auth/token
```

- Recibe un email y un código y valida que sean los correctos. En el caso de que sean correctos devuelve un token.

```http
GET /me
```

- Devuelve info del user asociado a ese token

```http
PATCH /me
```

- Permite modificar algunos datos del usuario al que pertenezca el token.

```http
GET /search?search=query&offset=0&limit=10
```

- Buscar productos en nuestra base de datos. Chequea stock y todo lo necesario. Este endpoint utiliza la técnica que vimos sobre Airtable y Algolia.

```http
GET /products/{id}
```

- Obtiene toda data de un producto.

```http
POST /order?productId={id}
```

- Genera una compra en nuestra base de datos y además genera una orden de pago en MercadoPago. Devuelve una URL de MercadoPago a donde vamos a redigirigir al user para que pague y el orderId.

```http
GET /order/{orderId}
```

- Devuelve una orden con toda la data incluyendo el estado de la orden.

```http
POST /ipn/mercadopago
```

- Recibe la señal de MercadoPago para confirmar que el pago fué realizado con éxito. Cambia el estado de la compra en nuestra base y le envía un email al usuario para avisarle que el pago se realizó correctamente. También se debe generar algún aviso hacia quienes deban procesar esta compra. Esto último es algo interno así que puede ser un email o un registro en Airtable..
## Documentacion 👇
* API doc en POSTMAN
* [DOC](https://documenter.getpostman.com/view/17908890/UVkiTyi8)
## Tech Stack

**Server:** Node, Next, Vercel, Firebae, Airtable, Algolia, MVC, Serverless, YUP, JWT,
DATE-FNS, mercadopago


