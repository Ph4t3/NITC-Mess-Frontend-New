export interface DueAdd {
  rollNumber: string;
  amount: number;
  message: string;
  date: number;
}

export interface ListDue {
  rollNumber: string;
}

export interface MessCut {
  rollNumber: string;
  start: number;
  end: number;
}
