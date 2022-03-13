using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations {
    public partial class AddExpiresAtColumn : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropIndex(
                name: "ix_user_email_changes_token",
                table: "user_email_changes");

            migrationBuilder.AddColumn<DateTime>(
                name: "expires_at",
                table: "user_email_changes",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "ix_user_email_changes_token_user_id",
                table: "user_email_changes",
                columns: new[] { "token", "user_id" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropIndex(
                name: "ix_user_email_changes_token_user_id",
                table: "user_email_changes");

            migrationBuilder.DropColumn(
                name: "expires_at",
                table: "user_email_changes");

            migrationBuilder.CreateIndex(
                name: "ix_user_email_changes_token",
                table: "user_email_changes",
                column: "token");
        }
    }
}
