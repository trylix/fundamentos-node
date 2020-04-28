import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const income = transactions
      .filter(({ type }) => type === 'income')
      .reduce(
        (acumulator, actualElement) => acumulator + Number(actualElement.value),
        0,
      );

    const outcome = transactions
      .filter(({ type }) => type === 'outcome')
      .reduce(
        (acumulator, actualElement) => acumulator + Number(actualElement.value),
        0,
      );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
