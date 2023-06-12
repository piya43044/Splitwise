/**
   * User_login interface validate the data type of the user 
   *  */
export interface User_login{
    userNameOrEmailAddress:string,
    password: string,
    rememberMe: boolean,//true
}