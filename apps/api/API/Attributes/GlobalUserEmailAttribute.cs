using HotChocolate;

namespace API.Attributes {
    public class GlobalUserEmailAttribute : GlobalStateAttribute {
        public GlobalUserEmailAttribute() : base("userEmail") { }
    }
}
