import { config } from "dotenv";
import { Client } from "@notionhq/client";

import { PropertyContentIF } from "./types";
import safeUndefined from "../utils/safe-undefined";

config(); // env 환경변수

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID as string;

const getPropertyText = (property: PropertyContentIF) => {
  const defaultValue = "";
  const properties = property.properties;

  const title = safeUndefined<typeof properties, string>(
    properties,
    "title.title.0.plain_text",
    defaultValue
  );

  const content = safeUndefined<typeof properties, string>(
    properties,
    "content.rich_text.0.plain_text",
    defaultValue
  );

  const date = safeUndefined<typeof properties, string>(
    properties,
    "date.created_time",
    defaultValue
  );

  const reaction = safeUndefined<typeof properties, string>(
    properties,
    "reaction.rich_text.0.plain_text",
    defaultValue
  );

  return { title, content, date, reaction };
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
