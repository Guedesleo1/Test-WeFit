export default {
    "post": {
        "tags": [
            "Users"
        ],
        "summary": "Create Users",
        "description": "Create Users",
        "requestBody": {
            "description": "Create Users",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/users"
                    }
                },
                "application/xml": {
                    "schema": {
                        "$ref": "#/components/schemas/users"
                    }
                },
            },
            "required": true
        },
        "responses": {
            "200": {
                "description": "Successful operation",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/responseUsers"
                        }
                    },
                }
            },
            "400": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "error": {
                                    "type": "string",
                                    "example": "Erro ao obter endereço do CEP"
                                },
                            }
                        }
                    },
                }
                
            },
            "500": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "error": {
                                    "type": "string",
                                    "example": "Server Error"
                                },
                            }
                        }
                    },
                }
                
            },
        },
    },
}; 