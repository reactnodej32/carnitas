import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "./admin/admin.reducer";
import usersReducer from "./users/users.reducer";
import courseReducer from "./course/course.reducer";
const persistConfig = {
  key: "root",
  storage,
  // We don't want to cache users, and course
  blacklist: ["users", "course"],
};

const rootReducer = combineReducers({
  admin: adminReducer,
  users: usersReducer,
  course: courseReducer,
});

export default persistReducer(persistConfig, rootReducer);
