import { combineReducers } from "redux"
import tasks from "./tasks"
import priorities from "./priorities"
import statuses from "./statuses"
import users from "./users"

export default combineReducers({ tasks, priorities, statuses, users })