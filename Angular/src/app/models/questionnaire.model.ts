export interface Questionnaire{
    questionnaireId: string;
    projectId:string;
    questionId:number;
    inScope:boolean;
    criticality:number;
    createdOn:Date;
    createdBy:string;
    lastModifiedOn:Date;
    lastModifiedBy:string;
}
export interface QuestionLibrary{
    questionnaireId: string;
    projectId:string;
    questionId:number;
    functionalAreaId:number;
    functionalAreaName:string;
    industryId:number;
    industryName:string;
    questionName:string;
    questionDescription:string;
    inScope:boolean;
    criticality:number;
    displayQuestions:boolean;
}
