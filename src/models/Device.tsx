export default class Device {
    name: string;
    description: string;
    _id?: string;
    createTime: Date;

    constructor(name: string, description: string, _id?: string) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.createTime = new Date();
    }
}
