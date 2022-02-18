using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddPinnedByColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "pinned_by_id",
                table: "messages",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_messages_pinned_by_id",
                table: "messages",
                column: "pinned_by_id");

            migrationBuilder.AddForeignKey(
                name: "fk_messages_users_pinned_by_id",
                table: "messages",
                column: "pinned_by_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_messages_users_pinned_by_id",
                table: "messages");

            migrationBuilder.DropIndex(
                name: "ix_messages_pinned_by_id",
                table: "messages");

            migrationBuilder.DropColumn(
                name: "pinned_by_id",
                table: "messages");
        }
    }
}
