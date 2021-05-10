import Repersentative from "./representative";

export default interface Company {
  id: string,
  name: string,
  type: string,
  repersentatives: Repersentative[],
  logo: string, 
  website: string, 
  otherDetails: string
}