import { config } from "dotenv";
import { Client } from "@notionhq/client";

import { PropertyContentIF } from "./types";

config(); // env 환경변수

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID as string;

const getPropertyText = (property: PropertyContentIF) => {
  const properties = property.properties;
  const title = properties.title.title[0].plain_text;
  const content = properties.content.rich_text[0].plain_text;
  const date = properties.date.created_time;
  return { title, content, date };
};

const getMemo = async () => {
  const { results } = (await notion.databases.query({ database_id })) as any;
  const getMemo = results.map(getPropertyText);
  return getMemo;
};

const addMemo = async (argu: { title: string; content: string }) => {
  await notion.pages.create({
    parent: { type: "database_id", database_id: database_id },
    properties: {
      title: { title: [{ text: { content: argu.title } }] },
      content: { rich_text: [{ text: { content: argu.content } }] },
    },
  });
};

export { getMemo, addMemo };
