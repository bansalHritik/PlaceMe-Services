export type { default as BloodGroup } from './bloodGroup';
export type { default as Role } from './role';

const isObject = (obj: any) => typeof obj === 'object';

export const map = (source: any, target: any) => {
    if (!isObject(source) || !isObject(target)) {
        return;
    }

    Object.keys(source).forEach((key) => {
        const sourceValue = source[key];
        const targetValue = target[key];
        if (!targetValue || !isObject(sourceValue) || !isObject(targetValue)) {
            target[key] = source[key];
        } else {
            map(source[key], target[key]);
        }
    });
};