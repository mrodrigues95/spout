using HotChocolate;

namespace API.Attributes {
    public class GlobalUserIdAttribute : GlobalStateAttribute {
        public GlobalUserIdAttribute() : base("userId") { }
    }
}
