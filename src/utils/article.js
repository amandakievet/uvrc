import tagOrder from "../data/article-tags";
export const articleCompare = (a, b) => {
  if (tagOrder.indexOf(a.node.data.tag) < tagOrder.indexOf(b.node.data.tag)) {
    return -1;
  }
  if (tagOrder.indexOf(a.node.data.tag) > tagOrder.indexOf(b.node.data.tag)) {
    return 1;
  }
  return 0;
};

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
