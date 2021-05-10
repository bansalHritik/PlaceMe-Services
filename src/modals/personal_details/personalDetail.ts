import { BloodGroup } from '../../utils';
import Aadhar from './aadhar';
import Address from './address';
import FatherDetail from './fatherDetail';
import MotherDetail from './motherDetail';

export default interface PersonalDetail {
    aadhar: Aadhar,
    address: Address,
    bloodGroup: BloodGroup,
    dob: Date,
    email: string,
    emergencyContact: number,
    fatherDetails: FatherDetail,
    motherDetails: MotherDetail,
};
