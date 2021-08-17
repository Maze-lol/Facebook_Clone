import { ERROR } from "../../constant/actionTypes";

const initial = {
  msg: {},
  status: null,
};

export default function (state = initial, action) {
  switch (action.type) {
    case ERROR:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
