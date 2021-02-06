export interface DueStudent {
  email: string;
  hostelName: string;
  mess: string;
  name: string;
  rollNumber: string;
  roomNumber: string;
  total: number;
}

export interface Due {
  _id: string;
  rollNumber: string;
  amount: number;
  message: string;
  date: number;
}
