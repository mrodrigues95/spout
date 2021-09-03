export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: string;
  /** The `Short` scalar type represents non-fractional signed whole 16-bit numeric values. Short can represent values between -(2^15) and 2^15 - 1. */
  Short: any;
  Uuid: any;
};




export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user?: Maybe<User>;
  session?: Maybe<Session>;
  isLoggedIn: Scalars['Boolean'];
  userErrors?: Maybe<Array<UserError>>;
};

export type Classroom = Node & {
  __typename?: 'Classroom';
  id: Scalars['ID'];
  users?: Maybe<Array<Maybe<User>>>;
  discussions?: Maybe<Array<Maybe<Discussion>>>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  stateId: Scalars['Int'];
  state: State;
  deletedAt?: Maybe<Scalars['DateTime']>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  invites: Array<ClassroomInvite>;
};

export type ClassroomInvite = {
  __typename?: 'ClassroomInvite';
  inviteId: Scalars['Int'];
  invite?: Maybe<Invite>;
  userId: Scalars['Int'];
  user?: Maybe<User>;
  classroomId: Scalars['Int'];
  classroom?: Maybe<Classroom>;
  isInviter: Scalars['Boolean'];
  isInvitee: Scalars['Boolean'];
  usedAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type ClassroomSortInput = {
  id?: Maybe<SortEnumType>;
  guid?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  stateId?: Maybe<SortEnumType>;
  state?: Maybe<StateSortInput>;
  deletedAt?: Maybe<SortEnumType>;
  delLogId?: Maybe<SortEnumType>;
  delLog?: Maybe<DelLogSortInput>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

export type CreateClassroomInput = {
  name: Scalars['String'];
};

export type CreateClassroomInviteInput = {
  classroomId: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  maxAge?: Maybe<Scalars['Int']>;
  maxUses?: Maybe<Scalars['Short']>;
};

export type CreateClassroomInvitePayload = {
  __typename?: 'CreateClassroomInvitePayload';
  invite: Invite;
};

export type CreateClassroomPayload = {
  __typename?: 'CreateClassroomPayload';
  classroom?: Maybe<Classroom>;
  userErrors?: Maybe<Array<UserError>>;
};


export type DelLog = {
  __typename?: 'DelLog';
  id: Scalars['Int'];
  deletedForId: Scalars['Int'];
  deletedFor?: Maybe<DelLogType>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedClassrooms: Array<Classroom>;
  deletedDiscussions: Array<Discussion>;
  deletedMessages: Array<Message>;
};

export type DelLogSortInput = {
  id?: Maybe<SortEnumType>;
  deletedForId?: Maybe<SortEnumType>;
  deletedFor?: Maybe<DelLogTypeSortInput>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

export type DelLogType = {
  __typename?: 'DelLogType';
  id: Scalars['Int'];
  type: Scalars['String'];
  delLogs: Array<DelLog>;
};

export type DelLogTypeSortInput = {
  id?: Maybe<SortEnumType>;
  type?: Maybe<SortEnumType>;
};

export type Discussion = Node & {
  __typename?: 'Discussion';
  id: Scalars['ID'];
  createdBy: User;
  classroom: Classroom;
  messages?: Maybe<MessageConnection>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  classroomId: Scalars['Int'];
  createdById: Scalars['Int'];
  stateId: Scalars['Int'];
  state: State;
  deletedAt?: Maybe<Scalars['DateTime']>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type DiscussionMessagesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  order?: Maybe<Array<MessageSortInput>>;
};

/** A connection to a list of items. */
export type DiscussionConnection = {
  __typename?: 'DiscussionConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<DiscussionEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Discussion>>;
};

/** An edge in a connection. */
export type DiscussionEdge = {
  __typename?: 'DiscussionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Discussion;
};

export type DiscussionMessageSubscriptionPayload = {
  __typename?: 'DiscussionMessageSubscriptionPayload';
  discussion: Discussion;
  message: Message;
  discussionId: Scalars['ID'];
  messageId: Scalars['ID'];
};

export type DiscussionSortInput = {
  id?: Maybe<SortEnumType>;
  guid?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  classroomId?: Maybe<SortEnumType>;
  classroom?: Maybe<ClassroomSortInput>;
  createdById?: Maybe<SortEnumType>;
  createdBy?: Maybe<UserSortInput>;
  stateId?: Maybe<SortEnumType>;
  state?: Maybe<StateSortInput>;
  deletedAt?: Maybe<SortEnumType>;
  delLogId?: Maybe<SortEnumType>;
  delLog?: Maybe<DelLogSortInput>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

export type Invite = {
  __typename?: 'Invite';
  id: Scalars['Int'];
  code: Scalars['String'];
  uses: Scalars['Short'];
  maxUses?: Maybe<Scalars['Short']>;
  maxAge?: Maybe<Scalars['Int']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  logs: Array<ClassroomInvite>;
};

export type JoinClassroomInput = {
  code: Scalars['String'];
};

export type JoinClassroomPayload = {
  __typename?: 'JoinClassroomPayload';
  classroom?: Maybe<Classroom>;
  userErrors?: Maybe<Array<UserError>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutInput = {
  sessionId: Scalars['ID'];
};

export type Message = Node & {
  __typename?: 'Message';
  id: Scalars['ID'];
  createdBy: User;
  content: Scalars['String'];
  discussionId: Scalars['Int'];
  discussion?: Maybe<Discussion>;
  createdById: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<MessageEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Message>>;
};

/** An edge in a connection. */
export type MessageEdge = {
  __typename?: 'MessageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Message;
};

export type MessageSortInput = {
  id?: Maybe<SortEnumType>;
  content?: Maybe<SortEnumType>;
  discussionId?: Maybe<SortEnumType>;
  discussion?: Maybe<DiscussionSortInput>;
  createdById?: Maybe<SortEnumType>;
  createdBy?: Maybe<UserSortInput>;
  deletedAt?: Maybe<SortEnumType>;
  delLogId?: Maybe<SortEnumType>;
  delLog?: Maybe<DelLogSortInput>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClassroom: CreateClassroomPayload;
  joinClassroom: JoinClassroomPayload;
  createClassroomInvite: CreateClassroomInvitePayload;
  sendDiscussionMessage: SendDiscussionMessagePayload;
  signUp: AuthPayload;
  login: AuthPayload;
  logout: AuthPayload;
  refreshSession: AuthPayload;
};


export type MutationCreateClassroomArgs = {
  input: CreateClassroomInput;
};


export type MutationJoinClassroomArgs = {
  input: JoinClassroomInput;
};


export type MutationCreateClassroomInviteArgs = {
  input: CreateClassroomInviteInput;
};


export type MutationSendDiscussionMessageArgs = {
  input: SendDiscussionMessageInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLogoutArgs = {
  input: LogoutInput;
};


export type MutationRefreshSessionArgs = {
  input: RefreshSessionInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  me?: Maybe<User>;
  users: Array<User>;
  userById: User;
  sessions: Array<Session>;
  sessionById: Session;
  classrooms: Array<Classroom>;
  classroomById: Classroom;
  classroomsById: Array<Classroom>;
  discussions?: Maybe<DiscussionConnection>;
  discussionById: Discussion;
  discussionsById: Array<Discussion>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySessionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryClassroomByIdArgs = {
  id: Scalars['ID'];
};


export type QueryClassroomsByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryDiscussionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryDiscussionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryDiscussionsByIdArgs = {
  ids: Array<Scalars['ID']>;
};

export type RefreshSessionInput = {
  sessionId: Scalars['ID'];
};

export type SendDiscussionMessageInput = {
  discussionId: Scalars['ID'];
  content: Scalars['String'];
};

export type SendDiscussionMessagePayload = {
  __typename?: 'SendDiscussionMessagePayload';
  message?: Maybe<Message>;
  userErrors?: Maybe<Array<UserError>>;
};

export type Session = Node & {
  __typename?: 'Session';
  id: Scalars['ID'];
  user?: Maybe<User>;
  userId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type SignUpInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type State = {
  __typename?: 'State';
  id: Scalars['Int'];
  status: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
  classrooms: Array<Classroom>;
  discussions: Array<Discussion>;
};

export type StateSortInput = {
  id?: Maybe<SortEnumType>;
  status?: Maybe<SortEnumType>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onDiscussionMessageReceived: DiscussionMessageSubscriptionPayload;
};


export type SubscriptionOnDiscussionMessageReceivedArgs = {
  discussionId: Scalars['ID'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  classrooms: Array<Classroom>;
  sessions: Array<Session>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  email: Scalars['String'];
  stateId: Scalars['Int'];
  state?: Maybe<State>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  messages: Array<Message>;
  invites: Array<ClassroomInvite>;
  userName?: Maybe<Scalars['String']>;
  normalizedUserName?: Maybe<Scalars['String']>;
  normalizedEmail?: Maybe<Scalars['String']>;
  emailConfirmed: Scalars['Boolean'];
  passwordHash?: Maybe<Scalars['String']>;
  securityStamp?: Maybe<Scalars['String']>;
  concurrencyStamp?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberConfirmed: Scalars['Boolean'];
  twoFactorEnabled: Scalars['Boolean'];
  lockoutEnd?: Maybe<Scalars['DateTime']>;
  lockoutEnabled: Scalars['Boolean'];
  accessFailedCount: Scalars['Int'];
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  code: Scalars['String'];
};

export type UserSortInput = {
  guid?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  email?: Maybe<SortEnumType>;
  stateId?: Maybe<SortEnumType>;
  state?: Maybe<StateSortInput>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
  id?: Maybe<SortEnumType>;
  userName?: Maybe<SortEnumType>;
  normalizedUserName?: Maybe<SortEnumType>;
  normalizedEmail?: Maybe<SortEnumType>;
  emailConfirmed?: Maybe<SortEnumType>;
  passwordHash?: Maybe<SortEnumType>;
  securityStamp?: Maybe<SortEnumType>;
  concurrencyStamp?: Maybe<SortEnumType>;
  phoneNumber?: Maybe<SortEnumType>;
  phoneNumberConfirmed?: Maybe<SortEnumType>;
  twoFactorEnabled?: Maybe<SortEnumType>;
  lockoutEnd?: Maybe<SortEnumType>;
  lockoutEnabled?: Maybe<SortEnumType>;
  accessFailedCount?: Maybe<SortEnumType>;
};

