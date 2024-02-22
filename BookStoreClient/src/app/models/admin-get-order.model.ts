import { OrderStatusEnum } from "./order-status-enum";

export class AdminGetOrderModel{
    id: number = 0;
    userId: number = 0;
    orderNumber: string = "";
    paymentDate: string = "";
    paymentType: string = "";
    paymentNumber: string = "";
    orderStatus: OrderStatusEnum = OrderStatusEnum.PendingApproval;
}