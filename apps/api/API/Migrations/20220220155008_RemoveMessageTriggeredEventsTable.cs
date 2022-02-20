using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Migrations
{
    public partial class RemoveMessageTriggeredEventsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "message_triggered_events");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "message_triggered_events",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "timezone('UTC', now())"),
                    triggered_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "timezone('UTC', now())"),
                    triggered_from_id = table.Column<int>(type: "integer", nullable: false),
                    triggered_to_id = table.Column<int>(type: "integer", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "timezone('UTC', now())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_message_triggered_events", x => x.id);
                    table.ForeignKey(
                        name: "fk_message_triggered_events_messages_triggered_from_id",
                        column: x => x.triggered_from_id,
                        principalTable: "messages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_message_triggered_events_messages_triggered_to_id",
                        column: x => x.triggered_to_id,
                        principalTable: "messages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_message_triggered_events_triggered_from_id_triggered_to_id",
                table: "message_triggered_events",
                columns: new[] { "triggered_from_id", "triggered_to_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_message_triggered_events_triggered_to_id",
                table: "message_triggered_events",
                column: "triggered_to_id");
        }
    }
}
