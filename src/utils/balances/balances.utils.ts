import { ExpensesDataParams } from "../../components/expenses/Expenses";

export interface BalancesProps {
    participators: string[];
    expenses?: ExpensesDataParams[];
}

interface Balance {
    [participant: string]: number;
}

export default function calculateBalances({ participators, expenses }: BalancesProps): Balance {
    const balances: Balance = {};

    // Initialize balances for each participant to 0
    participators.forEach((participant) => {
        balances[participant] = 0;
    });

    // Check if there are expenses
    if (expenses && expenses.length > 0) {
        // Calculate balances based on expenses
        expenses.forEach((expense) => {
            const { paidBy, forWhom, price } = expense;
            const expenseShare = price / forWhom.length;

            // Deduct the share from the person who paid
            balances[paidBy.toLowerCase()] -= price;

            // Add the share to each person for whom the expense is shared
            forWhom.forEach((participant) => {
                balances[participant] += expenseShare;
            });
        });
    }

    // Make balances positive
    const positiveBalances: Balance = {};
    Object.keys(balances).forEach((participant) => {
        positiveBalances[participant] = -balances[participant];
    });

    return positiveBalances;
};