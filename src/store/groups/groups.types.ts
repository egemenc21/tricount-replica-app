export interface Expense {
    id: number;
    title: string;
    price: number;
    date: string;
    paidBy: string;
    forWhom: string[];
}

export interface Group {
    id: number;
    groupName: string;
    description: string;
    participators: string[];
    expenses: Expense[];
}