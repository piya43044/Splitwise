/** Group interface with attributes of group */
export interface Groups {
  name: string;
  about: string;
  groupMembers: GroupMembers[];
}

/** Group interface with attributes of group */
export interface EditGroup {
  name: string;
  about: string;
  createdBy : string;
}

/**  GroupGroupMembers interface with attributes of GroupMembers */
export interface GroupMembers {
  userId: string;
}

/** GroupResult interface with attributes of group result through api*/
export interface GroupResult {
  name: string;
  about: string;
  createdBy: string;
  isDeleted: false;
  groupMembers: GroupMembersResult[];
  id: string;

}

/** GroupMembersResult interface with attributes of group members result through api */
export interface GroupMembersResult {
  userId: string;
  name: string;
  groupId: string;
  isRemoved: false;
  dateOfJoin: string;
  lastModificationTime: string;
  lastModifierId: string;
  creationTime: string;
  creatorId: string;
  extraProperties: {};
  concurrencyStamp: string;
  id: string;
  isMember: boolean;
}

/** GroupMembersToAdd interface with attributes of Group Members of group */
export interface GroupMembersToAdd {
  userId: string;
  groupId: string;
}

/** GroupList interface with attributes of Members details of group */
export interface GroupList {
  name: string;
  about: string;
  createdBy: string;
  groupMembers: GroupMembersResult[];
  id: string;
  isDeleted: string;
}

/** GroupListResult interface with attributes of group list result through api */
export interface GroupListResult {
  totalCount: number;
  items: GroupList[];
}

/** UserProfile interface with the properties of user profile details */
export interface UserProfile {
  userName: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  isExternal: boolean;
  hasPassword: boolean;
  concurrencyStamp: string;
  extraProperties: {
    amountOwed: number;
    amountOwes: number;
    isRegistered: boolean;
    totalamount: number
  }
}

/** Friend list interface with the attributes of frienlist  */
export interface FriendList{
  id: string;
  userName: string;
  email: string;
}
