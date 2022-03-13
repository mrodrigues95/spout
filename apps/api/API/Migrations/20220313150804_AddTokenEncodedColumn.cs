using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations {
    public partial class AddTokenEncodedColumn : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<string>(
                name: "token_encoded",
                table: "user_email_changes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "token_encoded",
                table: "user_email_changes");
        }
    }
}
