using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations {
    public partial class ChangeCompositeKey : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropPrimaryKey(
                name: "pk_user_password_resets",
                table: "user_password_resets");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "user_password_resets",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "pk_user_password_resets",
                table: "user_password_resets",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_user_password_resets_token_user_id",
                table: "user_password_resets",
                columns: new[] { "token", "user_id" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropPrimaryKey(
                name: "pk_user_password_resets",
                table: "user_password_resets");

            migrationBuilder.DropIndex(
                name: "ix_user_password_resets_token_user_id",
                table: "user_password_resets");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "user_password_resets",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "pk_user_password_resets",
                table: "user_password_resets",
                columns: new[] { "id", "token", "user_id" });
        }
    }
}
