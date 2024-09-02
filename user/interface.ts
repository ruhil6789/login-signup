
export interface PromiseResolve {
    status: number,
    error: boolean,
    message: string,
    data?: any,
  
}

export interface JoiValidationResult {
    error: boolean;
    value: any;
    message?: string;
}
export interface IUserService{

    /**
* @param {IUserService} register
* @returns {Promise<PromiseResolve>}
* @memberof UserService
*/
    register(email: number | string, password:number|string): Promise<PromiseResolve>;
}

export interface ILoginUs {
    email: string;
    password: string;
}