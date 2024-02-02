import { ShoeModel } from "./shoe.model";

export class ResponseModel{
    data: ShoeModel[] = [];
    totalPageCount: number = 1;
    pageNumber: number = 1;
    pageSize: number = 12;
    isFirstPage: boolean = false;
    isLastPage: boolean = false;
}