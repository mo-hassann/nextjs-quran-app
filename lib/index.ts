export function generateRandomUserName(name: string, minChars: number = 12, maxChars: number = 26) {
  // Replace spaces with underscores
  let username = name.trim().replace(/\s+/g, "_");

  // Remove or replace any non-alphanumeric characters except underscores
  username = username.replace(/[^a-zA-Z0-9_]/g, "");

  // Convert the username to lowercase
  username = username.toLowerCase();

  // If the username is longer than maxChars characters, truncate it to maxChars characters
  if (username.length > maxChars) {
    username = username.substring(0, maxChars);
  }

  // If the username is shorter than the minChars characters, append random numbers to make it minChars characters long
  while (username.length < minChars) {
    // Generate a random number between 0 and 9
    const randomNum = Math.floor(Math.random() * 10);
    username += randomNum;
  }

  // Return the converted username
  return username;
}

export function convertToArabicNumbers(str: string) {
  const englishToArabic: Record<string, string> = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
  };

  return str.replace(/\d/g, (digit) => englishToArabic[digit]);
}
