using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations {
    public partial class AddClassroomAnnouncementTable : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "classroom_announcements",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    guid = table.Column<Guid>(type: "uuid", nullable: false),
                    created_by_id = table.Column<int>(type: "integer", nullable: false),
                    classroom_id = table.Column<int>(type: "integer", nullable: false),
                    content = table.Column<string>(type: "character varying(12000)", maxLength: 12000, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table => {
                    table.PrimaryKey("pk_classroom_announcements", x => x.id);
                    table.ForeignKey(
                        name: "fk_classroom_announcements_classrooms_classroom_id",
                        column: x => x.classroom_id,
                        principalTable: "classrooms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_classroom_announcements_users_created_by_id",
                        column: x => x.created_by_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_classroom_announcements_classroom_id",
                table: "classroom_announcements",
                column: "classroom_id");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_announcements_created_by_id",
                table: "classroom_announcements",
                column: "created_by_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "classroom_announcements");
        }
    }
}
