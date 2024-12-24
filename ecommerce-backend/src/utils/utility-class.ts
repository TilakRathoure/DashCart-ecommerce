class ErrorHandler extends Error{

    constructor(public message:any,public statusCode:number){
        super(message);
        this.statusCode=statusCode;
    }

}

export default ErrorHandler;