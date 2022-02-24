using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations {
    public partial class AddContentHTMLColumn : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<string>(
                name: "content_html",
                table: "messages",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "content_html",
                table: "messages");
        }
    }
}
