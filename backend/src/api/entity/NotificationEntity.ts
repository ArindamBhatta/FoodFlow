export default class NotificationEntity {
    private _notificationId?: number;
    private _personId?: number | null;
    private _notificationType?: string | null;
    private _title: string;
    private _message: string;
    private _isRead: boolean;
    private _createdAt: Date;
    private _relatedEntityType?: string | null;
    private _relatedEntityId?: number | null;

    constructor(data: {
        notificationId?: number;
        personId?: number | null;
        notificationType?: string | null;
        title: string;
        message: string;
        isRead?: boolean;
        createdAt?: Date;
        relatedEntityType?: string | null;
        relatedEntityId?: number | null;
    }) {
        this._notificationId = data.notificationId;
        this._personId = data.personId;
        this._notificationType = data.notificationType;
        this._title = data.title;
        this._message = data.message;
        this._isRead = data.isRead ?? false;
        this._createdAt = data.createdAt || new Date();
        this._relatedEntityType = data.relatedEntityType;
        this._relatedEntityId = data.relatedEntityId;
    }

    get notificationId() { return this._notificationId; }
    get personId() { return this._personId; }
    get notificationType() { return this._notificationType; }
    get title() { return this._title; }
    get message() { return this._message; }
    get isRead() { return this._isRead; }
    get createdAt() { return this._createdAt; }
    get relatedEntityType() { return this._relatedEntityType; }
    get relatedEntityId() { return this._relatedEntityId; }

    static fromRow(row: any): NotificationEntity {
        return new NotificationEntity({
            notificationId: row.notificationId,
            personId: row.personId,
            notificationType: row.notificationType,
            title: row.title,
            message: row.message,
            isRead: row.isRead,
            createdAt: row.createdAt,
            relatedEntityType: row.relatedEntityType,
            relatedEntityId: row.relatedEntityId,
        });
    }

    toRow() {
        return {
            personId: this._personId,
            notificationType: this._notificationType,
            title: this._title,
            message: this._message,
            isRead: this._isRead,
            createdAt: this._createdAt,
            relatedEntityType: this._relatedEntityType,
            relatedEntityId: this._relatedEntityId,
        };
    }
}
