export function readTime(content: string, wordsPerMinute = 130) {
  // Count the total number of words in the content
  const wordCount = content.split(/\s+/).length;

  // Calculate the estimated reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} min`;
}
