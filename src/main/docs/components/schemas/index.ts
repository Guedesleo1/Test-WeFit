import login from "./login";
import token from "./token";
import users from "./users";

export const modelSchema = {
    "login": login,
    "token": token,
    "users": users,
    "reponseLogin": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "example": "Leonardo"
            },
            "email": {
                "type": "string",
                "example": "leonardo@gmail.com.br"
            },
            "password": {
                "type": "string",
                "example": "$2b$12$B4aaNcxWs.MQVv/9WYkSPu2SilVSlpVqLLV75FWIAGZJQ4c1FK/xm"
            },
            "userId": {
                "type": "string",
                "example": "ca549f8d-1374-40da-9800-a4aa68f72cef"
            },
            "createdAt": {
                "type": "string",
                "example": "2024-03-28T04:57:32.000Z"
            },
        },
    },
    "reponseToken": {
        "type": "object",
        "properties": {
            "accessToken": {
                "type": "string",
                "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjlkYzM5ZjQ0LWI0ZWQtNDM5NC1hOGI5LTE2ODM3YjI2ZWEyYiIsIm5hbWUiOiJMZW9uYXJkbyIsImVtYWlsIjoibGVvbmFyZG9AZ21haWwuY29tLmJyIiwicGFzc3dvcmQiOiIkMmIkMTIkWXZ0ay5kamozaXRsR0JickVxVHJ6T2JUNTFFV3h3aVBpeFFYdTcwd0taN29uMXlOVHVnMkciLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4VDAzOjIzOjAzLjAwMFoifSwiaWF0IjoxNzExNTg5OTUzLCJleHAiOjE3MTE1OTM1NTN9.HbjCEk1bHKI0-pMGPrs1R9s4QYCqJ_DAURfWYBFuNeM"
            },
        },
    },
    "responseUsers": {
        "type": "object",
        "properties": {
            "isSuccess": {
                "type": "boolean",
                "example": true,
            },
            "isFailure": {
                "type": "boolean",
                "example": false,
            },
            "value":{
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "example": "9dc39f44-b4ed-4394-a8b9-16837b26ea2b",
                    },
                    "name": {
                        "type": "string",
                        "example": "9dc39f44-b4ed-4394-a8b9-16837b26ea2b",
                    },
                    "documentType": {
                        "type": "string",
                        "example": "9dc39f44-b4ed-4394-a8b9-16837b26ea2b",
                    },
                    "document": {
                        "type": "string",
                        "example": "leonardo@gmail.com.br"
                    },
                    "telephone": {
                        "type": "string",
                        "example": "39824587"
                    },
                    "cellphone": {
                        "type": "string",
                        "example": "985749658"
                    },
                    "email": {
                        "type": "string",
                        "example": "leonardo@gmail.com.br",
                    },
                    "addressNumber": {
                        "type": "string",
                        "example": "179",
                    },
                    "complement": {
                        "type": "string",
                        "example": "1B",
                    },
                    "created_at": {
                        "type": "string",
                        "example": "2024-03-28T05:13:45.000Z",
                    },
                    "value":{
                        "type": "object",
                        "properties": {
                            "neighborhood": {
                                "type": "string",
                                "example":  "Jardim Ondina",
                            },
                            "state": {
                                "type": "string",
                                "example": "SP",
                            },
                            "city": {
                                "type": "string",
                                "example": "São Paulo",
                            },
                            "publicPlace": {
                                "type": "string",
                                "example": "Rua Santa Cruz do Escalvado",
                            },
                        }
                    }
                } 
            },
        },
    },
    "ApiResponse": {
        "type": "object",
        "properties": {
            "code": {
                "type": "integer",
                "format": "int32"
            },
            "type": {
                "type": "string"
            },
            "message": {
                "type": "string"
            }
        },
        "xml": {
            "name": "##default"
        }
    },
};