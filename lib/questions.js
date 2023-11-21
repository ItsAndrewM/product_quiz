import path from "path";
import { promises as fs } from "fs";

const questionDirectory = path.join(process.cwd(), "data/questions");

export const getData = async () => {
  return questionDirectory;
};

export const getQuestionData = async (slug) => {
  const fullPath = await path.join(questionDirectory, `${slug}.json`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  return JSON.parse(fileContents);
};

export const getQuestionPaths = async () => {
  const paths = [];
  const fileNames = await fs.readdir(questionDirectory);
  for (const name of fileNames) {
    const pathFileName = await path.join(questionDirectory, `${name}`);
    const fileContent = await fs.readFile(pathFileName, "utf8");
    const parsedData = await JSON.parse(fileContent);
    for (const filePath of parsedData) {
      paths.push(
        `/${name.replace(/\.json$/, "")}/${filePath.breadcrumb.toLowerCase()}`
      );
    }
  }
  return paths;
};

export const getCategoryPaths = async () => {
  const paths = [];
  const fileNames = await fs.readdir(questionDirectory);
  for (const fileName of fileNames) {
    const id = fileName.replace(/\.json$/, "").toLowerCase();
    paths.push(id);
  }
  return paths;
};

export const getCurrentQuestionData = async (category, question) => {
  if (Boolean(category) === false && Boolean(question) === false) {
    throw new Error("Both a category and question slug is required");
  }
  const fullPath = await path.join(questionDirectory, `${category}.json`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const parsedData = await JSON.parse(fileContents);
  const curQuestion = parsedData.find((val) => {
    return val.breadcrumb.toLowerCase() === question.toLowerCase();
  });
  return curQuestion;
};

export const getNextQuestionData = async (category, question) => {
  if (Boolean(category) === false && Boolean(question) === false) {
    throw new Error("Both a category and question slug is required");
  }
  const fullPath = await path.join(questionDirectory, `${category}.json`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const parsedData = await JSON.parse(fileContents);
  const curQuestion = parsedData.findIndex((val) => {
    return val.breadcrumb.toLowerCase() === question.toLowerCase();
  });
  return parsedData[curQuestion + 1];
};

export const getPreviousQuestionData = async (category, question) => {
  if (Boolean(category) === false && Boolean(question) === false) {
    throw new Error("Both a category and question slug is required");
  }
  const fullPath = await path.join(questionDirectory, `${category}.json`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const parsedData = await JSON.parse(fileContents);
  const curQuestion = parsedData.findIndex((val) => {
    return val.breadcrumb.toLowerCase() === question.toLowerCase();
  });
  if (curQuestion === 0) {
    return { name: "home", slug: "/" };
  } else {
    return parsedData[curQuestion - 1];
  }
};
