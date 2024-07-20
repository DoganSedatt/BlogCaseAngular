export interface Item{
    id:string;
    title:string;
    content:string;
    memberId:string;
    memberName:string;
    comments:Comment[];
}
export interface Comment{
    content:string;
}
export interface PaginationResponseModel<T>{
    items:T[];
    index:number;
    size:number;
    count:number;
    pages:number;
    hasPrevious:boolean;
    hasNext:boolean;
}