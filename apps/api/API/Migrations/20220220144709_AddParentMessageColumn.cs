using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddParentMessageColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_message_triggered_events_messages_triggered_to_id",
                table: "message_triggered_events");

            migrationBuilder.DropForeignKey(
                name: "fk_message_triggered_events_messages_triggered_to_id1",
                table: "message_triggered_events");

            migrationBuilder.AddColumn<int>(
                name: "parent_message_id",
                table: "messages",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_messages_parent_message_id",
                table: "messages",
                column: "parent_message_id");

            migrationBuilder.AddForeignKey(
                name: "fk_message_triggered_events_messages_triggered_from_id",
                table: "message_triggered_events",
                column: "triggered_from_id",
                principalTable: "messages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_message_triggered_events_messages_triggered_to_id",
                table: "message_triggered_events",
                column: "triggered_to_id",
                principalTable: "messages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_messages_messages_parent_message_id",
                table: "messages",
                column: "parent_message_id",
                principalTable: "messages",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_message_triggered_events_messages_triggered_from_id",
                table: "message_triggered_events");

            migrationBuilder.DropForeignKey(
                name: "fk_message_triggered_events_messages_triggered_to_id",
                table: "message_triggered_events");

            migrationBuilder.DropForeignKey(
                name: "fk_messages_messages_parent_message_id",
                table: "messages");

            migrationBuilder.DropIndex(
                name: "ix_messages_parent_message_id",
                table: "messages");

            migrationBuilder.DropColumn(
                name: "parent_message_id",
                table: "messages");

            migrationBuilder.AddForeignKey(
                name: "fk_message_triggered_events_messages_triggered_to_id",
                table: "message_triggered_events",
                column: "triggered_from_id",
                principalTable: "messages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_message_triggered_events_messages_triggered_to_id1",
                table: "message_triggered_events",
                column: "triggered_to_id",
                principalTable: "messages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
