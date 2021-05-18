import { Company } from "../modals";
import { collection, OperationResult } from "./common";
import FirebaseCollection from './firebaseCollection'


export default class CompanyService extends FirebaseCollection<Company>{
	constructor() {
		super("Companies");
	}
}

// const data:Company = {
// 	  name: 'Apple',
// 	  type: 'product',
// 	  logo: 'https://pbs.twimg.com/profile_images/1370380607365246977/py2NQaCZ_400x400.pngQaCZ_400x400.png',
// 	  representatives: [  {
// 		mobile: 9639633699,
// 		email: 'tanya.jain@nagarro.com',
// 		name: 'tanya jain'
// 	  } ],
// 	  website: 'nagarro.com',
// 	  otherDetails: 'Bekar Company'
//   }


// CompanyService.companyCollection.get().then((i)=>{
// 		i.forEach((j) =>  console.log(j.id,"---->",j.data()))
// 	})

// CompanyService.getCompanyDetail('PDIwVSDUHZoc71y2qxeO').then((i)=>{
// 	console.log(i);
// })

// CompanyService.addCompanyDetail(data).then((i)=>{
// 	console.log(i);
// })