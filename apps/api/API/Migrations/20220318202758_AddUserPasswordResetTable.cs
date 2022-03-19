using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations {
    public partial class AddUserPasswordResetTable : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "user_password_resets",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false),
                    token = table.Column<string>(type: "text", nullable: false),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    token_encoded = table.Column<string>(type: "text", nullable: false),
                    expires_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table => {
                    table.PrimaryKey("pk_user_password_resets", x => new { x.id, x.token, x.user_id });
                    table.ForeignKey(
                        name: "fk_user_password_resets_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_user_password_resets_token",
                table: "user_password_resets",
                column: "token");

            migrationBuilder.CreateIndex(
                name: "ix_user_password_resets_user_id",
                table: "user_password_resets",
                column: "user_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "user_password_resets");
        }
    }
}
