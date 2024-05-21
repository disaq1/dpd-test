interface IDataDob {
    date: string;
    age: number;
}
interface IDataId {
    name: string;
    value: string;
}
interface IDataLocationStreet {
    number: number;
    name: string;
}
interface IDataLocationCoordinates {
    latitude: string;
    longitude: string;
}
interface IDataLocationTimezone {
    description: string;
    offset: string;
}
interface IDataLocation {
    street: IDataLocationStreet;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: IDataLocationCoordinates;
    timezone: IDataLocationTimezone;
}
interface IDataLogin {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
}
interface IDataName {
    title: string;
    first: string;
    last: string;
}
interface IDataPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface IDataRegistered {
    date: string;
    age: number;
}
export interface IData {
    cell: string;
    dob: IDataDob;
    email: string;
    gender: string;
    id: IDataId;
    location: IDataLocation;
    login: IDataLogin;
    name: IDataName;
    nat: string;
    phone: string;
    picture: IDataPicture;
    registered: IDataRegistered;
}
