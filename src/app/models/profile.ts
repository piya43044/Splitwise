/** UserProfile interface with the properties of user profile details */
export interface Profile {
  userName: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  isExternal: boolean;
  hasPassword: boolean;
  concurrencyStamp: string;
  extraProperties: ExtraProperties;
}

/** ExtraProperties interface with the properties of user profile details */
export interface ExtraProperties {
  amountOwed: number;
  amountOwes: number;
  isRegistered: boolean;
  totalamount: number
}

/** BorrowedAmountDetails interface with the properties of user's borrowed amount details*/
export interface BorrowedAmountDetails{
  amount: number;
  whomeToGive: string;
  groupName: string;
  message: string;
}

/** BorrowedAmountDetails interface with the properties of user's debt amount details*/
export interface DebtAmountDetails{
  owesFromYou: string;
  amount: number;
  groupName: string;
  message: string;
}

/** CurrentUserNameByIdResult interface with the properties of other user's details through api*/
export interface CurrentUserNameByIdResult{
  tenantId: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: number;
  phoneNumberConfirmed: boolean;
  isActive: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: boolean;
  concurrencyStamp: string;
  entityVersion: number;
  isDeleted: boolean;
  deleterId: string;
  deletionTime: string;
  lastModificationTime: string;
  lastModifierId: string;
  creationTime: string;
  creatorId: string;
  id: string;
  extraProperties: {
    amountOwed: number;
    amountOwes: number;
    isRegistered: boolean;
    totalamount: number;
  }
}
