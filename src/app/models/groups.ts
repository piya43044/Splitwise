/** Group interface with attributes of group */
export interface Groups {
  name: string;
  about: string;
  groupMembers: GroupMembers[];
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
  groupMembers: [
    {
      userId: string;
      groupId: string;
      isRemoved: false;
      dateOfJoin: string;
      lastModificationTime: null;
      lastModifierId: null;
      creationTime: string;
      creatorId: string;
      extraProperties: {};
      concurrencyStamp: string;
      id: string;
    }
  ];
  id: string;

}

/** GroupGroupMembers interface with attributes of GroupMembers */
export interface GroupMembers {
  userId: string;
}

/** GroupMembersResult interface with attributes of group members result through api */
export interface GroupMembersResult {
  userId: string;
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
  groupMembers: string;
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
