using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations {
    public partial class FixFKConstraint : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropForeignKey(
                name: "fk_classrooms_classroom_syllabus_syllabus_id",
                table: "classrooms");

            migrationBuilder.DropIndex(
                name: "ix_classrooms_syllabus_id",
                table: "classrooms");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_syllabus_classroom_id",
                table: "classroom_syllabus",
                column: "classroom_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_classroom_syllabus_classrooms_classroom_id",
                table: "classroom_syllabus",
                column: "classroom_id",
                principalTable: "classrooms",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropForeignKey(
                name: "fk_classroom_syllabus_classrooms_classroom_id",
                table: "classroom_syllabus");

            migrationBuilder.DropIndex(
                name: "ix_classroom_syllabus_classroom_id",
                table: "classroom_syllabus");

            migrationBuilder.CreateIndex(
                name: "ix_classrooms_syllabus_id",
                table: "classrooms",
                column: "syllabus_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_classrooms_classroom_syllabus_syllabus_id",
                table: "classrooms",
                column: "syllabus_id",
                principalTable: "classroom_syllabus",
                principalColumn: "id");
        }
    }
}
