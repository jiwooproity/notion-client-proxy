import dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { safeUndefined } from "../utils";

dotenv.config(); // env 환경변수

export interface ReturnNotionData {
  title: string;
  content: string;
  date: string;
  reaction: string;
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID as string;

const getPropertyText = (property: DatabaseObjectResponse) => {
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

const getMemo = async (): Promise<ReturnNotionData[]> => {
  const data = await notion.databases.query({ database_id });
  const results = data.results as DatabaseObjectResponse[];
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
