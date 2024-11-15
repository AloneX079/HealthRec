class apiresponse{
    constructor(statusCode, data, message="Success"){
        this.status = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 300;
    }
}

module.exports = apiresponse;