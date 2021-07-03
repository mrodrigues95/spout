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

export type AuthorizeDirective = {
  __typename?: 'AuthorizeDirective';
  policy?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  apply: ApplyPolicy;
};

export type Classroom = Node & {
  __typename?: 'Classroom';
  id: Scalars['ID'];
  users?: Maybe<Array<Maybe<User>>>;
  discussions?: Maybe<Array<Maybe<Discussion>>>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  createdById: Scalars['Int'];
  createdBy: User;
  stateId: Scalars['Int'];
  state: State;
  deletedAt?: Maybe<Scalars['DateTime']>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CreateClassroomInput = {
  name: Scalars['String'];
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
  deletedFor: DelLogType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedClassrooms: Array<Classroom>;
  deletedDiscussions: Array<Discussion>;
  deletedMessages: Array<Message>;
};

export type DelLogType = {
  __typename?: 'DelLogType';
  id: Scalars['Int'];
  type: Scalars['String'];
  delLogs: Array<DelLog>;
};

export type Discussion = Node & {
  __typename?: 'Discussion';
  id: Scalars['ID'];
  createdBy: User;
  classroom: Classroom;
  messages?: Maybe<MessageConnection>;
  users: Array<User>;
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
  body: Scalars['String'];
  discussionId: Scalars['Int'];
  discussion: Discussion;
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

export type Mutation = {
  __typename?: 'Mutation';
  createClassroom: CreateClassroomPayload;
  sendDiscussionMessage: SendDiscussionMessagePayload;
  signUp: AuthPayload;
  login: AuthPayload;
  logout: AuthPayload;
  refreshSession: AuthPayload;
};


export type MutationCreateClassroomArgs = {
  input: CreateClassroomInput;
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
  users: Array<User>;
  userById: User;
  sessions: Array<Session>;
  sessionById: Session;
  classrooms: Array<Classroom>;
  classroomById: Classroom;
  classroomsById: Array<Classroom>;
  classroomsByUser: Array<Classroom>;
  discussions?: Maybe<DiscussionConnection>;
  discussionById: Discussion;
  discussionsById: Array<Discussion>;
  me?: Maybe<User>;
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
  body: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type SignUpInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

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
  classrooms?: Maybe<Array<Maybe<Classroom>>>;
  sessions?: Maybe<Array<Maybe<Session>>>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  email: Scalars['String'];
  stateId: Scalars['Int'];
  state: State;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userDiscussions: Array<UserDiscussion>;
  messages: Array<Message>;
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

export type UserDiscussion = {
  __typename?: 'UserDiscussion';
  discussionId: Scalars['Int'];
  discussion?: Maybe<Discussion>;
  userId: Scalars['Int'];
  user?: Maybe<User>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  code: Scalars['String'];
};

