using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations {
    public partial class RemoveId : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "id",
                table: "message_triggered_events");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "message_triggered_events",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
