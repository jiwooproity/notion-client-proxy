interface PropertyTitleIF {
  title: {
    plain_text: string;
  }[];
}

interface PropertyRichTextIF {
  rich_text: {
    plain_text: string;
  }[];
}

interface PropertyDateIF {
  created_time: string;
}

interface PropertyContentIF {
  properties: {
    content: PropertyRichTextIF;
    date: PropertyDateIF;
    title: PropertyTitleIF;
  };
}

export { PropertyContentIF };
