
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginInput {
    username: string;
    password: string;
}

export class CreateCustomerInput {
    first_name: string;
    last_name: string;
    email: string;
    mobileNumber: string;
}

export class CreateInventoryInput {
    name: string;
    location: string;
}

export class EditInventoryInput {
    name: string;
    location: string;
    inventoryId: ObjectId;
}

export class GetInventoryArgs {
    page: number;
    limit: number;
}

export class GetInventoryItemArgs {
    page: number;
    limit: number;
    inventoryId: ObjectId;
}

export class CreateInventoryItemInput {
    name: string;
    description: string;
    price: number;
    inventoryId: ObjectId;
}

export class EditInventoryItemInput {
    name: string;
    description: string;
    price: number;
    inventoryItemId: ObjectId;
}

export class GetCustomerInvoiceArgs {
    customerId: ObjectId;
    limit: number;
}

export class CreateInvoiceInput {
    orderId: ObjectId;
    paymentTransactionId: ObjectId;
    customerId: ObjectId;
    totalAmount: number;
}

export class OrderDetailInput {
    quantity: number;
    price: number;
    inventoryItemId: ObjectId;
    orderId: ObjectId;
}

export class CreateOrderDetailInput {
    orderDetails: OrderDetailInput[];
}

export class CheckoutInput {
    name: string;
    email: string;
    source: string;
    orderId: ObjectId;
    customerId: ObjectId;
}

export class UpdateShipmentStatusInput {
    shipmentId: string;
    deliveryStatus: string;
}

export class CreateSystemUserInput {
    username: string;
    password: string;
    roles: string[];
}

export class LoginResponse {
    token: string;
}

export abstract class IMutation {
    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
    abstract createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;
    abstract createInventory(createInventoryInput: CreateInventoryInput): Inventory | Promise<Inventory>;
    abstract editInventory(editInventoryInput: EditInventoryInput): EditInventoryResponse | Promise<EditInventoryResponse>;
    abstract deleteInventory(inventoryId: string): DeleteInventoryResponse | Promise<DeleteInventoryResponse>;
    abstract createInventoryItem(createInventoryItemInput: CreateInventoryItemInput): InventoryItem | Promise<InventoryItem>;
    abstract editInventoryItem(editInventoryItemInput: EditInventoryItemInput): EditInventoryItemResponse | Promise<EditInventoryItemResponse>;
    abstract deleteInventoryItem(inventoryItemId: string): DeleteInventoryItemResponse | Promise<DeleteInventoryItemResponse>;
    abstract createInvoice(createInvoiceInput: CreateInvoiceInput): Invoice | Promise<Invoice>;
    abstract initiateOrder(customerId: string): Order | Promise<Order>;
    abstract acceptOrder(orderId: string): OrderAcceptionResponse | Promise<OrderAcceptionResponse>;
    abstract rejectOrder(orderId: string): OrderRejectionResponse | Promise<OrderRejectionResponse>;
    abstract createOrderDetails(createOrderDetailInput: CreateOrderDetailInput): OrderDetailCreationResponse | Promise<OrderDetailCreationResponse>;
    abstract checkout(checkoutInput: CheckoutInput): CheckoutResponse | Promise<CheckoutResponse>;
    abstract initiateShipment(orderId: string): Shipment | Promise<Shipment>;
    abstract updateShipmentStatus(updateShipmentStatusInput: UpdateShipmentStatusInput): ShipmentStatusUpdateResponse | Promise<ShipmentStatusUpdateResponse>;
    abstract createSystemUser(createSystemUserInput: CreateSystemUserInput): User | Promise<User>;
}

export class Customer {
    first_name: string;
    last_name: string;
    email: string;
    mobileNumber: string;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export abstract class IQuery {
    abstract customers(): Customer[] | Promise<Customer[]>;
    abstract getInventories(getInventoryArgs: GetInventoryArgs): Nullable<Inventory>[] | Promise<Nullable<Inventory>[]>;
    abstract getInventoriesCount(): number | Promise<number>;
    abstract getInventoryItems(getInventoryItemArgs: GetInventoryItemArgs): Nullable<InventoryItem>[] | Promise<Nullable<InventoryItem>[]>;
    abstract getInventoryItemsCount(): number | Promise<number>;
    abstract getCustomerInvoices(getCustomerInvoiceArgs: GetCustomerInvoiceArgs): Invoice[] | Promise<Invoice[]>;
    abstract getCustomerInvoicesCount(customerId: string): number | Promise<number>;
    abstract getCustomerOrdersDetails(customerId: string): CustomerOrderDetail[] | Promise<CustomerOrderDetail[]>;
    abstract getShipmentById(shipmentId: string): Shipment | Promise<Shipment>;
    abstract users(): User[] | Promise<User[]>;
}

export class Inventory {
    name: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export class InventoryItem {
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export class EditInventoryResponse {
    success: boolean;
}

export class DeleteInventoryResponse {
    success: boolean;
}

export class EditInventoryItemResponse {
    success: boolean;
}

export class DeleteInventoryItemResponse {
    success: boolean;
}

export class Invoice {
    totalAmount: number;
    customerId: ObjectId;
    orderId: ObjectId;
    paymentTransactionId: string;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export class Order {
    status: string;
    customerId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export class OrderDetail {
    quantity: number;
    price: number;
    inventoryItemId: ObjectId;
    orderId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export class OrderAcceptionResponse {
    success: boolean;
}

export class OrderRejectionResponse {
    success: boolean;
}

export class OrderDetailCreationResponse {
    success: boolean;
}

export class CustomerOrderDetail {
    _id: ObjectId;
    status: string;
    customerId: ObjectId;
    orderDetails: OrderDetail[];
}

export class PaymentTransactionInitiation {
    paymentTransactionId: string;
}

export class CheckoutResponse {
    success: boolean;
}

export class Shipment {
    orderId: string;
    deliveryStatus: string;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export class ShipmentStatusUpdateResponse {
    success: boolean;
}

export class User {
    username: string;
    password: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;
}

export type ObjectId = any;
export type JSON = any;
type Nullable<T> = T | null;
