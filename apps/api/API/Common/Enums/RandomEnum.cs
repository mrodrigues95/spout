using System;

namespace API.Common.Enums {
    public static class RandomEnum {
        private static Random _Random = new Random();

        public static T Of<T>() where T : Enum {
            var enumValues = Enum.GetValues(typeof(T));
            var randomEnum = enumValues.GetValue(_Random.Next(enumValues.Length));
            return (T)randomEnum!;
        }
    }
}
