/**
 * @generated SignedSource<<4964576d79fb6bbbc1b768fa5b86d9c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClassroomReminderImportance = "LOW" | "MEDIUM" | "HIGH" | "%future added value";
export type ClassroomTimelineEventItem = "CLASSROOM_CREATED" | "DISCUSSION_CREATED" | "SYLLABUS_CREATED" | "SYLLABUS_UPDATED" | "ANNOUNCEMENT_CREATED" | "ANNOUNCEMENT_UPDATED" | "REMINDER_CREATED" | "USER_JOINED_CLASSROOM" | "%future added value";
export type FileUploadStatus = "QUEUED" | "COMPLETED" | "ERROR" | "IGNORED" | "%future added value";
export type MessageEvent = "CHANGE_TOPIC" | "CHANGE_DESCRIPTION" | "PINNED_MESSAGE" | "UNPINNED_MESSAGE" | "%future added value";
export type SortEnumType = "ASC" | "DESC" | "%future added value";
export type UriHostNameType = "UNKNOWN" | "BASIC" | "DNS" | "I_PV4" | "I_PV6" | "%future added value";
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type WhitelistedFileExtension = "AAC" | "CSV" | "PDF" | "XLS" | "XLSX" | "PPT" | "PPTX" | "BMP" | "GIF" | "JPEG" | "JPG" | "JPE" | "PNG" | "TIFF" | "TIF" | "TXT" | "TEXT" | "RTF" | "DOC" | "DOCX" | "DOT" | "DOTX" | "DWG" | "DWF" | "DXF" | "MP3" | "MP4" | "WAV" | "AVI" | "MOV" | "MPEG" | "WMV" | "ZIP" | "%future added value";
export type ClassroomReminderFilterInput = {
  and?: ReadonlyArray<ClassroomReminderFilterInput> | null;
  or?: ReadonlyArray<ClassroomReminderFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  createdById?: ComparableInt32OperationFilterInput | null;
  createdBy?: UserFilterInput | null;
  classroomId?: ComparableInt32OperationFilterInput | null;
  classroom?: ClassroomFilterInput | null;
  title?: StringOperationFilterInput | null;
  description?: StringOperationFilterInput | null;
  importance?: ClassroomReminderImportanceOperationFilterInput | null;
  isDeleted?: BooleanOperationFilterInput | null;
  dueAt?: ComparableDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  deletedAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  classroomTimelineEvents?: ListFilterInputTypeOfClassroomTimelineEventFilterInput | null;
};
export type ComparableInt32OperationFilterInput = {
  eq?: number | null;
  neq?: number | null;
  in?: ReadonlyArray<number> | null;
  nin?: ReadonlyArray<number> | null;
  gt?: number | null;
  ngt?: number | null;
  gte?: number | null;
  ngte?: number | null;
  lt?: number | null;
  nlt?: number | null;
  lte?: number | null;
  nlte?: number | null;
};
export type ComparableGuidOperationFilterInput = {
  eq?: any | null;
  neq?: any | null;
  in?: ReadonlyArray<any> | null;
  nin?: ReadonlyArray<any> | null;
  gt?: any | null;
  ngt?: any | null;
  gte?: any | null;
  ngte?: any | null;
  lt?: any | null;
  nlt?: any | null;
  lte?: any | null;
  nlte?: any | null;
};
export type UserFilterInput = {
  and?: ReadonlyArray<UserFilterInput> | null;
  or?: ReadonlyArray<UserFilterInput> | null;
  id?: IdOperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  name?: StringOperationFilterInput | null;
  email?: StringOperationFilterInput | null;
  bio?: StringOperationFilterInput | null;
  profileColor?: UserProfileColorOperationFilterInput | null;
  preferredProvider?: NullableOfUserPreferredProviderOperationFilterInput | null;
  avatarUrl?: StringOperationFilterInput | null;
  stateId?: ComparableInt32OperationFilterInput | null;
  state?: StateFilterInput | null;
  twoFactorEnabledAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  emailChanges?: ListFilterInputTypeOfUserEmailChangeFilterInput | null;
  passwordResets?: ListFilterInputTypeOfUserPasswordResetFilterInput | null;
  phoneNumberChanges?: ListFilterInputTypeOfUserPhoneNumberChangeFilterInput | null;
  sessions?: ListFilterInputTypeOfSessionFilterInput | null;
  messages?: ListFilterInputTypeOfMessageFilterInput | null;
  pinnedMessages?: ListFilterInputTypeOfMessageFilterInput | null;
  classrooms?: ListFilterInputTypeOfClassroomUserFilterInput | null;
  classroomAnnouncements?: ListFilterInputTypeOfClassroomAnnouncementFilterInput | null;
  classroomReminders?: ListFilterInputTypeOfClassroomReminderFilterInput | null;
  classroomTimelineEvents?: ListFilterInputTypeOfClassroomTimelineEventFilterInput | null;
  classroomInvites?: ListFilterInputTypeOfClassroomInviteFilterInput | null;
  classroomInviteLogs?: ListFilterInputTypeOfClassroomInviteLogFilterInput | null;
  fileUploads?: ListFilterInputTypeOfFileFilterInput | null;
  userName?: StringOperationFilterInput | null;
  normalizedUserName?: StringOperationFilterInput | null;
  normalizedEmail?: StringOperationFilterInput | null;
  emailConfirmed?: BooleanOperationFilterInput | null;
  passwordHash?: StringOperationFilterInput | null;
  securityStamp?: StringOperationFilterInput | null;
  concurrencyStamp?: StringOperationFilterInput | null;
  phoneNumber?: StringOperationFilterInput | null;
  phoneNumberConfirmed?: BooleanOperationFilterInput | null;
  twoFactorEnabled?: BooleanOperationFilterInput | null;
  lockoutEnd?: ComparableNullableOfDateTimeOffsetOperationFilterInput | null;
  lockoutEnabled?: BooleanOperationFilterInput | null;
  accessFailedCount?: ComparableInt32OperationFilterInput | null;
};
export type IdOperationFilterInput = {
  eq?: string | null;
  neq?: string | null;
  in?: ReadonlyArray<string | null> | null;
  nin?: ReadonlyArray<string | null> | null;
};
export type StringOperationFilterInput = {
  and?: ReadonlyArray<StringOperationFilterInput> | null;
  or?: ReadonlyArray<StringOperationFilterInput> | null;
  eq?: string | null;
  neq?: string | null;
  contains?: string | null;
  ncontains?: string | null;
  in?: ReadonlyArray<string | null> | null;
  nin?: ReadonlyArray<string | null> | null;
  startsWith?: string | null;
  nstartsWith?: string | null;
  endsWith?: string | null;
  nendsWith?: string | null;
};
export type UserProfileColorOperationFilterInput = {
  eq?: UserProfileColor | null;
  neq?: UserProfileColor | null;
  in?: ReadonlyArray<UserProfileColor> | null;
  nin?: ReadonlyArray<UserProfileColor> | null;
};
export type NullableOfUserPreferredProviderOperationFilterInput = {
  eq?: UserPreferredProvider | null;
  neq?: UserPreferredProvider | null;
  in?: ReadonlyArray<UserPreferredProvider | null> | null;
  nin?: ReadonlyArray<UserPreferredProvider | null> | null;
};
export type StateFilterInput = {
  and?: ReadonlyArray<StateFilterInput> | null;
  or?: ReadonlyArray<StateFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  status?: StringOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  users?: ListFilterInputTypeOfUserFilterInput | null;
  classrooms?: ListFilterInputTypeOfClassroomFilterInput | null;
  discussions?: ListFilterInputTypeOfDiscussionFilterInput | null;
};
export type ComparableDateTimeOperationFilterInput = {
  eq?: string | null;
  neq?: string | null;
  in?: ReadonlyArray<string> | null;
  nin?: ReadonlyArray<string> | null;
  gt?: string | null;
  ngt?: string | null;
  gte?: string | null;
  ngte?: string | null;
  lt?: string | null;
  nlt?: string | null;
  lte?: string | null;
  nlte?: string | null;
};
export type ListFilterInputTypeOfUserFilterInput = {
  all?: UserFilterInput | null;
  none?: UserFilterInput | null;
  some?: UserFilterInput | null;
  any?: boolean | null;
};
export type ListFilterInputTypeOfClassroomFilterInput = {
  all?: ClassroomFilterInput | null;
  none?: ClassroomFilterInput | null;
  some?: ClassroomFilterInput | null;
  any?: boolean | null;
};
export type ClassroomFilterInput = {
  and?: ReadonlyArray<ClassroomFilterInput> | null;
  or?: ReadonlyArray<ClassroomFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  name?: StringOperationFilterInput | null;
  syllabusId?: ComparableNullableOfInt32OperationFilterInput | null;
  syllabus?: ClassroomSyllabusFilterInput | null;
  stateId?: ComparableInt32OperationFilterInput | null;
  state?: StateFilterInput | null;
  delLogId?: ComparableNullableOfInt32OperationFilterInput | null;
  delLog?: DelLogFilterInput | null;
  deletedAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  discussions?: ListFilterInputTypeOfDiscussionFilterInput | null;
  users?: ListFilterInputTypeOfClassroomUserFilterInput | null;
  invites?: ListFilterInputTypeOfClassroomInviteFilterInput | null;
  announcements?: ListFilterInputTypeOfClassroomAnnouncementFilterInput | null;
  reminders?: ListFilterInputTypeOfClassroomReminderFilterInput | null;
  timeline?: ListFilterInputTypeOfClassroomTimelineEventFilterInput | null;
};
export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: number | null;
  neq?: number | null;
  in?: ReadonlyArray<number | null> | null;
  nin?: ReadonlyArray<number | null> | null;
  gt?: number | null;
  ngt?: number | null;
  gte?: number | null;
  ngte?: number | null;
  lt?: number | null;
  nlt?: number | null;
  lte?: number | null;
  nlte?: number | null;
};
export type ClassroomSyllabusFilterInput = {
  and?: ReadonlyArray<ClassroomSyllabusFilterInput> | null;
  or?: ReadonlyArray<ClassroomSyllabusFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  classroomId?: ComparableInt32OperationFilterInput | null;
  classroom?: ClassroomFilterInput | null;
  content?: StringOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  classroomTimelineEvents?: ListFilterInputTypeOfClassroomTimelineEventFilterInput | null;
};
export type ListFilterInputTypeOfClassroomTimelineEventFilterInput = {
  all?: ClassroomTimelineEventFilterInput | null;
  none?: ClassroomTimelineEventFilterInput | null;
  some?: ClassroomTimelineEventFilterInput | null;
  any?: boolean | null;
};
export type ClassroomTimelineEventFilterInput = {
  and?: ReadonlyArray<ClassroomTimelineEventFilterInput> | null;
  or?: ReadonlyArray<ClassroomTimelineEventFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  triggeredById?: ComparableInt32OperationFilterInput | null;
  triggeredBy?: UserFilterInput | null;
  classroomId?: ComparableInt32OperationFilterInput | null;
  classroom?: ClassroomFilterInput | null;
  discussionId?: ComparableNullableOfInt32OperationFilterInput | null;
  discussion?: DiscussionFilterInput | null;
  classroomSyllabusId?: ComparableNullableOfInt32OperationFilterInput | null;
  classroomSyllabus?: ClassroomSyllabusFilterInput | null;
  classroomAnnouncementId?: ComparableNullableOfInt32OperationFilterInput | null;
  classroomAnnouncement?: ClassroomAnnouncementFilterInput | null;
  classroomReminderId?: ComparableNullableOfInt32OperationFilterInput | null;
  classroomReminder?: ClassroomReminderFilterInput | null;
  event?: ClassroomTimelineEventItemOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type DiscussionFilterInput = {
  and?: ReadonlyArray<DiscussionFilterInput> | null;
  or?: ReadonlyArray<DiscussionFilterInput> | null;
  id?: IdOperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  name?: StringOperationFilterInput | null;
  topic?: StringOperationFilterInput | null;
  description?: StringOperationFilterInput | null;
  classroomId?: ComparableInt32OperationFilterInput | null;
  classroom?: ClassroomFilterInput | null;
  createdById?: ComparableInt32OperationFilterInput | null;
  createdBy?: UserFilterInput | null;
  stateId?: ComparableInt32OperationFilterInput | null;
  state?: StateFilterInput | null;
  deletedAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  delLogId?: ComparableNullableOfInt32OperationFilterInput | null;
  delLog?: DelLogFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  messages?: ListFilterInputTypeOfMessageFilterInput | null;
  classroomTimelineEvents?: ListFilterInputTypeOfClassroomTimelineEventFilterInput | null;
};
export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: string | null;
  neq?: string | null;
  in?: ReadonlyArray<string | null> | null;
  nin?: ReadonlyArray<string | null> | null;
  gt?: string | null;
  ngt?: string | null;
  gte?: string | null;
  ngte?: string | null;
  lt?: string | null;
  nlt?: string | null;
  lte?: string | null;
  nlte?: string | null;
};
export type DelLogFilterInput = {
  and?: ReadonlyArray<DelLogFilterInput> | null;
  or?: ReadonlyArray<DelLogFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  deletedForId?: ComparableInt32OperationFilterInput | null;
  deletedFor?: DelLogTypeFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  deletedClassrooms?: ListFilterInputTypeOfClassroomFilterInput | null;
  deletedDiscussions?: ListFilterInputTypeOfDiscussionFilterInput | null;
  deletedMessages?: ListFilterInputTypeOfMessageFilterInput | null;
};
export type DelLogTypeFilterInput = {
  and?: ReadonlyArray<DelLogTypeFilterInput> | null;
  or?: ReadonlyArray<DelLogTypeFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  type?: StringOperationFilterInput | null;
  delLogs?: ListFilterInputTypeOfDelLogFilterInput | null;
};
export type ListFilterInputTypeOfDelLogFilterInput = {
  all?: DelLogFilterInput | null;
  none?: DelLogFilterInput | null;
  some?: DelLogFilterInput | null;
  any?: boolean | null;
};
export type ListFilterInputTypeOfDiscussionFilterInput = {
  all?: DiscussionFilterInput | null;
  none?: DiscussionFilterInput | null;
  some?: DiscussionFilterInput | null;
  any?: boolean | null;
};
export type ListFilterInputTypeOfMessageFilterInput = {
  all?: MessageFilterInput | null;
  none?: MessageFilterInput | null;
  some?: MessageFilterInput | null;
  any?: boolean | null;
};
export type MessageFilterInput = {
  and?: ReadonlyArray<MessageFilterInput> | null;
  or?: ReadonlyArray<MessageFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  content?: StringOperationFilterInput | null;
  discussionId?: ComparableInt32OperationFilterInput | null;
  discussion?: DiscussionFilterInput | null;
  createdById?: ComparableInt32OperationFilterInput | null;
  createdBy?: UserFilterInput | null;
  pinnedById?: ComparableNullableOfInt32OperationFilterInput | null;
  pinnedBy?: UserFilterInput | null;
  parentMessageId?: ComparableNullableOfInt32OperationFilterInput | null;
  parentMessage?: MessageFilterInput | null;
  isEvent?: BooleanOperationFilterInput | null;
  messageEvent?: NullableOfMessageEventOperationFilterInput | null;
  delLogId?: ComparableNullableOfInt32OperationFilterInput | null;
  delLog?: DelLogFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  pinnedAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  deletedAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  messageFiles?: ListFilterInputTypeOfMessageFileFilterInput | null;
  messageLinks?: ListFilterInputTypeOfMessageFilterInput | null;
};
export type BooleanOperationFilterInput = {
  eq?: boolean | null;
  neq?: boolean | null;
};
export type NullableOfMessageEventOperationFilterInput = {
  eq?: MessageEvent | null;
  neq?: MessageEvent | null;
  in?: ReadonlyArray<MessageEvent | null> | null;
  nin?: ReadonlyArray<MessageEvent | null> | null;
};
export type ListFilterInputTypeOfMessageFileFilterInput = {
  all?: MessageFileFilterInput | null;
  none?: MessageFileFilterInput | null;
  some?: MessageFileFilterInput | null;
  any?: boolean | null;
};
export type MessageFileFilterInput = {
  and?: ReadonlyArray<MessageFileFilterInput> | null;
  or?: ReadonlyArray<MessageFileFilterInput> | null;
  messageId?: ComparableInt32OperationFilterInput | null;
  message?: MessageFilterInput | null;
  fileId?: ComparableInt32OperationFilterInput | null;
  file?: FileFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type FileFilterInput = {
  and?: ReadonlyArray<FileFilterInput> | null;
  or?: ReadonlyArray<FileFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  uploadedById?: ComparableInt32OperationFilterInput | null;
  uploadedBy?: UserFilterInput | null;
  contentLength?: ComparableInt64OperationFilterInput | null;
  mimeType?: StringOperationFilterInput | null;
  fileExtension?: WhitelistedFileExtensionOperationFilterInput | null;
  uploadStatus?: FileUploadStatusOperationFilterInput | null;
  sas?: UriFilterInput | null;
  signatureEncoded?: StringOperationFilterInput | null;
  signatureDecoded?: StringOperationFilterInput | null;
  containerName?: StringOperationFilterInput | null;
  blobName?: StringOperationFilterInput | null;
  name?: StringOperationFilterInput | null;
  location?: UriFilterInput | null;
  eTag?: StringOperationFilterInput | null;
  mD5?: StringOperationFilterInput | null;
  isDeleted?: BooleanOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  deletedAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  messageFiles?: ListFilterInputTypeOfMessageFileFilterInput | null;
};
export type ComparableInt64OperationFilterInput = {
  eq?: any | null;
  neq?: any | null;
  in?: ReadonlyArray<any> | null;
  nin?: ReadonlyArray<any> | null;
  gt?: any | null;
  ngt?: any | null;
  gte?: any | null;
  ngte?: any | null;
  lt?: any | null;
  nlt?: any | null;
  lte?: any | null;
  nlte?: any | null;
};
export type WhitelistedFileExtensionOperationFilterInput = {
  eq?: WhitelistedFileExtension | null;
  neq?: WhitelistedFileExtension | null;
  in?: ReadonlyArray<WhitelistedFileExtension> | null;
  nin?: ReadonlyArray<WhitelistedFileExtension> | null;
};
export type FileUploadStatusOperationFilterInput = {
  eq?: FileUploadStatus | null;
  neq?: FileUploadStatus | null;
  in?: ReadonlyArray<FileUploadStatus> | null;
  nin?: ReadonlyArray<FileUploadStatus> | null;
};
export type UriFilterInput = {
  and?: ReadonlyArray<UriFilterInput> | null;
  or?: ReadonlyArray<UriFilterInput> | null;
  absolutePath?: StringOperationFilterInput | null;
  absoluteUri?: StringOperationFilterInput | null;
  localPath?: StringOperationFilterInput | null;
  authority?: StringOperationFilterInput | null;
  hostNameType?: UriHostNameTypeOperationFilterInput | null;
  isDefaultPort?: BooleanOperationFilterInput | null;
  isFile?: BooleanOperationFilterInput | null;
  isLoopback?: BooleanOperationFilterInput | null;
  pathAndQuery?: StringOperationFilterInput | null;
  segments?: ListStringOperationFilterInput | null;
  isUnc?: BooleanOperationFilterInput | null;
  host?: StringOperationFilterInput | null;
  port?: ComparableInt32OperationFilterInput | null;
  query?: StringOperationFilterInput | null;
  fragment?: StringOperationFilterInput | null;
  scheme?: StringOperationFilterInput | null;
  originalString?: StringOperationFilterInput | null;
  dnsSafeHost?: StringOperationFilterInput | null;
  idnHost?: StringOperationFilterInput | null;
  isAbsoluteUri?: BooleanOperationFilterInput | null;
  userEscaped?: BooleanOperationFilterInput | null;
  userInfo?: StringOperationFilterInput | null;
};
export type UriHostNameTypeOperationFilterInput = {
  eq?: UriHostNameType | null;
  neq?: UriHostNameType | null;
  in?: ReadonlyArray<UriHostNameType> | null;
  nin?: ReadonlyArray<UriHostNameType> | null;
};
export type ListStringOperationFilterInput = {
  all?: StringOperationFilterInput | null;
  none?: StringOperationFilterInput | null;
  some?: StringOperationFilterInput | null;
  any?: boolean | null;
};
export type ClassroomAnnouncementFilterInput = {
  and?: ReadonlyArray<ClassroomAnnouncementFilterInput> | null;
  or?: ReadonlyArray<ClassroomAnnouncementFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  createdById?: ComparableInt32OperationFilterInput | null;
  createdBy?: UserFilterInput | null;
  classroomId?: ComparableInt32OperationFilterInput | null;
  classroom?: ClassroomFilterInput | null;
  content?: StringOperationFilterInput | null;
  isDeleted?: BooleanOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  deletedAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  classroomTimelineEvents?: ListFilterInputTypeOfClassroomTimelineEventFilterInput | null;
};
export type ClassroomTimelineEventItemOperationFilterInput = {
  eq?: ClassroomTimelineEventItem | null;
  neq?: ClassroomTimelineEventItem | null;
  in?: ReadonlyArray<ClassroomTimelineEventItem> | null;
  nin?: ReadonlyArray<ClassroomTimelineEventItem> | null;
};
export type ListFilterInputTypeOfClassroomUserFilterInput = {
  all?: ClassroomUserFilterInput | null;
  none?: ClassroomUserFilterInput | null;
  some?: ClassroomUserFilterInput | null;
  any?: boolean | null;
};
export type ClassroomUserFilterInput = {
  and?: ReadonlyArray<ClassroomUserFilterInput> | null;
  or?: ReadonlyArray<ClassroomUserFilterInput> | null;
  classroomId?: ComparableInt32OperationFilterInput | null;
  classroom?: ClassroomFilterInput | null;
  userId?: ComparableInt32OperationFilterInput | null;
  user?: UserFilterInput | null;
  isCreator?: BooleanOperationFilterInput | null;
  joinedAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type ListFilterInputTypeOfClassroomInviteFilterInput = {
  all?: ClassroomInviteFilterInput | null;
  none?: ClassroomInviteFilterInput | null;
  some?: ClassroomInviteFilterInput | null;
  any?: boolean | null;
};
export type ClassroomInviteFilterInput = {
  and?: ReadonlyArray<ClassroomInviteFilterInput> | null;
  or?: ReadonlyArray<ClassroomInviteFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  createdById?: ComparableInt32OperationFilterInput | null;
  createdBy?: UserFilterInput | null;
  classroomId?: ComparableInt32OperationFilterInput | null;
  classroom?: ClassroomFilterInput | null;
  totalUses?: ComparableInt16OperationFilterInput | null;
  code?: StringOperationFilterInput | null;
  maxUses?: ComparableNullableOfInt16OperationFilterInput | null;
  maxAge?: ComparableNullableOfInt32OperationFilterInput | null;
  expiresAt?: ComparableNullableOfDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
  logs?: ListFilterInputTypeOfClassroomInviteLogFilterInput | null;
};
export type ComparableInt16OperationFilterInput = {
  eq?: number | null;
  neq?: number | null;
  in?: ReadonlyArray<number> | null;
  nin?: ReadonlyArray<number> | null;
  gt?: number | null;
  ngt?: number | null;
  gte?: number | null;
  ngte?: number | null;
  lt?: number | null;
  nlt?: number | null;
  lte?: number | null;
  nlte?: number | null;
};
export type ComparableNullableOfInt16OperationFilterInput = {
  eq?: number | null;
  neq?: number | null;
  in?: ReadonlyArray<number | null> | null;
  nin?: ReadonlyArray<number | null> | null;
  gt?: number | null;
  ngt?: number | null;
  gte?: number | null;
  ngte?: number | null;
  lt?: number | null;
  nlt?: number | null;
  lte?: number | null;
  nlte?: number | null;
};
export type ListFilterInputTypeOfClassroomInviteLogFilterInput = {
  all?: ClassroomInviteLogFilterInput | null;
  none?: ClassroomInviteLogFilterInput | null;
  some?: ClassroomInviteLogFilterInput | null;
  any?: boolean | null;
};
export type ClassroomInviteLogFilterInput = {
  and?: ReadonlyArray<ClassroomInviteLogFilterInput> | null;
  or?: ReadonlyArray<ClassroomInviteLogFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  classroomInviteId?: ComparableInt32OperationFilterInput | null;
  classroomInvite?: ClassroomInviteFilterInput | null;
  usedById?: ComparableInt32OperationFilterInput | null;
  usedBy?: UserFilterInput | null;
  usedAt?: ComparableDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type ListFilterInputTypeOfClassroomAnnouncementFilterInput = {
  all?: ClassroomAnnouncementFilterInput | null;
  none?: ClassroomAnnouncementFilterInput | null;
  some?: ClassroomAnnouncementFilterInput | null;
  any?: boolean | null;
};
export type ListFilterInputTypeOfClassroomReminderFilterInput = {
  all?: ClassroomReminderFilterInput | null;
  none?: ClassroomReminderFilterInput | null;
  some?: ClassroomReminderFilterInput | null;
  any?: boolean | null;
};
export type ListFilterInputTypeOfUserEmailChangeFilterInput = {
  all?: UserEmailChangeFilterInput | null;
  none?: UserEmailChangeFilterInput | null;
  some?: UserEmailChangeFilterInput | null;
  any?: boolean | null;
};
export type UserEmailChangeFilterInput = {
  and?: ReadonlyArray<UserEmailChangeFilterInput> | null;
  or?: ReadonlyArray<UserEmailChangeFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  token?: StringOperationFilterInput | null;
  tokenEncoded?: StringOperationFilterInput | null;
  newEmail?: StringOperationFilterInput | null;
  user?: UserFilterInput | null;
  userId?: ComparableNullableOfInt32OperationFilterInput | null;
  expiresAt?: ComparableDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type ListFilterInputTypeOfUserPasswordResetFilterInput = {
  all?: UserPasswordResetFilterInput | null;
  none?: UserPasswordResetFilterInput | null;
  some?: UserPasswordResetFilterInput | null;
  any?: boolean | null;
};
export type UserPasswordResetFilterInput = {
  and?: ReadonlyArray<UserPasswordResetFilterInput> | null;
  or?: ReadonlyArray<UserPasswordResetFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  user?: UserFilterInput | null;
  userId?: ComparableNullableOfInt32OperationFilterInput | null;
  token?: StringOperationFilterInput | null;
  tokenEncoded?: StringOperationFilterInput | null;
  expiresAt?: ComparableDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type ListFilterInputTypeOfUserPhoneNumberChangeFilterInput = {
  all?: UserPhoneNumberChangeFilterInput | null;
  none?: UserPhoneNumberChangeFilterInput | null;
  some?: UserPhoneNumberChangeFilterInput | null;
  any?: boolean | null;
};
export type UserPhoneNumberChangeFilterInput = {
  and?: ReadonlyArray<UserPhoneNumberChangeFilterInput> | null;
  or?: ReadonlyArray<UserPhoneNumberChangeFilterInput> | null;
  id?: ComparableInt32OperationFilterInput | null;
  token?: StringOperationFilterInput | null;
  newPhoneNumber?: StringOperationFilterInput | null;
  user?: UserFilterInput | null;
  userId?: ComparableNullableOfInt32OperationFilterInput | null;
  expiresAt?: ComparableDateTimeOperationFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type ListFilterInputTypeOfSessionFilterInput = {
  all?: SessionFilterInput | null;
  none?: SessionFilterInput | null;
  some?: SessionFilterInput | null;
  any?: boolean | null;
};
export type SessionFilterInput = {
  and?: ReadonlyArray<SessionFilterInput> | null;
  or?: ReadonlyArray<SessionFilterInput> | null;
  id?: IdOperationFilterInput | null;
  guid?: ComparableGuidOperationFilterInput | null;
  userId?: ComparableInt32OperationFilterInput | null;
  user?: UserFilterInput | null;
  createdAt?: ComparableDateTimeOperationFilterInput | null;
  expiresAt?: ComparableDateTimeOperationFilterInput | null;
  updatedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type ListFilterInputTypeOfFileFilterInput = {
  all?: FileFilterInput | null;
  none?: FileFilterInput | null;
  some?: FileFilterInput | null;
  any?: boolean | null;
};
export type ComparableNullableOfDateTimeOffsetOperationFilterInput = {
  eq?: string | null;
  neq?: string | null;
  in?: ReadonlyArray<string | null> | null;
  nin?: ReadonlyArray<string | null> | null;
  gt?: string | null;
  ngt?: string | null;
  gte?: string | null;
  ngte?: string | null;
  lt?: string | null;
  nlt?: string | null;
  lte?: string | null;
  nlte?: string | null;
};
export type ClassroomReminderImportanceOperationFilterInput = {
  eq?: ClassroomReminderImportance | null;
  neq?: ClassroomReminderImportance | null;
  in?: ReadonlyArray<ClassroomReminderImportance> | null;
  nin?: ReadonlyArray<ClassroomReminderImportance> | null;
};
export type ClassroomReminderSortInput = {
  id?: SortEnumType | null;
  guid?: SortEnumType | null;
  createdById?: SortEnumType | null;
  createdBy?: UserSortInput | null;
  classroomId?: SortEnumType | null;
  classroom?: ClassroomSortInput | null;
  title?: SortEnumType | null;
  description?: SortEnumType | null;
  importance?: SortEnumType | null;
  isDeleted?: SortEnumType | null;
  dueAt?: SortEnumType | null;
  createdAt?: SortEnumType | null;
  updatedAt?: SortEnumType | null;
  deletedAt?: SortEnumType | null;
};
export type UserSortInput = {
  guid?: SortEnumType | null;
  name?: SortEnumType | null;
  email?: SortEnumType | null;
  bio?: SortEnumType | null;
  profileColor?: SortEnumType | null;
  preferredProvider?: SortEnumType | null;
  avatarUrl?: SortEnumType | null;
  stateId?: SortEnumType | null;
  state?: StateSortInput | null;
  twoFactorEnabledAt?: SortEnumType | null;
  createdAt?: SortEnumType | null;
  updatedAt?: SortEnumType | null;
  id?: SortEnumType | null;
  userName?: SortEnumType | null;
  normalizedUserName?: SortEnumType | null;
  normalizedEmail?: SortEnumType | null;
  emailConfirmed?: SortEnumType | null;
  passwordHash?: SortEnumType | null;
  securityStamp?: SortEnumType | null;
  concurrencyStamp?: SortEnumType | null;
  phoneNumber?: SortEnumType | null;
  phoneNumberConfirmed?: SortEnumType | null;
  twoFactorEnabled?: SortEnumType | null;
  lockoutEnd?: SortEnumType | null;
  lockoutEnabled?: SortEnumType | null;
  accessFailedCount?: SortEnumType | null;
};
export type StateSortInput = {
  id?: SortEnumType | null;
  status?: SortEnumType | null;
  createdAt?: SortEnumType | null;
  updatedAt?: SortEnumType | null;
};
export type ClassroomSortInput = {
  id?: SortEnumType | null;
  guid?: SortEnumType | null;
  name?: SortEnumType | null;
  syllabusId?: SortEnumType | null;
  syllabus?: ClassroomSyllabusSortInput | null;
  stateId?: SortEnumType | null;
  state?: StateSortInput | null;
  delLogId?: SortEnumType | null;
  delLog?: DelLogSortInput | null;
  deletedAt?: SortEnumType | null;
  createdAt?: SortEnumType | null;
  updatedAt?: SortEnumType | null;
};
export type ClassroomSyllabusSortInput = {
  id?: SortEnumType | null;
  guid?: SortEnumType | null;
  classroomId?: SortEnumType | null;
  classroom?: ClassroomSortInput | null;
  content?: SortEnumType | null;
  createdAt?: SortEnumType | null;
  updatedAt?: SortEnumType | null;
};
export type DelLogSortInput = {
  id?: SortEnumType | null;
  deletedForId?: SortEnumType | null;
  deletedFor?: DelLogTypeSortInput | null;
  createdAt?: SortEnumType | null;
  updatedAt?: SortEnumType | null;
};
export type DelLogTypeSortInput = {
  id?: SortEnumType | null;
  type?: SortEnumType | null;
};
export type RemindersQuery$variables = {
  id: string;
  where?: ClassroomReminderFilterInput | null;
  order?: ReadonlyArray<ClassroomReminderSortInput> | null;
};
export type RemindersQueryVariables = RemindersQuery$variables;
export type RemindersQuery$data = {
  readonly classroomById: {
    readonly " $fragmentSpreads": FragmentRefs<"CreateReminder_classroom" | "RemindersList_classroom">;
  };
};
export type RemindersQueryResponse = RemindersQuery$data;
export type RemindersQuery = {
  variables: RemindersQueryVariables;
  response: RemindersQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "where"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v4 = {
  "kind": "Variable",
  "name": "order",
  "variableName": "order"
},
v5 = {
  "kind": "Variable",
  "name": "where",
  "variableName": "where"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  (v4/*: any*/),
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RemindersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CreateReminder_classroom"
          },
          {
            "args": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "RemindersList_classroom"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "RemindersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "RemindersConnection",
            "kind": "LinkedField",
            "name": "reminders",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RemindersEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClassroomReminder",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "importance",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dueAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": [
              "where",
              "order"
            ],
            "handle": "connection",
            "key": "RemindersList_reminders",
            "kind": "LinkedHandle",
            "name": "reminders"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9cd0906fe5c626eb5680e9c31a8d9723",
    "id": null,
    "metadata": {},
    "name": "RemindersQuery",
    "operationKind": "query",
    "text": "query RemindersQuery(\n  $id: ID!\n  $where: ClassroomReminderFilterInput\n  $order: [ClassroomReminderSortInput!]\n) {\n  classroomById(id: $id) {\n    ...CreateReminder_classroom\n    ...RemindersList_classroom_28pUDr\n    id\n  }\n}\n\nfragment CreateReminder_classroom on Classroom {\n  id\n}\n\nfragment Reminder_classroomReminder on ClassroomReminder {\n  title\n  description\n  importance\n  dueAt\n}\n\nfragment RemindersList_classroom_28pUDr on Classroom {\n  reminders(first: 50, where: $where, order: $order) {\n    edges {\n      node {\n        importance\n        dueAt\n        ...Reminder_classroomReminder\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "24a9d8eebe0d6a092b3308b4239d13bc";

export default node;
