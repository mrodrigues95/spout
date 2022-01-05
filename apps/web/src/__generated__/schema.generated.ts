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
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: number;
  /** The `Short` scalar type represents non-fractional signed whole 16-bit numeric values. Short can represent values between -(2^15) and 2^15 - 1. */
  Short: any;
  URL: string;
  UUID: any;
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
  query: Query;
};

export type BooleanOperationFilterInput = {
  eq?: Maybe<Scalars['Boolean']>;
  neq?: Maybe<Scalars['Boolean']>;
};

export type Classroom = Node & {
  __typename?: 'Classroom';
  id: Scalars['ID'];
  guid: Scalars['UUID'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
  discussions: Array<Discussion>;
  state?: Maybe<State>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  invites: Array<ClassroomInvite>;
};

export type ClassroomFilterInput = {
  and?: Maybe<Array<ClassroomFilterInput>>;
  or?: Maybe<Array<ClassroomFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  guid?: Maybe<ComparableGuidOperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  stateId?: Maybe<ComparableInt32OperationFilterInput>;
  state?: Maybe<StateFilterInput>;
  delLogId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  delLog?: Maybe<DelLogFilterInput>;
  deletedAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  discussions?: Maybe<ListFilterInputTypeOfDiscussionFilterInput>;
  users?: Maybe<ListFilterInputTypeOfClassroomUserFilterInput>;
  invites?: Maybe<ListFilterInputTypeOfClassroomInviteFilterInput>;
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

export type ClassroomInviteFilterInput = {
  and?: Maybe<Array<ClassroomInviteFilterInput>>;
  or?: Maybe<Array<ClassroomInviteFilterInput>>;
  inviteId?: Maybe<ComparableInt32OperationFilterInput>;
  invite?: Maybe<InviteFilterInput>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  user?: Maybe<UserFilterInput>;
  classroomId?: Maybe<ComparableInt32OperationFilterInput>;
  classroom?: Maybe<ClassroomFilterInput>;
  isInviter?: Maybe<BooleanOperationFilterInput>;
  isInvitee?: Maybe<BooleanOperationFilterInput>;
  usedAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type ClassroomUserFilterInput = {
  and?: Maybe<Array<ClassroomUserFilterInput>>;
  or?: Maybe<Array<ClassroomUserFilterInput>>;
  classroomId?: Maybe<ComparableInt32OperationFilterInput>;
  classroom?: Maybe<ClassroomFilterInput>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  user?: Maybe<UserFilterInput>;
  isCreator?: Maybe<BooleanOperationFilterInput>;
  joinedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: Maybe<Scalars['DateTime']>;
  neq?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  nin?: Maybe<Array<Scalars['DateTime']>>;
  gt?: Maybe<Scalars['DateTime']>;
  ngt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  ngte?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  nlt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  nlte?: Maybe<Scalars['DateTime']>;
};

export type ComparableGuidOperationFilterInput = {
  eq?: Maybe<Scalars['UUID']>;
  neq?: Maybe<Scalars['UUID']>;
  in?: Maybe<Array<Scalars['UUID']>>;
  nin?: Maybe<Array<Scalars['UUID']>>;
  gt?: Maybe<Scalars['UUID']>;
  ngt?: Maybe<Scalars['UUID']>;
  gte?: Maybe<Scalars['UUID']>;
  ngte?: Maybe<Scalars['UUID']>;
  lt?: Maybe<Scalars['UUID']>;
  nlt?: Maybe<Scalars['UUID']>;
  lte?: Maybe<Scalars['UUID']>;
  nlte?: Maybe<Scalars['UUID']>;
};

export type ComparableInt16OperationFilterInput = {
  eq?: Maybe<Scalars['Short']>;
  neq?: Maybe<Scalars['Short']>;
  in?: Maybe<Array<Scalars['Short']>>;
  nin?: Maybe<Array<Scalars['Short']>>;
  gt?: Maybe<Scalars['Short']>;
  ngt?: Maybe<Scalars['Short']>;
  gte?: Maybe<Scalars['Short']>;
  ngte?: Maybe<Scalars['Short']>;
  lt?: Maybe<Scalars['Short']>;
  nlt?: Maybe<Scalars['Short']>;
  lte?: Maybe<Scalars['Short']>;
  nlte?: Maybe<Scalars['Short']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: Maybe<Scalars['Int']>;
  neq?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  nin?: Maybe<Array<Scalars['Int']>>;
  gt?: Maybe<Scalars['Int']>;
  ngt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  ngte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  nlt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  nlte?: Maybe<Scalars['Int']>;
};

export type ComparableInt64OperationFilterInput = {
  eq?: Maybe<Scalars['Long']>;
  neq?: Maybe<Scalars['Long']>;
  in?: Maybe<Array<Scalars['Long']>>;
  nin?: Maybe<Array<Scalars['Long']>>;
  gt?: Maybe<Scalars['Long']>;
  ngt?: Maybe<Scalars['Long']>;
  gte?: Maybe<Scalars['Long']>;
  ngte?: Maybe<Scalars['Long']>;
  lt?: Maybe<Scalars['Long']>;
  nlt?: Maybe<Scalars['Long']>;
  lte?: Maybe<Scalars['Long']>;
  nlte?: Maybe<Scalars['Long']>;
};

export type ComparableNullableOfDateTimeOffsetOperationFilterInput = {
  eq?: Maybe<Scalars['DateTime']>;
  neq?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  nin?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  gt?: Maybe<Scalars['DateTime']>;
  ngt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  ngte?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  nlt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  nlte?: Maybe<Scalars['DateTime']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: Maybe<Scalars['DateTime']>;
  neq?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  nin?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  gt?: Maybe<Scalars['DateTime']>;
  ngt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  ngte?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  nlt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  nlte?: Maybe<Scalars['DateTime']>;
};

export type ComparableNullableOfInt16OperationFilterInput = {
  eq?: Maybe<Scalars['Short']>;
  neq?: Maybe<Scalars['Short']>;
  in?: Maybe<Array<Maybe<Scalars['Short']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Short']>>>;
  gt?: Maybe<Scalars['Short']>;
  ngt?: Maybe<Scalars['Short']>;
  gte?: Maybe<Scalars['Short']>;
  ngte?: Maybe<Scalars['Short']>;
  lt?: Maybe<Scalars['Short']>;
  nlt?: Maybe<Scalars['Short']>;
  lte?: Maybe<Scalars['Short']>;
  nlte?: Maybe<Scalars['Short']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: Maybe<Scalars['Int']>;
  neq?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Int']>>>;
  gt?: Maybe<Scalars['Int']>;
  ngt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  ngte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  nlt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  nlte?: Maybe<Scalars['Int']>;
};

export type CompleteUploadInput = {
  fileId: Scalars['ID'];
};

export type CompleteUploadPayload = {
  __typename?: 'CompleteUploadPayload';
  file?: Maybe<File>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
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
  query: Query;
};

export type CreateClassroomPayload = {
  __typename?: 'CreateClassroomPayload';
  classroom: Classroom;
  query: Query;
};

export type CreateDiscussionInput = {
  classroomId: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateDiscussionPayload = {
  __typename?: 'CreateDiscussionPayload';
  discussion: Discussion;
  query: Query;
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

export type DelLogFilterInput = {
  and?: Maybe<Array<DelLogFilterInput>>;
  or?: Maybe<Array<DelLogFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  deletedForId?: Maybe<ComparableInt32OperationFilterInput>;
  deletedFor?: Maybe<DelLogTypeFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  deletedClassrooms?: Maybe<ListFilterInputTypeOfClassroomFilterInput>;
  deletedDiscussions?: Maybe<ListFilterInputTypeOfDiscussionFilterInput>;
  deletedMessages?: Maybe<ListFilterInputTypeOfMessageFilterInput>;
};

export type DelLogType = {
  __typename?: 'DelLogType';
  id: Scalars['Int'];
  type: Scalars['String'];
  delLogs: Array<DelLog>;
};

export type DelLogTypeFilterInput = {
  and?: Maybe<Array<DelLogTypeFilterInput>>;
  or?: Maybe<Array<DelLogTypeFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  type?: Maybe<StringOperationFilterInput>;
  delLogs?: Maybe<ListFilterInputTypeOfDelLogFilterInput>;
};

export type DeleteFileInput = {
  fileId: Scalars['ID'];
};

export type DeleteFilePayload = {
  __typename?: 'DeleteFilePayload';
  file?: Maybe<File>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
};

export type Discussion = Node & {
  __typename?: 'Discussion';
  id: Scalars['ID'];
  guid: Scalars['UUID'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  createdBy: User;
  classroom: Classroom;
  messages?: Maybe<MessagesConnection>;
  topic?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  state?: Maybe<State>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
};


export type DiscussionMessagesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export enum DiscussionEvent {
  ChangeTopic = 'CHANGE_TOPIC',
  ChangeDescription = 'CHANGE_DESCRIPTION'
}

export type DiscussionFilterInput = {
  and?: Maybe<Array<DiscussionFilterInput>>;
  or?: Maybe<Array<DiscussionFilterInput>>;
  id?: Maybe<IdOperationFilterInput>;
  guid?: Maybe<ComparableGuidOperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  topic?: Maybe<StringOperationFilterInput>;
  description?: Maybe<StringOperationFilterInput>;
  classroomId?: Maybe<ComparableInt32OperationFilterInput>;
  classroom?: Maybe<ClassroomFilterInput>;
  createdById?: Maybe<ComparableInt32OperationFilterInput>;
  createdBy?: Maybe<UserFilterInput>;
  stateId?: Maybe<ComparableInt32OperationFilterInput>;
  state?: Maybe<StateFilterInput>;
  deletedAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  delLogId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  delLog?: Maybe<DelLogFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  messages?: Maybe<ListFilterInputTypeOfMessageFilterInput>;
};

export type DiscussionMessageSubscriptionPayload = {
  __typename?: 'DiscussionMessageSubscriptionPayload';
  discussion: Discussion;
  message: Message;
  discussionId: Scalars['ID'];
  messageId: Scalars['ID'];
};

export type File = Node & {
  __typename?: 'File';
  id: Scalars['ID'];
  uploadedBy: User;
  contentLength: Scalars['Long'];
  extension: WhitelistedFileExtension;
  uploadStatus: FileUploadStatus;
  sas: Scalars['URL'];
  signatureEncoded: Scalars['String'];
  signatureDecoded: Scalars['String'];
  containerName: Scalars['String'];
  blobName: Scalars['String'];
  name: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  mimeType?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['URL']>;
  eTag?: Maybe<Scalars['String']>;
  mD5?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  messageFiles: Array<MessageFile>;
};

export type FileFilterInput = {
  and?: Maybe<Array<FileFilterInput>>;
  or?: Maybe<Array<FileFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  uploadedById?: Maybe<ComparableInt32OperationFilterInput>;
  uploadedBy?: Maybe<UserFilterInput>;
  contentLength?: Maybe<ComparableInt64OperationFilterInput>;
  mimeType?: Maybe<StringOperationFilterInput>;
  fileExtension?: Maybe<WhitelistedFileExtensionOperationFilterInput>;
  uploadStatus?: Maybe<FileUploadStatusOperationFilterInput>;
  sas?: Maybe<UriFilterInput>;
  signatureEncoded?: Maybe<StringOperationFilterInput>;
  signatureDecoded?: Maybe<StringOperationFilterInput>;
  containerName?: Maybe<StringOperationFilterInput>;
  blobName?: Maybe<StringOperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  location?: Maybe<UriFilterInput>;
  eTag?: Maybe<StringOperationFilterInput>;
  mD5?: Maybe<StringOperationFilterInput>;
  isDeleted?: Maybe<BooleanOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  deletedAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  messageFiles?: Maybe<ListFilterInputTypeOfMessageFileFilterInput>;
};

export enum FileUploadStatus {
  Queued = 'QUEUED',
  Completed = 'COMPLETED',
  Error = 'ERROR',
  Ignored = 'IGNORED'
}

export type FileUploadStatusOperationFilterInput = {
  eq?: Maybe<FileUploadStatus>;
  neq?: Maybe<FileUploadStatus>;
  in?: Maybe<Array<FileUploadStatus>>;
  nin?: Maybe<Array<FileUploadStatus>>;
};

/** A connection to a list of items. */
export type FilesConnection = {
  __typename?: 'FilesConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<FilesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<File>>;
};

/** An edge in a connection. */
export type FilesEdge = {
  __typename?: 'FilesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: File;
};

export type GenerateDownloadSasInput = {
  fileId: Scalars['ID'];
};

export type GenerateDownloadSasPayload = {
  __typename?: 'GenerateDownloadSASPayload';
  sas?: Maybe<Scalars['URL']>;
  file?: Maybe<File>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
};

export type GenerateUploadSasInput = {
  fileName: Scalars['String'];
  size: Scalars['Long'];
  mimeType?: Maybe<Scalars['String']>;
  fileExtension: WhitelistedFileExtension;
};

export type GenerateUploadSasPayload = {
  __typename?: 'GenerateUploadSASPayload';
  sas?: Maybe<Scalars['URL']>;
  file?: Maybe<File>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
};

export type IdOperationFilterInput = {
  eq?: Maybe<Scalars['ID']>;
  neq?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['ID']>>>;
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

export type InviteFilterInput = {
  and?: Maybe<Array<InviteFilterInput>>;
  or?: Maybe<Array<InviteFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  code?: Maybe<StringOperationFilterInput>;
  uses?: Maybe<ComparableInt16OperationFilterInput>;
  maxUses?: Maybe<ComparableNullableOfInt16OperationFilterInput>;
  maxAge?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  expiresAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  logs?: Maybe<ListFilterInputTypeOfClassroomInviteFilterInput>;
};

export type JoinClassroomInput = {
  code: Scalars['String'];
};

export type JoinClassroomPayload = {
  __typename?: 'JoinClassroomPayload';
  classroom?: Maybe<Classroom>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
};

export type ListFilterInputTypeOfClassroomFilterInput = {
  all?: Maybe<ClassroomFilterInput>;
  none?: Maybe<ClassroomFilterInput>;
  some?: Maybe<ClassroomFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfClassroomInviteFilterInput = {
  all?: Maybe<ClassroomInviteFilterInput>;
  none?: Maybe<ClassroomInviteFilterInput>;
  some?: Maybe<ClassroomInviteFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfClassroomUserFilterInput = {
  all?: Maybe<ClassroomUserFilterInput>;
  none?: Maybe<ClassroomUserFilterInput>;
  some?: Maybe<ClassroomUserFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfDelLogFilterInput = {
  all?: Maybe<DelLogFilterInput>;
  none?: Maybe<DelLogFilterInput>;
  some?: Maybe<DelLogFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfDiscussionFilterInput = {
  all?: Maybe<DiscussionFilterInput>;
  none?: Maybe<DiscussionFilterInput>;
  some?: Maybe<DiscussionFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfFileFilterInput = {
  all?: Maybe<FileFilterInput>;
  none?: Maybe<FileFilterInput>;
  some?: Maybe<FileFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfMessageFileFilterInput = {
  all?: Maybe<MessageFileFilterInput>;
  none?: Maybe<MessageFileFilterInput>;
  some?: Maybe<MessageFileFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfMessageFilterInput = {
  all?: Maybe<MessageFilterInput>;
  none?: Maybe<MessageFilterInput>;
  some?: Maybe<MessageFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfSessionFilterInput = {
  all?: Maybe<SessionFilterInput>;
  none?: Maybe<SessionFilterInput>;
  some?: Maybe<SessionFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListFilterInputTypeOfUserFilterInput = {
  all?: Maybe<UserFilterInput>;
  none?: Maybe<UserFilterInput>;
  some?: Maybe<UserFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
};

export type ListStringOperationFilterInput = {
  all?: Maybe<StringOperationFilterInput>;
  none?: Maybe<StringOperationFilterInput>;
  some?: Maybe<StringOperationFilterInput>;
  any?: Maybe<Scalars['Boolean']>;
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
  content: Scalars['String'];
  discussion: Discussion;
  isDiscussionEvent: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  createdBy: User;
  attachments: Array<File>;
  discussionEvent?: Maybe<DiscussionEvent>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageFile = {
  __typename?: 'MessageFile';
  messageId: Scalars['Int'];
  message?: Maybe<Message>;
  fileId: Scalars['Int'];
  file?: Maybe<File>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type MessageFileFilterInput = {
  and?: Maybe<Array<MessageFileFilterInput>>;
  or?: Maybe<Array<MessageFileFilterInput>>;
  messageId?: Maybe<ComparableInt32OperationFilterInput>;
  message?: Maybe<MessageFilterInput>;
  fileId?: Maybe<ComparableInt32OperationFilterInput>;
  file?: Maybe<FileFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type MessageFilterInput = {
  and?: Maybe<Array<MessageFilterInput>>;
  or?: Maybe<Array<MessageFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  content?: Maybe<StringOperationFilterInput>;
  discussionId?: Maybe<ComparableInt32OperationFilterInput>;
  discussion?: Maybe<DiscussionFilterInput>;
  createdById?: Maybe<ComparableInt32OperationFilterInput>;
  createdBy?: Maybe<UserFilterInput>;
  isDiscussionEvent?: Maybe<BooleanOperationFilterInput>;
  discussionEvent?: Maybe<NullableOfDiscussionEventOperationFilterInput>;
  delLogId?: Maybe<ComparableNullableOfInt32OperationFilterInput>;
  delLog?: Maybe<DelLogFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  deletedAt?: Maybe<ComparableNullableOfDateTimeOperationFilterInput>;
  messageFiles?: Maybe<ListFilterInputTypeOfMessageFileFilterInput>;
};

/** A connection to a list of items. */
export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<MessagesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Message>>;
};

/** An edge in a connection. */
export type MessagesEdge = {
  __typename?: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Message;
};

export type Mutation = {
  __typename?: 'Mutation';
  refreshSession: AuthPayload;
  createClassroom: CreateClassroomPayload;
  joinClassroom: JoinClassroomPayload;
  createClassroomInvite: CreateClassroomInvitePayload;
  sendDiscussionMessage: SendDiscussionMessagePayload;
  createDiscussion: CreateDiscussionPayload;
  updateDiscussionTopic: UpdateDiscussionTopicPayload;
  updateDiscussionDescription: UpdateDiscussionDescriptionPayload;
  signUp: AuthPayload;
  login: AuthPayload;
  logout: AuthPayload;
  generateUploadSAS: GenerateUploadSasPayload;
  generateDownloadSAS: GenerateDownloadSasPayload;
  completeUpload: CompleteUploadPayload;
  deleteFile: DeleteFilePayload;
};


export type MutationRefreshSessionArgs = {
  input: RefreshSessionInput;
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


export type MutationCreateDiscussionArgs = {
  input: CreateDiscussionInput;
};


export type MutationUpdateDiscussionTopicArgs = {
  input: UpdateDiscussionTopicInput;
};


export type MutationUpdateDiscussionDescriptionArgs = {
  input: UpdateDiscussionDescriptionInput;
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


export type MutationGenerateUploadSasArgs = {
  input: GenerateUploadSasInput;
};


export type MutationGenerateDownloadSasArgs = {
  input: GenerateDownloadSasInput;
};


export type MutationCompleteUploadArgs = {
  input: CompleteUploadInput;
};


export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID'];
};

export type NullableOfDiscussionEventOperationFilterInput = {
  eq?: Maybe<DiscussionEvent>;
  neq?: Maybe<DiscussionEvent>;
  in?: Maybe<Array<Maybe<DiscussionEvent>>>;
  nin?: Maybe<Array<Maybe<DiscussionEvent>>>;
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
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  me?: Maybe<User>;
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
  files?: Maybe<FilesConnection>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
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


export type QueryFilesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<FileFilterInput>;
};

export type RefreshSessionInput = {
  sessionId: Scalars['ID'];
};

export type SendDiscussionMessageInput = {
  discussionId: Scalars['ID'];
  fileIds: Array<Scalars['ID']>;
  content: Scalars['String'];
};

export type SendDiscussionMessagePayload = {
  __typename?: 'SendDiscussionMessagePayload';
  message?: Maybe<Message>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
};

export type Session = Node & {
  __typename?: 'Session';
  id: Scalars['ID'];
  user?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
};

export type SessionFilterInput = {
  and?: Maybe<Array<SessionFilterInput>>;
  or?: Maybe<Array<SessionFilterInput>>;
  id?: Maybe<ComparableGuidOperationFilterInput>;
  userId?: Maybe<ComparableInt32OperationFilterInput>;
  user?: Maybe<UserFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  expiresAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
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

export type StateFilterInput = {
  and?: Maybe<Array<StateFilterInput>>;
  or?: Maybe<Array<StateFilterInput>>;
  id?: Maybe<ComparableInt32OperationFilterInput>;
  status?: Maybe<StringOperationFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  users?: Maybe<ListFilterInputTypeOfUserFilterInput>;
  classrooms?: Maybe<ListFilterInputTypeOfClassroomFilterInput>;
  discussions?: Maybe<ListFilterInputTypeOfDiscussionFilterInput>;
};

export type StringOperationFilterInput = {
  and?: Maybe<Array<StringOperationFilterInput>>;
  or?: Maybe<Array<StringOperationFilterInput>>;
  eq?: Maybe<Scalars['String']>;
  neq?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  ncontains?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  startsWith?: Maybe<Scalars['String']>;
  nstartsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  nendsWith?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onDiscussionMessageReceived: DiscussionMessageSubscriptionPayload;
};


export type SubscriptionOnDiscussionMessageReceivedArgs = {
  discussionId: Scalars['ID'];
};



export type UpdateDiscussionDescriptionInput = {
  discussionId: Scalars['ID'];
  description: Scalars['String'];
};

export type UpdateDiscussionDescriptionPayload = {
  __typename?: 'UpdateDiscussionDescriptionPayload';
  discussion?: Maybe<Discussion>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
};

export type UpdateDiscussionTopicInput = {
  discussionId: Scalars['ID'];
  topic: Scalars['String'];
};

export type UpdateDiscussionTopicPayload = {
  __typename?: 'UpdateDiscussionTopicPayload';
  discussion?: Maybe<Discussion>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
};

export type UriFilterInput = {
  and?: Maybe<Array<UriFilterInput>>;
  or?: Maybe<Array<UriFilterInput>>;
  absolutePath?: Maybe<StringOperationFilterInput>;
  absoluteUri?: Maybe<StringOperationFilterInput>;
  localPath?: Maybe<StringOperationFilterInput>;
  authority?: Maybe<StringOperationFilterInput>;
  hostNameType?: Maybe<UriHostNameTypeOperationFilterInput>;
  isDefaultPort?: Maybe<BooleanOperationFilterInput>;
  isFile?: Maybe<BooleanOperationFilterInput>;
  isLoopback?: Maybe<BooleanOperationFilterInput>;
  pathAndQuery?: Maybe<StringOperationFilterInput>;
  segments?: Maybe<ListStringOperationFilterInput>;
  isUnc?: Maybe<BooleanOperationFilterInput>;
  host?: Maybe<StringOperationFilterInput>;
  port?: Maybe<ComparableInt32OperationFilterInput>;
  query?: Maybe<StringOperationFilterInput>;
  fragment?: Maybe<StringOperationFilterInput>;
  scheme?: Maybe<StringOperationFilterInput>;
  originalString?: Maybe<StringOperationFilterInput>;
  dnsSafeHost?: Maybe<StringOperationFilterInput>;
  idnHost?: Maybe<StringOperationFilterInput>;
  isAbsoluteUri?: Maybe<BooleanOperationFilterInput>;
  userEscaped?: Maybe<BooleanOperationFilterInput>;
  userInfo?: Maybe<StringOperationFilterInput>;
};

export enum UriHostNameType {
  Unknown = 'UNKNOWN',
  Basic = 'BASIC',
  Dns = 'DNS',
  IPv4 = 'I_PV4',
  IPv6 = 'I_PV6'
}

export type UriHostNameTypeOperationFilterInput = {
  eq?: Maybe<UriHostNameType>;
  neq?: Maybe<UriHostNameType>;
  in?: Maybe<Array<UriHostNameType>>;
  nin?: Maybe<Array<UriHostNameType>>;
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  guid: Scalars['UUID'];
  name: Scalars['String'];
  email: Scalars['String'];
  profileColor: UserProfileColor;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  classrooms: Array<Classroom>;
  sessions: Array<Session>;
  avatarUrl?: Maybe<Scalars['String']>;
  state?: Maybe<State>;
  messages: Array<Message>;
  invites: Array<ClassroomInvite>;
  fileUploads: Array<File>;
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

export type UserFilterInput = {
  and?: Maybe<Array<UserFilterInput>>;
  or?: Maybe<Array<UserFilterInput>>;
  id?: Maybe<IdOperationFilterInput>;
  guid?: Maybe<ComparableGuidOperationFilterInput>;
  name?: Maybe<StringOperationFilterInput>;
  email?: Maybe<StringOperationFilterInput>;
  profileColor?: Maybe<UserProfileColorOperationFilterInput>;
  avatarUrl?: Maybe<StringOperationFilterInput>;
  stateId?: Maybe<ComparableInt32OperationFilterInput>;
  state?: Maybe<StateFilterInput>;
  createdAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  updatedAt?: Maybe<ComparableDateTimeOperationFilterInput>;
  sessions?: Maybe<ListFilterInputTypeOfSessionFilterInput>;
  messages?: Maybe<ListFilterInputTypeOfMessageFilterInput>;
  classrooms?: Maybe<ListFilterInputTypeOfClassroomUserFilterInput>;
  invites?: Maybe<ListFilterInputTypeOfClassroomInviteFilterInput>;
  fileUploads?: Maybe<ListFilterInputTypeOfFileFilterInput>;
  userName?: Maybe<StringOperationFilterInput>;
  normalizedUserName?: Maybe<StringOperationFilterInput>;
  normalizedEmail?: Maybe<StringOperationFilterInput>;
  emailConfirmed?: Maybe<BooleanOperationFilterInput>;
  passwordHash?: Maybe<StringOperationFilterInput>;
  securityStamp?: Maybe<StringOperationFilterInput>;
  concurrencyStamp?: Maybe<StringOperationFilterInput>;
  phoneNumber?: Maybe<StringOperationFilterInput>;
  phoneNumberConfirmed?: Maybe<BooleanOperationFilterInput>;
  twoFactorEnabled?: Maybe<BooleanOperationFilterInput>;
  lockoutEnd?: Maybe<ComparableNullableOfDateTimeOffsetOperationFilterInput>;
  lockoutEnabled?: Maybe<BooleanOperationFilterInput>;
  accessFailedCount?: Maybe<ComparableInt32OperationFilterInput>;
};

export enum UserProfileColor {
  Sky = 'SKY',
  Pink = 'PINK',
  Green = 'GREEN',
  Purple = 'PURPLE',
  Rose = 'ROSE',
  Gray = 'GRAY',
  Orange = 'ORANGE'
}

export type UserProfileColorOperationFilterInput = {
  eq?: Maybe<UserProfileColor>;
  neq?: Maybe<UserProfileColor>;
  in?: Maybe<Array<UserProfileColor>>;
  nin?: Maybe<Array<UserProfileColor>>;
};

export enum WhitelistedFileExtension {
  Aac = 'AAC',
  Csv = 'CSV',
  Pdf = 'PDF',
  Xls = 'XLS',
  Xlsx = 'XLSX',
  Ppt = 'PPT',
  Pptx = 'PPTX',
  Bmp = 'BMP',
  Gif = 'GIF',
  Jpeg = 'JPEG',
  Jpg = 'JPG',
  Jpe = 'JPE',
  Png = 'PNG',
  Tiff = 'TIFF',
  Tif = 'TIF',
  Txt = 'TXT',
  Text = 'TEXT',
  Rtf = 'RTF',
  Doc = 'DOC',
  Docx = 'DOCX',
  Dot = 'DOT',
  Dotx = 'DOTX',
  Dwg = 'DWG',
  Dwf = 'DWF',
  Dxf = 'DXF',
  Mp3 = 'MP3',
  Mp4 = 'MP4',
  Wav = 'WAV',
  Avi = 'AVI',
  Mov = 'MOV',
  Mpeg = 'MPEG',
  Wmv = 'WMV',
  Zip = 'ZIP'
}

export type WhitelistedFileExtensionOperationFilterInput = {
  eq?: Maybe<WhitelistedFileExtension>;
  neq?: Maybe<WhitelistedFileExtension>;
  in?: Maybe<Array<WhitelistedFileExtension>>;
  nin?: Maybe<Array<WhitelistedFileExtension>>;
};
