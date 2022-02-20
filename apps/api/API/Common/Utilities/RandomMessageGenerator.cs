using System;
using System.Text;

namespace API.Common.Utilities {
    public class RandomMessageGenerator {
        private static readonly Random _random = new Random();
        private static readonly StringBuilder _builder = new StringBuilder();
        private static readonly string[] _words = { "anemone", "wagstaff", "man", "the", "for",
            "and", "a", "with", "bird", "fox", "wow", "teachers", "students" };

        /// <summary>
        /// Generates a set number of paragraphs that will contain random words with varying lengths.
        /// </summary>
        /// <param name="numberParagraphs">The total number of paragraphs that will be generated.</param>
        /// <param name="minSentences">The minimum number of sentences that will be in each paragraph.</param>
        /// <param name="maxSentences">The maximum number of sentences that will be in each paragraph.</param>
        /// <param name="minWords">The minimum number of words that will be in each sentence.</param>
        /// <param name="maxWords">The maximum number of words that will be in each sentence.</param>
        public static string Generate(int numberParagraphs, int minSentences,
            int maxSentences, int minWords, int maxWords) {
            _builder.Clear();
            for (int i = 0; i < numberParagraphs; i++) {
                GenerateParagraph(_random.Next(minSentences, maxSentences + 1),
                     minWords, maxWords);
                _builder.Append("\n\n");
            }
            return _builder.ToString();
        }

        private static void GenerateParagraph(int numberSentences, int minWords, int maxWords) {
            for (int i = 0; i < numberSentences; i++) {
                int count = _random.Next(minWords, maxWords + 1);
                GenerateSentence(count);
            }
        }

        private static void GenerateSentence(int numberWords) {
            StringBuilder b = new StringBuilder();

            // Add n words together.
            for (int i = 0; i < numberWords; i++) // Number of words.
            {
                b.Append(_words[_random.Next(_words.Length)]).Append(" ");
            }
            string sentence = b.ToString().Trim() + ". ";

            // Uppercase sentence.
            sentence = char.ToUpper(sentence[0]) + sentence.Substring(1);

            // Add this sentence to the class.
            _builder.Append(sentence);
        }
    }
}
