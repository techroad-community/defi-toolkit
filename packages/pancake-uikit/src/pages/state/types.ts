export enum PoolCategory {
  "COMMUNITY" = "Community",
  "CORE" = "Core",
  "BINANCE" = "Binance", // Pools using native BNB behave differently than pools using a token
  "AUTO" = "Auto",
}
export enum PredictionStatus {
  INITIAL = "initial",
  LIVE = "live",
  PAUSED = "paused",
  ERROR = "error",
}
export enum HistoryFilter {
  ALL = "all",
  COLLECTED = "collected",
  UNCOLLECTED = "uncollected",
}
export enum VotingStateLoadingStatus {
  INITIAL = "initial",
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}
export enum LeaderboardLoadingState {
  INITIAL,
  LOADING,
  IDLE,
}

export enum BetPosition {
  BULL = "Bull",
  BEAR = "Bear",
  HOUSE = "House",
}

export enum ProposalState {
  ACTIVE = "active",
  PENDING = "pending",
  CLOSED = "closed",
}
interface RoundData {
  [key: string]: ReduxNodeRound;
}

export interface ReduxNodeRound {
  epoch: number;
  startTimestamp: number | null;
  lockTimestamp: number | null;
  closeTimestamp: number | null;
  lockPrice: BigNumberToJson | null;
  closePrice: BigNumberToJson | null;
  totalAmount: BigNumberToJson;
  bullAmount: BigNumberToJson;
  bearAmount: BigNumberToJson;
  rewardBaseCalAmount: BigNumberToJson;
  rewardAmount: BigNumberToJson;
  oracleCalled: boolean;
  lockOracleId: string;
  closeOracleId: string;
}

export interface BigNumberToJson {
  type: "BigNumber";
  hex: string;
}

export interface DeserializedPool {
  earningToken?: {
    chainId: number;
    address: string;
    decimals: number;
    symbol?: string;
    name?: string;
    projectLink?: string;
  };
  stakingToken?: {
    chainId: number;
    address: string;
    decimals: number;
    symbol?: string;
    name?: string;
    projectLink?: string;
  };
  sousId: number;
  contractAddress?: {
    97?: string;
    56: string;
  };
  startBlock?: number;
  endBlock?: number;
  apr?: number;
  stakingTokenPrice?: number;
  earningTokenPrice?: number;
  isAutoVault?: boolean;
  poolCategory: PoolCategory;
  tokenPerBlock: string;
  sortOrder?: number;
  harvest?: boolean;
  isFinished?: boolean;
  enableEmergencyWithdraw?: boolean;
  totalStaked?: number;
  stakingLimit?: number;
  userData?: {
    allowance: number;
    stakingTokenBalance: number;
    stakedBalance: number;
    pendingReward: number;
  };
}

export type CampaignType = "ifo" | "teambattle" | "participation";

export type TranslatableText =
  | string
  | {
      key: string;
      data?: {
        [key: string]: string | number;
      };
    };
export interface Achievement {
  id: string;
  type: CampaignType;
  address: string;
  title: TranslatableText;
  description?: TranslatableText;
  badge: string;
  points: number;
}

export interface AchievementState {
  data: Achievement[];
}

export interface BlockState {
  currentBlock: number;
  initialBlock: number;
}
export interface Address {
  97?: string;
  56: string;
}

// bet

export interface Bet {
  id?: string;
  hash?: string;
  amount: number;
  position: BetPosition;
  claimed: boolean;
  claimedAt: number;
  claimedBlock: number;
  claimedHash: string;
  claimedBNB: number;
  claimedNetBNB: number;
  createdAt: number;
  updatedAt: number;
  user?: PredictionUser;
  round?: Round;
}
export interface Round {
  id: string;
  epoch: number;
  position: BetPosition;
  failed: boolean;
  startAt: number;
  startBlock: number;
  startHash: string;
  lockAt: number;
  lockBlock: number;
  lockHash: string;
  lockPrice: number;
  lockRoundId: string;
  closeAt: number;
  closeBlock: number;
  closeHash: string;
  closePrice: number;
  closeRoundId: string;
  totalBets: number;
  totalAmount: number;
  bullBets: number;
  bullAmount: number;
  bearBets: number;
  bearAmount: number;
  bets?: Bet[];
}
export interface PredictionUser {
  id: string;
  createdAt: number;
  updatedAt: number;
  block: number;
  totalBets: number;
  totalBetsBull: number;
  totalBetsBear: number;
  totalBNB: number;
  totalBNBBull: number;
  totalBNBBear: number;
  totalBetsClaimed: number;
  totalBNBClaimed: number;
  winRate: number;
  averageBNB: number;
  netBNB: number;
  bets?: Bet[];
}

