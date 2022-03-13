using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Migrations {
    public partial class AddUserEmailChangeTable : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "user_email_changes",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    token = table.Column<string>(type: "text", nullable: false),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "timezone('UTC', now())"),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "timezone('UTC', now())")
                },
                constraints: table => {
                    table.PrimaryKey("pk_user_email_changes", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_email_changes_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_user_email_changes_token",
                table: "user_email_changes",
                column: "token");

            migrationBuilder.CreateIndex(
                name: "ix_user_email_changes_user_id",
                table: "user_email_changes",
                column: "user_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "user_email_changes");
        }
    }
}
