export interface UserI {
    _id:string,
    username:string,
    email:string,
    picture:string,
}

export interface PromptI{
    _id:string,
    prompt:string,
    tag:string,
    publishedBy: UserI,
}