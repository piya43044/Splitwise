/**
  * TransactionList interface validate the data type of the transaction list
  */
export interface TransactionList {
    ownedBy: string,
    expenseId: string,
    amount: number,
    isSettled: boolean,
    expenseDto: string,
    lastModificationTime: string,
    lastModifierId: string,
    creationTime: string,
    creatorId: string,
    id: string,
    expenseName: string,
    ownedByName: string,
    creatorName: string;
}