interface FarmConfigBaseProps {
  pid: number;
  lpSymbol: string;
  lpAddresses: Address;
  multiplier?: string;
  isCommunity?: boolean;
  dual?: {
    rewardPerBlock: number;
    earnLabel: string;
    endBlock: number;
  };
}
export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  projectLink?: string;
}
export interface SerializedFarmConfig extends FarmConfigBaseProps {
  token: SerializedToken;
  quoteToken: SerializedToken;
}
export type SerializedBigNumber = string;
interface SerializedFarmUserData {
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}
export interface SerializedFarm extends SerializedFarmConfig {
  tokenPriceBusd?: string;
  quoteTokenPriceBusd?: string;
  tokenAmountTotal?: SerializedBigNumber;
  lpTotalInQuoteToken?: SerializedBigNumber;
  lpTotalSupply?: SerializedBigNumber;
  tokenPriceVsQuote?: SerializedBigNumber;
  poolWeight?: SerializedBigNumber;
  userData?: SerializedFarmUserData;
}

export interface SerializedFarmsState {
  data: SerializedFarm[];
  loadArchivedFarmsData: boolean;
  userDataLoaded: boolean;
}

interface PoolConfigBaseProps {
  sousId: number;
  contractAddress: Address;
  poolCategory: PoolCategory;
  tokenPerBlock: string;
  sortOrder?: number;
  harvest?: boolean;
  isFinished?: boolean;
  enableEmergencyWithdraw?: boolean;
}

export interface SerializedPoolConfig extends PoolConfigBaseProps {
  earningToken: SerializedToken;
  stakingToken: SerializedToken;
}
interface CorePoolProps {
  startBlock?: number;
  endBlock?: number;
  apr?: number;
  stakingTokenPrice?: number;
  earningTokenPrice?: number;
  isAutoVault?: boolean;
}

export interface SerializedPool extends SerializedPoolConfig, CorePoolProps {
  totalStaked?: SerializedBigNumber;
  stakingLimit?: SerializedBigNumber;
  userData?: {
    allowance: SerializedBigNumber;
    stakingTokenBalance: SerializedBigNumber;
    stakedBalance: SerializedBigNumber;
    pendingReward: SerializedBigNumber;
  };
}
export interface VaultFees {
  performanceFee: number;
  callFee: number;
  withdrawalFee: number;
  withdrawalFeePeriod: number;
}
export interface CakeVault {
  totalShares?: string;
  pricePerFullShare?: string;
  totalCakeInVault?: string;
  estimatedCakeBountyReward?: string;
  totalPendingCakeHarvest?: string;
  fees?: VaultFees;
  userData?: VaultUser;
}
export interface VaultUser {
  isLoading: boolean;
  userShares: string;
  cakeAtLastUserAction: string;
  lastDepositedTime: string;
  lastUserActionTime: string;
}
export interface PoolsState {
  data: SerializedPool[];
  cakeVault: CakeVault;
  userDataLoaded: boolean;
}

export interface LedgerData {
  [key: string]: {
    [key: string]: ReduxNodeLedger;
  };
}
export interface ReduxNodeLedger {
  position: BetPosition;
  amount: BigNumberToJson;
  claimed: boolean;
}
export type Images = {
  lg: string;
  md: string;
  sm: string;
  ipfs?: string;
};
export type NftImages = {
  blur?: string;
} & Images;

export type Nft = {
  id?: number | string;
  name: string;
  description: string;
  images: NftImages;
  video?: {
    webm: string;
    mp4: string;
  };

  // Uniquely identifies the nft.
  // Used for matching an NFT from the config with the data from the NFT's tokenURI
  identifier: string;

  attributes?: any;
};
export type Team = {
  id: number;
  name: string;
  description: string;
  isJoinable?: boolean;
  users: number;
  points: number;
  images: TeamImages;
  background: string;
  textColor: string;
};
export type TeamImages = {
  alt: string;
} & Images;

export interface Profile {
  userId: number;
  points: number;
  teamId: number;
  nftAddress: string;
  tokenId: number;
  isActive: boolean;
  username: string;
  nft?: Nft;
  team: Team;
  hasRegistered: boolean;
}

export interface ProfileState {
  isInitialized: boolean;
  isLoading: boolean;
  hasRegistered: boolean;
  data: Profile;
  profileAvatars: {
    [key: string]: {
      username: string;
      nft: Nft;
    };
  };
}
export interface LeaderboardFilter {
  address?: string;
  orderBy?: string;
  timePeriod?: LeaderboardFilterTimePeriod;
}
export type LeaderboardFilterTimePeriod = "1d" | "7d" | "1m" | "all";

