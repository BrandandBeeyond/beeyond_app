const getFontFamily = (baseFont = 'Roboto', weight) => {
  switch (weight) {
    case 100:
      return `${baseFont}-Thin`;
    case 200:
      return `${baseFont}-ExtraLight`;
    case 300:
      return `${baseFont}-Light`;
    case 400:
      return `${baseFont}-Regular`;
    case 500:
      return `${baseFont}-Medium`;
    case 600:
      return `${baseFont}-SemiBold`;
    case 700:
      return `${baseFont}-Bold`;
    case 800:
      return `${baseFont}-ExtraBold`;
    case 900:
      return `${baseFont}-Black`;
    default:
      return `${baseFont}-Regular`;
  }
};

export default getFontFamily;
