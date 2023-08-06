export interface Questions{
    questionId:number;
    functionAreaId:number;
    industryId:number;
    questionName:string;
    description:string;
    createdOn:Date;
    createdBy:string;
    lastModifiedOn:Date;
    lastModifiedBy:string;
}
export interface QuestionsChecked{
    questionId:number;
    functionAreaId:number;
    industryId:number;
    questionName:string;
    description:string;
    createdOn:Date;
    createdBy:string;
    lastModifiedOn:Date;
    lastModifiedBy:string;
    checked:boolean;
    questionnaireId:string;
}