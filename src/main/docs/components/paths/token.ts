export default {
    "post": {
        "tags": [
            "Login"
        ],
        "summary": "Create Token",
        "description": "Create Token",
        "requestBody": {
            "description": "Create Token",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/token"
                    }
                },
                "application/xml": {
                    "schema": {
                        "$ref": "#/components/schemas/token"
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
                            "$ref": "#/components/schemas/reponseToken"
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
                                    "example": "Invalid token."
                                },
                            }
                        }
                    },
                }
                
            },
            "401": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "error": {
                                    "type": "string",
                                    "example": "Invalid token."
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
                                    "example": "Internal server error."
                                },
                            }
                        }
                    },
                }
                
            },
        },
    },
}; 