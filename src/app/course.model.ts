export interface Course {
    courseId:number,
    title:string,
    description:string,
    contentUrl:string,
    progress: number,
}
export interface Assignment {
    assessmentId: number;
    type: string;
    maxScore: number;
  }