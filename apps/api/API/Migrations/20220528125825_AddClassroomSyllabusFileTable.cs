using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations {
    public partial class AddClassroomSyllabusFileTable : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "classroom_syllabus_files",
                columns: table => new {
                    classroom_syllabus_id = table.Column<int>(type: "integer", nullable: false),
                    file_id = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table => {
                    table.PrimaryKey("pk_classroom_syllabus_files", x => new { x.classroom_syllabus_id, x.file_id });
                    table.ForeignKey(
                        name: "fk_classroom_syllabus_files_classroom_syllabus_classroom_sylla",
                        column: x => x.classroom_syllabus_id,
                        principalTable: "classroom_syllabus",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_classroom_syllabus_files_files_file_id",
                        column: x => x.file_id,
                        principalTable: "files",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_classroom_syllabus_files_file_id",
                table: "classroom_syllabus_files",
                column: "file_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "classroom_syllabus_files");
        }
    }
}
