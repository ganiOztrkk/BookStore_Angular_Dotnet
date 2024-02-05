import { ShoeModel } from "./shoe.model";

export class PaymentModel{
    shoes: ShoeModel[] = []
    buyer: BuyerModel = new BuyerModel();
    shippingAddress: AddressModel = new AddressModel();
    billingAddress: AddressModel = new AddressModel();
    paymentCard: PaymentCardModel = new PaymentCardModel();
}

export class BuyerModel {
    id: string = "";
    name: string = "";
    surname: string = "";
    identityNumber: string = "";
    email: string = "";
    gsmNumber: string = "";
    registrationDate: string = "";
    lastLoginDate: string = "";
    registrationAddress: string = "";
    city: string = "";
    country: string = "";
    zipCode: string = "";
    ip: string = "";
}

export class AddressModel {
    address: string = "";
    zipCode: string = "";
    contactName: string = "";
    city: string = "";
    country: string = "";
}

export class PaymentCardModel {
    cardHolderName: string = "";
    cardNumber: string = "";
    expireYear: string = "";
    expireMonth: string = "";
    cvc: string = "";
}