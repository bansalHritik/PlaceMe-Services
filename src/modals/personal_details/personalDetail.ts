import { BloodGroup } from '../../utils';
import Aadhar from './aadhar';
import Address from './address';
import FatherDetail from './fatherDetail';
import MotherDetail from './motherDetail';
import { firebase } from '../../firebase'

export default interface PersonalDetail {
    aadhar: Aadhar,
    address: Address,
    bloodGroup: BloodGroup,
    dob: firebase.firestore.Timestamp | Date,
    email: string,
    emergencyContact: number,
    father: FatherDetail,
    mother: MotherDetail,
};

