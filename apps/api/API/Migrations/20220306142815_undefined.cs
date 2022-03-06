using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations {
    public partial class undefined : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "content_html",
                table: "messages");

            migrationBuilder.AddColumn<string>(
                name: "bio",
                table: "users",
                type: "character varying(190)",
                maxLength: 190,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "bio",
                table: "users");

            migrationBuilder.AddColumn<string>(
                name: "content_html",
                table: "messages",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
