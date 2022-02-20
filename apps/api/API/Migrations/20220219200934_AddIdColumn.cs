using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations {
    public partial class AddIdColumn : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "message_triggered_events",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events",
                columns: new[] { "id", "triggered_from_id", "triggered_to_id" });

            migrationBuilder.CreateIndex(
                name: "ix_message_triggered_events_triggered_from_id",
                table: "message_triggered_events",
                column: "triggered_from_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events");

            migrationBuilder.DropIndex(
                name: "ix_message_triggered_events_triggered_from_id",
                table: "message_triggered_events");

            migrationBuilder.DropColumn(
                name: "id",
                table: "message_triggered_events");

            migrationBuilder.AddPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events",
                columns: new[] { "triggered_from_id", "triggered_to_id" });
        }
    }
}
