import { createSelector } from "reselect";
import { RootState } from "../store";
import { GroupsState } from "./groups.reducer";
import { GroupMap } from "./groups.types";
import { stringConverter } from "../../utils/format/format.utils";


export const selectGroups = (state: RootState): GroupsState => { return state.groups }

export const selectGroupsMap = createSelector(
    [selectGroups],
    (groups): GroupMap =>
        groups.value.reduce((acc, group) => {
            const { id, groupName, description, participators, expenses } = group;
            const title = stringConverter(groupName)            
            acc[title] = { id, groupName, description, participators, expenses };
            return acc;
        }, {} as GroupMap)
);
