import {Types} from "mongoose";

const _idConvertor = (_id: string) => new Types.ObjectId(_id);

const _idDestructor = (_id: any) => {
    try {
        return _id.toString();
    } catch (err) {
        return String(_id);
    }
};

export {_idConvertor, _idDestructor};
