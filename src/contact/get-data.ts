import { type ContactList } from "./types";

const CONTACT_LIST = {
  blog: "https://jiwooproity.tistory.com/",
  notion: "https://organized-jellyfish-19b.notion.site/1579598f11a14aa5bfc83c3606914732?pvs=4",
  email: "jiwooproity@naver.com",
  websites: ["https://www.jiwoo.so/", "https://bglovely.com/", "http://www.skinclouds.net/"],
};

export const getContact = (): ContactList => {
  return CONTACT_LIST;
};
