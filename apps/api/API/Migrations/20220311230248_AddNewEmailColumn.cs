using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations {
    public partial class AddNewEmailColumn : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<string>(
                name: "new_email",
                table: "user_email_changes",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "new_email",
                table: "user_email_changes");
        }
    }
}
