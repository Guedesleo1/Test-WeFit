interface HttpRequest {
    body?: any;
    request?: any
}

interface HttpResponse {
    statusCode: number;
    body?: any;
}

export { HttpRequest, HttpResponse };