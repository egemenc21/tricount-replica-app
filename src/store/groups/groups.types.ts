export interface Expense {
    id: string;
    title: string;
    price: number;
    date: string;
    paidBy: string;
    forWhom: string[];
}

export interface Group {
    id: string;
    title: string;
    description: string;
    participators: string[];
    expenses: Expense[];
}
export interface GroupMap  {
    [key:string]:Group;
  }

