using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations {
    public partial class AddIsDeletedColumn : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "classrooms",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "classrooms");
        }
    }
}