interface PredictionsState {
  status: PredictionStatus;
  isLoading: boolean;
  isHistoryPaneOpen: boolean;
  isChartPaneOpen: boolean;
  isFetchingHistory: boolean;
  historyFilter: HistoryFilter;
  currentEpoch: number;
  intervalSeconds: number;
  minBetAmount: string;
  bufferSeconds: number;
  lastOraclePrice: string;
  history: Bet[];
  totalHistory: number;
  currentHistoryPage: number;
  hasHistoryLoaded: boolean;
  rounds?: RoundData;
  ledgers?: LedgerData;
  claimableStatuses: {
    [key: string]: boolean;
  };
  leaderboard: {
    loadingState: LeaderboardLoadingState;
    filters: LeaderboardFilter;
    skip: number;
    hasMoreResults: boolean;
    addressResults: {
      [key: string]: PredictionUser;
    };
    results: PredictionUser[];
  };
}
export type TeamsById = {
  [key: string]: Team;
};

export interface TeamsState {
  isInitialized: boolean;
  isLoading: boolean;
  data: TeamsById;
}
export interface CollectiblesState {
  isInitialized: boolean;
  isLoading: boolean;
  data: {
    [key: string]: number[];
  };
}
export interface Space {
  id: string;
  name: string;
}

export interface Proposal {
  author: string;
  body: string;
  choices: string[];
  end: number;
  id: string;
  snapshot: string;
  space: Space;
  start: number;
  state: ProposalState;
  title: string;
}

export interface Vote {
  id: string;
  voter: string;
  created: number;
  space: Space;
  proposal: {
    choices: Proposal["choices"];
  };
  choice: number;
  metadata?: {
    votingPower: string;
    verificationHash: string;
  };
  _inValid?: boolean;
}

export interface VotingState {
  proposalLoadingStatus: VotingStateLoadingStatus;
  proposals: {
    [key: string]: Proposal;
  };
  voteLoadingStatus: VotingStateLoadingStatus;
  votes: {
    [key: string]: Vote[];
  };
}
export enum LotteryStatus {
  PENDING = "pending",
  OPEN = "open",
  CLOSE = "close",
  CLAIMABLE = "claimable",
}
interface LotteryRoundGenerics {
  isLoading?: boolean;
  lotteryId: string;
  status: LotteryStatus;
  startTime: string;
  endTime: string;
  treasuryFee: string;
  firstTicketId: string;
  lastTicketId: string;
  finalNumber: number;
}
export interface LotteryResponse extends LotteryRoundGenerics {
  priceTicketInCake: SerializedBigNumber;
  discountDivisor: SerializedBigNumber;
  amountCollectedInCake: SerializedBigNumber;
  cakePerBracket: SerializedBigNumber[];
  countWinnersPerBracket: SerializedBigNumber[];
  rewardsBreakdown: SerializedBigNumber[];
}
export interface LotteryRoundGraphEntity {
  id: string;
  totalUsers: string;
  totalTickets: string;
  winningTickets: string;
  status: LotteryStatus;
  finalNumber: string;
  startTime: string;
  endTime: string;
  ticketPrice: SerializedBigNumber;
}
export interface LotteryUserGraphEntity {
  account: string;
  totalCake: string;
  totalTickets: string;
  rounds: UserRound[];
}

export interface UserRound {
  claimed: boolean;
  lotteryId: string;
  status: LotteryStatus;
  endTime: string;
  totalTickets: string;
  tickets?: LotteryTicket[];
}
export interface LotteryTicket {
  id: string;
  number: string;
  status: boolean;
  rewardBracket?: number;
  roundId?: string;
  cakeReward?: string;
}

export interface LotteryState {
  currentLotteryId: string;
  maxNumberTicketsPerBuyOrClaim: string;
  isTransitioning: boolean;
  currentRound: LotteryResponse & { userTickets?: LotteryRoundUserTickets };
  lotteriesData?: LotteryRoundGraphEntity[];
  userLotteryData?: LotteryUserGraphEntity;
}
export interface LotteryRoundUserTickets {
  isLoading?: boolean;
  tickets?: LotteryTicket[];
}

export interface State {
  achievements: AchievementState;
  block: BlockState;
  farms: SerializedFarmsState;
  pools: PoolsState;
  predictions: PredictionsState;
  profile: ProfileState;
  teams: TeamsState;
  collectibles: CollectiblesState;
  voting: VotingState;
  lottery: LotteryState;
}
