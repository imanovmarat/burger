import { changeUserDataRequest } from "../../utils/api";

export const USER_FORM_SET_VALUE = 'USER_FORM_SET_VALUE';

export const USER_FORM_SUBMIT = 'USER_FORM_SUBMIT';
export const USER_FORM_SUBMIT_SUCCESS = 'USER_FORM_SUBMIT_SUCCESS';
export const USER_FORM_SUBMIT_FAILED = 'USER_FORM_SUBMIT_FAILED';


export const setUserForm = (field, value) => ({
  type: USER_FORM_SET_VALUE,
  field,
  value
});

export function userForm({ email, name, password }) {
  return async function (dispatch) {
    dispatch({ type: USER_FORM_SUBMIT });
    await changeUserDataRequest({ email, name, password })
      .then(res => {
        if (res && res.success) {
          dispatch({
                     type: USER_FORM_SUBMIT_SUCCESS,
                     payload: res.user
                   });

        } else {
          dispatch({
                     type: USER_FORM_SUBMIT_FAILED
                   });
        }
      })
      .catch(err => {
               console.log('Error: ' + err);
               dispatch({
                          type: USER_FORM_SUBMIT_FAILED
                        });
             }
      )
  }
}

