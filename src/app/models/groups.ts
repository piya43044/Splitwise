export interface Groups {

  name: string,
  about: string,
  groupMembers: GroupMembers[]
}
export interface GroupMembers {
  userId : string;
}

export interface GroupMembersToAdd {
  userId : string;
  groupId : string;
}
export interface GroupList {
    name: string
    about : string,
    createdBy : string,
    groupMembers : string,
    id : string,
    isDeleted : string,


}
