const shortenText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substr(0, maxLength)}...`;
};

export default shortenText;
