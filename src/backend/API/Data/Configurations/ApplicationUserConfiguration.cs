﻿using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser> {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder) {
            builder.Property(au => au.FirstName).HasMaxLength(35);

            builder.Property(au => au.LastName).HasMaxLength(35);

            builder.Property(au => au.Email).HasMaxLength(256);
        }
    }
}
