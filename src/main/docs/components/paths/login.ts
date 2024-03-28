export default {
    "post": {
        "tags": [
            "Login"
        ],
        "summary": "Create login",
        "description": "Create login",
        "requestBody": {
            "description": "Create Login",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/login"
                    }
                },
                "application/xml": {
                    "schema": {
                        "$ref": "#/components/schemas/login"
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
                            "$ref": "#/components/schemas/reponseLogin"
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
                                    "example": "User already exists"
                                },
                            }
                        }
                    },
                }
                
            },
        },
    },
}; 