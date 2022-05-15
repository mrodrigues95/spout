using System;
using API.Schema.Types.ClassroomTimelineEvents;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations {
    public partial class CreateClassroomTimelineEventTable : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:classroom_reminder_importance", "low,medium,high")
                .Annotation("Npgsql:Enum:classroom_timeline_event_item", "classroom_created,discussion_created,syllabus_created,syllabus_updated,syllabus_deleted,announcement_created,announcement_updated,announcement_deleted,reminder_created,user_joined_classroom")
                .Annotation("Npgsql:Enum:file_upload_status", "queued,completed,error,ignored")
                .Annotation("Npgsql:Enum:message_event", "change_topic,change_description,pinned_message,unpinned_message")
                .Annotation("Npgsql:Enum:user_preferred_provider", "email,phone")
                .Annotation("Npgsql:Enum:user_profile_color", "sky,pink,green,purple,rose,gray,orange")
                .Annotation("Npgsql:Enum:whitelisted_file_extension", "aac,csv,pdf,xls,xlsx,ppt,pptx,bmp,gif,jpeg,jpg,jpe,png,tiff,tif,txt,text,rtf,doc,docx,dot,dotx,dwg,dwf,dxf,mp3,mp4,wav,avi,mov,mpeg,wmv,zip")
                .OldAnnotation("Npgsql:Enum:classroom_reminder_importance", "low,medium,high")
                .OldAnnotation("Npgsql:Enum:file_upload_status", "queued,completed,error,ignored")
                .OldAnnotation("Npgsql:Enum:message_event", "change_topic,change_description,pinned_message,unpinned_message")
                .OldAnnotation("Npgsql:Enum:user_preferred_provider", "email,phone")
                .OldAnnotation("Npgsql:Enum:user_profile_color", "sky,pink,green,purple,rose,gray,orange")
                .OldAnnotation("Npgsql:Enum:whitelisted_file_extension", "aac,csv,pdf,xls,xlsx,ppt,pptx,bmp,gif,jpeg,jpg,jpe,png,tiff,tif,txt,text,rtf,doc,docx,dot,dotx,dwg,dwf,dxf,mp3,mp4,wav,avi,mov,mpeg,wmv,zip");

            migrationBuilder.CreateTable(
                name: "classroom_timeline_events",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    guid = table.Column<Guid>(type: "uuid", nullable: false),
                    triggered_by_id = table.Column<int>(type: "integer", nullable: false),
                    classroom_id = table.Column<int>(type: "integer", nullable: false),
                    discussion_id = table.Column<int>(type: "integer", nullable: true),
                    classroom_syllabus_id = table.Column<int>(type: "integer", nullable: true),
                    classroom_announcement_id = table.Column<int>(type: "integer", nullable: true),
                    classroom_reminder_id = table.Column<int>(type: "integer", nullable: true),
                    @event = table.Column<ClassroomTimelineEventItem>(name: "event", type: "classroom_timeline_event_item", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table => {
                    table.PrimaryKey("pk_classroom_timeline_events", x => x.id);
                    table.ForeignKey(
                        name: "fk_classroom_timeline_events_classroom_announcements_classroom",
                        column: x => x.classroom_announcement_id,
                        principalTable: "classroom_announcements",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_classroom_timeline_events_classroom_reminders_classroom_rem",
                        column: x => x.classroom_reminder_id,
                        principalTable: "classroom_reminders",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_classroom_timeline_events_classroom_syllabus_classroom_syll",
                        column: x => x.classroom_syllabus_id,
                        principalTable: "classroom_syllabus",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_classroom_timeline_events_classrooms_classroom_id",
                        column: x => x.classroom_id,
                        principalTable: "classrooms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_classroom_timeline_events_discussions_discussion_id",
                        column: x => x.discussion_id,
                        principalTable: "discussions",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_classroom_timeline_events_users_triggered_by_id",
                        column: x => x.triggered_by_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_classroom_timeline_events_classroom_announcement_id",
                table: "classroom_timeline_events",
                column: "classroom_announcement_id");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_timeline_events_classroom_id",
                table: "classroom_timeline_events",
                column: "classroom_id");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_timeline_events_classroom_reminder_id",
                table: "classroom_timeline_events",
                column: "classroom_reminder_id");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_timeline_events_classroom_syllabus_id",
                table: "classroom_timeline_events",
                column: "classroom_syllabus_id");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_timeline_events_discussion_id",
                table: "classroom_timeline_events",
                column: "discussion_id");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_timeline_events_triggered_by_id",
                table: "classroom_timeline_events",
                column: "triggered_by_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "classroom_timeline_events");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:classroom_reminder_importance", "low,medium,high")
                .Annotation("Npgsql:Enum:file_upload_status", "queued,completed,error,ignored")
                .Annotation("Npgsql:Enum:message_event", "change_topic,change_description,pinned_message,unpinned_message")
                .Annotation("Npgsql:Enum:user_preferred_provider", "email,phone")
                .Annotation("Npgsql:Enum:user_profile_color", "sky,pink,green,purple,rose,gray,orange")
                .Annotation("Npgsql:Enum:whitelisted_file_extension", "aac,csv,pdf,xls,xlsx,ppt,pptx,bmp,gif,jpeg,jpg,jpe,png,tiff,tif,txt,text,rtf,doc,docx,dot,dotx,dwg,dwf,dxf,mp3,mp4,wav,avi,mov,mpeg,wmv,zip")
                .OldAnnotation("Npgsql:Enum:classroom_reminder_importance", "low,medium,high")
                .OldAnnotation("Npgsql:Enum:classroom_timeline_event_item", "classroom_created,discussion_created,syllabus_created,syllabus_updated,syllabus_deleted,announcement_created,announcement_updated,announcement_deleted,reminder_created,user_joined_classroom")
                .OldAnnotation("Npgsql:Enum:file_upload_status", "queued,completed,error,ignored")
                .OldAnnotation("Npgsql:Enum:message_event", "change_topic,change_description,pinned_message,unpinned_message")
                .OldAnnotation("Npgsql:Enum:user_preferred_provider", "email,phone")
                .OldAnnotation("Npgsql:Enum:user_profile_color", "sky,pink,green,purple,rose,gray,orange")
                .OldAnnotation("Npgsql:Enum:whitelisted_file_extension", "aac,csv,pdf,xls,xlsx,ppt,pptx,bmp,gif,jpeg,jpg,jpe,png,tiff,tif,txt,text,rtf,doc,docx,dot,dotx,dwg,dwf,dxf,mp3,mp4,wav,avi,mov,mpeg,wmv,zip");
        }
    }
}
