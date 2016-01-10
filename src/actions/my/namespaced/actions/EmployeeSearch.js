/* Action types*/

export const EMP_SEARCH='EMP_SEARCH';
export const EMP_ADD='EMP_ADD';
export const EMP_UPDATE='EMP_UPDATE';

/* Other Constants*/
export const Employee_Actions ={
    EMP_SEARCH:'EMP_SEARCH',
    EMP_ADD:'EMP_ADD',
    EMP_UPDATE:'EMP_UPDATE'
 }

/*Action Creators */
export function addEMployee(text){
    return {type:EMP_ADD,text};
}

export function searchEmployee(text){
    return {type:EMP_SEARCH,text}
}

export function updateEmployee(text){
    return {type:EMP_UPDATE,text}
}