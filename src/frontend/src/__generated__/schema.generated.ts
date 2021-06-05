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

export type Classroom = Node & {
  __typename?: 'Classroom';
  id: Scalars['ID'];
  users?: Maybe<Array<Maybe<User>>>;
  discussions?: Maybe<Array<Maybe<Discussion>>>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  createdById: Scalars['Int'];
  createdBy: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
};

export type CreateClassroomInput = {
  name: Scalars['String'];
};

export type CreateClassroomPayload = {
  __typename?: 'CreateClassroomPayload';
  classroom?: Maybe<Classroom>;
  userErrors?: Maybe<Array<UserError>>;
};


export type Discussion = Node & {
  __typename?: 'Discussion';
  id: Scalars['ID'];
  createdBy?: Maybe<User>;
  classroom?: Maybe<Classroom>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  classroomId: Scalars['Int'];
  createdById: Scalars['Int'];
  userDiscussions: Array<UserDiscussion>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutInput = {
  sessionId: Scalars['ID'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  discussionId: Scalars['Int'];
  discussion: Discussion;
  createdById: Scalars['Int'];
  createdBy: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClassroom: CreateClassroomPayload;
  signUp: AuthPayload;
  login: AuthPayload;
  logout: AuthPayload;
  refreshSession: AuthPayload;
};


export type MutationCreateClassroomArgs = {
  input: CreateClassroomInput;
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

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID'];
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
  discussions: Array<Discussion>;
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


export type QueryDiscussionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryDiscussionsByIdArgs = {
  ids: Array<Scalars['ID']>;
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

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  classrooms?: Maybe<Array<Maybe<Classroom>>>;
  sessions?: Maybe<Array<Maybe<Session>>>;
  guid: Scalars['Uuid'];
  name: Scalars['String'];
  email: Scalars['String'];
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

