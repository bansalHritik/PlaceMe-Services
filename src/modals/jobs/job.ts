import Salary from "./salary";
import Bond from "./bond";
import Period from "./period";
import Round from "./round";

export default interface Job {
id: string,
title:string,
description:string,
salary: Salary,
bond: Bond,
doesExist: boolean,
amount: number,
period: Period,
forBatch: string[],
lastDateToApply: Date,
isActive: boolean,
rounds: Round[],
company: string,
job: Job,
forCourse: string[]
maxBacklogs: number
forDepartments: string[],
postDate: Date,
placedStudents: string[]
}