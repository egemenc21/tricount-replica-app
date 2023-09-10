import { RootState } from "../store";
import { EachGroupState } from "./each-group.reducer";


export default function selectEachGroup(state: RootState):EachGroupState { return state.eachGroup}
