export class ShoeModel{
    id: number= 0;
    title: string= "";
    description: string = "";
    imageUrl: string = "";
    price: number = 0;
    isActive: boolean = true;
    isDeleted: boolean = false;
    createAt: Date = new Date();
}