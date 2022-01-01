using API.Data;
using HotChocolate.Data;

namespace API.Extensions {
    public class UseApplicationDbContextAttribute : UseDbContextAttribute {
        public UseApplicationDbContextAttribute() : base(typeof(ApplicationDbContext)) { }
    }
}
