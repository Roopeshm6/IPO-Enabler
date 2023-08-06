export interface QuestionResponse{
    responseId : string;
    questionnaireId : string;
    projectId : string;
    response : string;
    impact : string;
    effort : string;
    timing : string;
    observation:string;
    recommendations:string;
    createdOn: Date;
    createdBy: string;
    lastModifiedBy:string;
    lastModifiedOn: Date;
}