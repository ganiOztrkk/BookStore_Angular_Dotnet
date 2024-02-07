import { ShoeModel } from "./shoe.model";

export class PaymentModel{
    shoes: ShoeModel[] = [];
    buyer: BuyerModel = new BuyerModel();
    shippingAddress: AddressModel = new AddressModel();
    billingAddress: AddressModel = new AddressModel();
    paymentCard: PaymentCardModel = new PaymentCardModel();
}

export class BuyerModel {
    id: string = "";
    name: string = "Gani";
    surname: string = "Öztürk";
    identityNumber: string = "47756242424";
    email: string = "gani@gmail.com";
    gsmNumber: string = "05309338459";
    registrationDate: string = "";
    lastLoginDate: string = "";
    registrationAddress: string = "";
    city: string = "";
    country: string = "";
    zipCode: string = "";
    ip: string = "";
}

export class AddressModel {
    description: string = "çerkezköy";
    zipCode: string = "54444";
    contactName: string = "Gani Öztürk";
    city: string = "Tekirdağ";
    country: string = "Türkiye";
}

export class PaymentCardModel {
    cardHolderName: string = "Gani Öztürk";
    cardNumber: string = "";
    expireYear: string = "2027";
    expireMonth: string = "12";
    cvc: string = "322";
}