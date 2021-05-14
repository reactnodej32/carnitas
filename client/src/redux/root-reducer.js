import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "./admin/admin.reducer";
import usersReducer from "./users/users.reducer";
const persistConfig = {
  key: "root",
  storage,
  // We don't want to cache users
  blacklist: ["users"],
};

const rootReducer = combineReducers({
  admin: adminReducer,
  users: usersReducer,
});

export default persistReducer(persistConfig, rootReducer);
