import PersonalDetail from "../modals/personal_details/personalDetail";
import FirebaseCollection from './firebaseCollection';


export default class PersonalDetailService extends FirebaseCollection<PersonalDetail>  {
	/**
	 *
	 */
	constructor() {
		super("PersonalDetails");
		
	}
	
}

// PersonalDetailService.personalDetailCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})
// PersonalDetailService.getPersonalDetail('g7fvDsheJH9liD6Z9yqN').then((i)=>{
// 	console.log(i.data);
// })

// PersonalDetailService.addPersonalDetail(data).then((i)=>{
// 	console.log(i);
// })