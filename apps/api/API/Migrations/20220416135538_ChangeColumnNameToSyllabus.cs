using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations {
    public partial class ChangeColumnNameToSyllabus : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.RenameColumn(
                name: "overview",
                table: "classrooms",
                newName: "syllabus");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.RenameColumn(
                name: "syllabus",
                table: "classrooms",
                newName: "overview");
        }
    }
}
