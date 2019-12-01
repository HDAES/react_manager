/**
 * Reducer 数据处理
 */
import { type } from "../action";
const initialState = {
  menuName: "首页",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.SWITH_MENU:
      return {
          ...state,
          menuName:action.menuName
      }
    default :
      return{
        ...state
      }  
  }
};
