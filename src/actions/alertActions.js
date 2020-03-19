import {
    SHOW_ALERT,
    HIDE_ALERT
  } from "../types";


  // show alert

  export function showAlert(alert) {
      return (dispatch) => {
          dispatch(createAlert(alert))
      }
  }
  export function hideAlert() {
    return (dispatch) => {
        dispatch(deleteAlert())
    }
}

  const createAlert = alert => ({
      type: SHOW_ALERT,
      payload: alert
  })
  const deleteAlert = () => ({
      type: HIDE_ALERT
  })