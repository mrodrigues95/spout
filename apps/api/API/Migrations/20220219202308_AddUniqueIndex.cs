using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Migrations
{
    public partial class AddUniqueIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events");

            migrationBuilder.DropIndex(
                name: "ix_message_triggered_events_triggered_from_id",
                table: "message_triggered_events");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "message_triggered_events",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_message_triggered_events_triggered_from_id_triggered_to_id",
                table: "message_triggered_events",
                columns: new[] { "triggered_from_id", "triggered_to_id" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events");

            migrationBuilder.DropIndex(
                name: "ix_message_triggered_events_triggered_from_id_triggered_to_id",
                table: "message_triggered_events");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "message_triggered_events",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "pk_message_triggered_events",
                table: "message_triggered_events",
                columns: new[] { "id", "triggered_from_id", "triggered_to_id" });

            migrationBuilder.CreateIndex(
                name: "ix_message_triggered_events_triggered_from_id",
                table: "message_triggered_events",
                column: "triggered_from_id");
        }
    }
}
