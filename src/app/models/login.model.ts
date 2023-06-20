/**
  * UserLogin interface validate the data type of the user 
  **/
export interface UserLogin {
    userNameOrEmailAddress: string,
    password: string,
    rememberMe: boolean,//true
    
}

/**
  * UserLoginResult interface validate the data type of the login response
  **/
export interface UserLoginResult {
    result : number,
    description : string,
}