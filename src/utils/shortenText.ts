const shortenText = (text: string, maxLength: number) => {
  const textLength = text.length;

  if (textLength < maxLength) {
    return text;
  }
  const res = text.substring(0, maxLength);

  return `${res}...`;
};

export default shortenText;
