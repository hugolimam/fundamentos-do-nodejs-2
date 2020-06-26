import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (soma: number, elemento: Transaction) => {
        if (elemento.type === 'income') soma += Number(elemento.value);
        return soma;
      },
      0,
    );
    const outcome = this.transactions.reduce(
      (soma: number, elemento: Transaction) => {
        if (elemento.type === 'outcome') soma += Number(elemento.value);
        return soma;
      },
      0,
    );
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };
    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
