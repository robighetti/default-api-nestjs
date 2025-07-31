## Default API Documentation
*Automatically Generated at: Thu Jul 31 2025 16:44:10 GMT-0300 (Brasilia Standard Time)*

### [POST] /sessions
**Parameters:**

| where | name | description | type | required |
| --- | --- | --- | --- | --- |

**Responses:**

200: Return the session payload

user: The user logged

access_token: The access token

201: Session created successfully

user: The user logged

access_token: The access token


### [POST] /accounts
**Parameters:**

| where | name | description | type | required |
| --- | --- | --- | --- | --- |

**Responses:**

201: Return the account payload

id: The id of the user

name: The name of the user

email: The email of the user

whatsapp: The whatsapp of the user

id_profile: The id_profile of the user


### [POST] /forgot-password
**Parameters:**

| where | name | description | type | required |
| --- | --- | --- | --- | --- |

**Responses:**

200: Return the forgot password payload

message: The message of the user


