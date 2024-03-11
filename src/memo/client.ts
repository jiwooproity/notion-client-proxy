const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

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
  date: {
    start: string;
  };
}

interface PropertyContentIF {
  properties: {
    content: PropertyRichTextIF;
    date: PropertyDateIF;
    title: PropertyTitleIF;
  };
}

const getPropertyText = (property: PropertyContentIF) => {
  const properties = property.properties;
  const title = properties.title.title[0].plain_text;
  const content = properties.content.rich_text[0].plain_text;
  const date = properties.date.date.start;
  return { title, content, date };
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const requestMemoList = async () => {
  const { results } = await notion.databases.query({ database_id });
  const getMemo = results.map(getPropertyText);
  return getMemo;
};

module.exports = { getMemoList: requestMemoList };
