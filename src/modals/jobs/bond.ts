import Period from "./period";

export default interface Bond {
	amount: number;
	doesExist: boolean;
	period: Period;
}
