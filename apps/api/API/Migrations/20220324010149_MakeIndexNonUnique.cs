using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations {
    public partial class MakeIndexNonUnique : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropIndex(
                name: "ix_user_phone_number_changes_token_user_id",
                table: "user_phone_number_changes");

            migrationBuilder.CreateIndex(
                name: "ix_user_phone_number_changes_token_user_id",
                table: "user_phone_number_changes",
                columns: new[] { "token", "user_id" });
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropIndex(
                name: "ix_user_phone_number_changes_token_user_id",
                table: "user_phone_number_changes");

            migrationBuilder.CreateIndex(
                name: "ix_user_phone_number_changes_token_user_id",
                table: "user_phone_number_changes",
                columns: new[] { "token", "user_id" },
                unique: true);
        }
    }
}
