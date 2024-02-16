import { OrderStatusModel } from "./order-status-model";
import { ShoeModel } from "./shoe.model";

export class OrderModel{
    id: number = 0;
    orderNumber: string = "";
    shoe: ShoeModel = new ShoeModel();
    price: number = 0;
    paymentDate: string = "";
    paymentType: string = "";
    paymentNumber: string = "";
    orderStatus: OrderStatusModel[] = [];
}