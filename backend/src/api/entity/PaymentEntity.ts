export default class PaymentEntity {
    private _paymentId?: number;
    private _orderId?: number | null;
    private _paymentMethod?: string | null;
    private _paymentStatus?: string | null;
    private _paymentDate: string;
    private _paymentTime: string;
    private _transactionId?: string | null;
    private _amount: number;
    private _paymentGateway?: string | null;

    constructor(data: {
        paymentId?: number;
        orderId?: number | null;
        paymentMethod?: string | null;
        paymentStatus?: string | null;
        paymentDate?: string;
        paymentTime?: string;
        transactionId?: string | null;
        amount: number;
        paymentGateway?: string | null;
    }) {
        this._paymentId = data.paymentId;
        this._orderId = data.orderId;
        this._paymentMethod = data.paymentMethod;
        this._paymentStatus = data.paymentStatus;
        this._paymentDate = data.paymentDate || new Date().toISOString().split('T')[0];
        this._paymentTime = data.paymentTime || new Date().toTimeString().split(' ')[0];
        this._transactionId = data.transactionId;
        this._amount = data.amount;
        this._paymentGateway = data.paymentGateway;
    }

    get paymentId() { return this._paymentId; }
    get orderId() { return this._orderId; }
    get paymentMethod() { return this._paymentMethod; }
    get paymentStatus() { return this._paymentStatus; }
    get paymentDate() { return this._paymentDate; }
    get paymentTime() { return this._paymentTime; }
    get transactionId() { return this._transactionId; }
    get amount() { return this._amount; }
    get paymentGateway() { return this._paymentGateway; }

    static fromRow(row: any): PaymentEntity {
        return new PaymentEntity({
            paymentId: row.paymentId,
            orderId: row.orderId,
            paymentMethod: row.paymentMethod,
            paymentStatus: row.paymentStatus,
            paymentDate: row.paymentDate,
            paymentTime: row.paymentTime,
            transactionId: row.transactionId,
            amount: row.amount,
            paymentGateway: row.paymentGateway,
        });
    }

    toRow() {
        return {
            orderId: this._orderId,
            paymentMethod: this._paymentMethod,
            paymentStatus: this._paymentStatus,
            paymentDate: this._paymentDate,
            paymentTime: this._paymentTime,
            transactionId: this._transactionId,
            amount: this._amount,
            paymentGateway: this._paymentGateway,
        };
    }
}
