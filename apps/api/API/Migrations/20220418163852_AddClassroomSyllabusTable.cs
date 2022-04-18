using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations {
    public partial class AddClassroomSyllabusTable : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "syllabus",
                table: "classrooms");

            migrationBuilder.DropColumn(
                name: "syllabus_edited_at",
                table: "classrooms");

            migrationBuilder.AddColumn<int>(
                name: "syllabus_id",
                table: "classrooms",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "classroom_syllabus",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    guid = table.Column<Guid>(type: "uuid", nullable: false),
                    classroom_id = table.Column<int>(type: "integer", nullable: false),
                    content = table.Column<string>(type: "character varying(12000)", maxLength: 12000, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table => {
                    table.PrimaryKey("pk_classroom_syllabus", x => x.id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropForeignKey(
                name: "fk_classrooms_classroom_syllabus_syllabus_id",
                table: "classrooms");

            migrationBuilder.DropTable(
                name: "classroom_syllabus");

            migrationBuilder.DropIndex(
                name: "ix_classrooms_syllabus_id",
                table: "classrooms");

            migrationBuilder.DropColumn(
                name: "syllabus_id",
                table: "classrooms");

            migrationBuilder.AddColumn<string>(
                name: "syllabus",
                table: "classrooms",
                type: "character varying(12000)",
                maxLength: 12000,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "syllabus_edited_at",
                table: "classrooms",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}
