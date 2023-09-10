import { RootState } from "../store";
import { GroupsState } from "./groups.reducer";


export default function selectGroups(state: RootState):GroupsState { return state.groups}
