
export enum Tab {
  HOME = 'home',
  WALLET = 'wallet',
  LEADERBOARD = 'leaderboard',
  REFER = 'refer',
  PROFILE = 'profile'
}

export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface UserData {
  uid: string;
  username: string;
  email: string;
  gameUid: string;
  walletBalance: number;
  referralCode: string;
  referredBy?: string;
  totalWinnings: number;
  tournamentsPlayed: number;
  tournamentsWon: number;
  isOrganiser: boolean;
  organiserStatus: 'none' | 'pending' | 'approved' | 'rejected';
}

export interface Tournament {
  id: string;
  title: string;
  game: string;
  imageUrl: string;
  entryFee: number;
  prizePool: number;
  startTime: number;
  slots: number;
  joinedCount: number;
  status: 'upcoming' | 'live' | 'completed';
}

export interface Transaction {
  id: string;
  uid: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  status: TransactionStatus;
  timestamp: number;
  utr?: string;
  upiId?: string;
  method?: string;
}

export interface HeroBanner {
  id: string;
  imageUrl: string;
  link?: string;
}
