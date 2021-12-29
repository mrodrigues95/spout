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
  Long: any;
  /** The `Short` scalar type represents non-fractional signed whole 16-bit numeric values. Short can represent values between -(2^15) and 2^15 - 1. */
  Short: any;
  URL: any;
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

export type Classroom = Node & {
  __typename?: 'Classroom';
  id: Scalars['ID'];
  users: Array<User>;
  discussions: Array<Discussion>;
  guid: Scalars['UUID'];
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
  createdBy: User;
  classroom: Classroom;
  messages?: Maybe<MessagesConnection>;
  guid: Scalars['UUID'];
  name: Scalars['String'];
  topic?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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

export enum DiscussionEvent {
  ChangeTopic = 'CHANGE_TOPIC',
  ChangeDescription = 'CHANGE_DESCRIPTION'
}

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
  topic?: Maybe<SortEnumType>;
  description?: Maybe<SortEnumType>;
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

/** A connection to a list of items. */
export type DiscussionsConnection = {
  __typename?: 'DiscussionsConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<DiscussionsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Discussion>>;
};

/** An edge in a connection. */
export type DiscussionsEdge = {
  __typename?: 'DiscussionsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Discussion;
};

export type File = Node & {
  __typename?: 'File';
  id: Scalars['ID'];
  uploadedById: Scalars['Int'];
  uploadedBy: User;
  contentLength: Scalars['Long'];
  mimeType: Scalars['String'];
  extension: FileExtension;
  uploadStatus: FileUploadStatus;
  sas: Scalars['URL'];
  signatureEncoded: Scalars['String'];
  signatureDecoded: Scalars['String'];
  containerName: Scalars['String'];
  blobName: Scalars['String'];
  name: Scalars['String'];
  location?: Maybe<Scalars['URL']>;
  eTag?: Maybe<Scalars['String']>;
  mD5?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  messageFiles: Array<MessageFile>;
};

export type FileByIdDataLoader = {
  __typename?: 'FileByIdDataLoader';
  load: File;
};


export type FileByIdDataLoaderLoadArgs = {
  key: Scalars['Int'];
};

export enum FileExtension {
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

export enum FileUploadStatus {
  Queued = 'QUEUED',
  Completed = 'COMPLETED',
  Error = 'ERROR',
  Ignored = 'IGNORED'
}

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
  mimeType: Scalars['String'];
  fileExtension: FileExtension;
};

export type GenerateUploadSasPayload = {
  __typename?: 'GenerateUploadSASPayload';
  sas?: Maybe<Scalars['URL']>;
  file?: Maybe<File>;
  userErrors?: Maybe<Array<UserError>>;
  query: Query;
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
  query: Query;
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
  attachments: Array<File>;
  content: Scalars['String'];
  discussionId: Scalars['Int'];
  discussion?: Maybe<Discussion>;
  createdById: Scalars['Int'];
  isDiscussionEvent: Scalars['Boolean'];
  discussionEvent?: Maybe<DiscussionEvent>;
  delLogId?: Maybe<Scalars['Int']>;
  delLog?: Maybe<DelLog>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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

export type MessageSortInput = {
  id?: Maybe<SortEnumType>;
  content?: Maybe<SortEnumType>;
  discussionId?: Maybe<SortEnumType>;
  discussion?: Maybe<DiscussionSortInput>;
  createdById?: Maybe<SortEnumType>;
  createdBy?: Maybe<UserSortInput>;
  isDiscussionEvent?: Maybe<SortEnumType>;
  discussionEvent?: Maybe<SortEnumType>;
  delLogId?: Maybe<SortEnumType>;
  delLog?: Maybe<DelLogSortInput>;
  createdAt?: Maybe<SortEnumType>;
  updatedAt?: Maybe<SortEnumType>;
  deletedAt?: Maybe<SortEnumType>;
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
  discussions?: Maybe<DiscussionsConnection>;
  discussionById: Discussion;
  discussionsById: Array<Discussion>;
  files: Array<File>;
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

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  classrooms: Array<Classroom>;
  sessions: Array<Session>;
  guid: Scalars['UUID'];
  name: Scalars['String'];
  email: Scalars['String'];
  profileColor: UserProfileColor;
  avatarUrl?: Maybe<Scalars['String']>;
  stateId: Scalars['Int'];
  state?: Maybe<State>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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

export enum UserProfileColor {
  Sky = 'SKY',
  Pink = 'PINK',
  Green = 'GREEN',
  Purple = 'PURPLE',
  Rose = 'ROSE',
  Gray = 'GRAY',
  Orange = 'ORANGE'
}

export type UserSortInput = {
  guid?: Maybe<SortEnumType>;
  name?: Maybe<SortEnumType>;
  email?: Maybe<SortEnumType>;
  profileColor?: Maybe<SortEnumType>;
  avatarUrl?: Maybe<SortEnumType>;
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
