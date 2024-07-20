export interface GetBlog{
    id:string;
	title: string;
	content: string;
	memberId: string;
    memberName:string;
    comments:string[];
    createdDate:Date;
}
