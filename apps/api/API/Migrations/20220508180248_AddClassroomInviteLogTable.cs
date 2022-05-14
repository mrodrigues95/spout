using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations {
    public partial class AddClassroomInviteLogTable : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropForeignKey(
                name: "fk_classroom_invites_invites_invite_id",
                table: "classroom_invites");

            migrationBuilder.DropForeignKey(
                name: "fk_classroom_invites_users_user_id",
                table: "classroom_invites");

            migrationBuilder.DropTable(
                name: "invites");

            migrationBuilder.DropPrimaryKey(
                name: "pk_classroom_invites",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "is_invitee",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "is_inviter",
                table: "classroom_invites");

            migrationBuilder.RenameColumn(
                name: "used_at",
                table: "classroom_invites",
                newName: "expires_at");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "classroom_invites",
                newName: "created_by_id");

            migrationBuilder.RenameColumn(
                name: "invite_id",
                table: "classroom_invites",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "ix_classroom_invites_user_id",
                table: "classroom_invites",
                newName: "ix_classroom_invites_created_by_id");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "classroom_invites",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "code",
                table: "classroom_invites",
                type: "character varying(22)",
                maxLength: 22,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "classroom_invites",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "now()");

            migrationBuilder.AddColumn<Guid>(
                name: "guid",
                table: "classroom_invites",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "max_age",
                table: "classroom_invites",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "max_uses",
                table: "classroom_invites",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "total_uses",
                table: "classroom_invites",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddPrimaryKey(
                name: "pk_classroom_invites",
                table: "classroom_invites",
                column: "id");

            migrationBuilder.CreateTable(
                name: "classroom_invite_logs",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    guid = table.Column<Guid>(type: "uuid", nullable: false),
                    classroom_invite_id = table.Column<int>(type: "integer", nullable: false),
                    used_by_id = table.Column<int>(type: "integer", nullable: false),
                    used_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()")
                },
                constraints: table => {
                    table.PrimaryKey("pk_classroom_invite_logs", x => x.id);
                    table.ForeignKey(
                        name: "fk_classroom_invite_logs_classroom_invites_classroom_invite_id",
                        column: x => x.classroom_invite_id,
                        principalTable: "classroom_invites",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_classroom_invite_logs_users_used_by_id",
                        column: x => x.used_by_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_classroom_invites_code",
                table: "classroom_invites",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_classroom_invite_logs_classroom_invite_id",
                table: "classroom_invite_logs",
                column: "classroom_invite_id");

            migrationBuilder.CreateIndex(
                name: "ix_classroom_invite_logs_used_by_id",
                table: "classroom_invite_logs",
                column: "used_by_id");

            migrationBuilder.AddForeignKey(
                name: "fk_classroom_invites_users_created_by_id",
                table: "classroom_invites",
                column: "created_by_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropForeignKey(
                name: "fk_classroom_invites_users_created_by_id",
                table: "classroom_invites");

            migrationBuilder.DropTable(
                name: "classroom_invite_logs");

            migrationBuilder.DropPrimaryKey(
                name: "pk_classroom_invites",
                table: "classroom_invites");

            migrationBuilder.DropIndex(
                name: "ix_classroom_invites_code",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "code",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "guid",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "max_age",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "max_uses",
                table: "classroom_invites");

            migrationBuilder.DropColumn(
                name: "total_uses",
                table: "classroom_invites");

            migrationBuilder.RenameColumn(
                name: "expires_at",
                table: "classroom_invites",
                newName: "used_at");

            migrationBuilder.RenameColumn(
                name: "created_by_id",
                table: "classroom_invites",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "classroom_invites",
                newName: "invite_id");

            migrationBuilder.RenameIndex(
                name: "ix_classroom_invites_created_by_id",
                table: "classroom_invites",
                newName: "ix_classroom_invites_user_id");

            migrationBuilder.AlterColumn<int>(
                name: "invite_id",
                table: "classroom_invites",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<bool>(
                name: "is_invitee",
                table: "classroom_invites",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "is_inviter",
                table: "classroom_invites",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "pk_classroom_invites",
                table: "classroom_invites",
                columns: new[] { "invite_id", "user_id", "classroom_id" });

            migrationBuilder.CreateTable(
                name: "invites",
                columns: table => new {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    code = table.Column<string>(type: "character varying(22)", maxLength: 22, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    expires_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    max_age = table.Column<int>(type: "integer", nullable: true),
                    max_uses = table.Column<short>(type: "smallint", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "now()"),
                    uses = table.Column<short>(type: "smallint", nullable: false, defaultValue: (short)0)
                },
                constraints: table => {
                    table.PrimaryKey("pk_invites", x => x.id);
                    table.CheckConstraint("ck_max_uses", "max_uses >= 0 AND max_uses <= 100");
                    table.CheckConstraint("ck_uses", "uses >= 0");
                });

            migrationBuilder.CreateIndex(
                name: "ix_invites_code",
                table: "invites",
                column: "code",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_classroom_invites_invites_invite_id",
                table: "classroom_invites",
                column: "invite_id",
                principalTable: "invites",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_classroom_invites_users_user_id",
                table: "classroom_invites",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
