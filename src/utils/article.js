export const embellishTitle = (title, tag) => {
  switch (tag) {
    case "Ask the Coaches":
      return `Ask the Coaches: ${title}`;
    case "Letter from a Board Member":
      return `Letter from a Board Member: ${title}`;
    default:
      return title;
  }
};
