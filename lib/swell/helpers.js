import swellConfig from "@/swell.config";
import swell from "swell-js";
import { isNumeric } from "../helpers/helpers";

const CATEGORY_SLUGS = [
  "dinghies-tenders-inflatable",
  "sails",
  "furlers-tracks",
  "anchoring",
];

const CATEGORY_ACCESORY_SLUGS = [
  "dinghies-tenders-dinghy-accessories",
  "anchoring-anchor-accessories",
];

const normalizeProduct = (product) => {
  const variants = product.variants?.results ?? [];
  const images =
    product.images?.map((image) => ({ ...image, src: image.file.url })) ?? [];
  return { ...product, variants, images };
};

const normalizeProducts = (productResults) => {
  return productResults.map((product) => {
    return normalizeProduct(product);
  });
};

export const getParentCategories = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({
    limit: 100,
  });
  const parents = categories?.results?.filter((category) => {
    return !category.parent_id;
  });

  return parents;
};

export const getChildCategories = async () => {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const categories = await swell.categories.list({
    limit: 100,
  });
  const children = categories?.results?.filter((category) => {
    return category.parent_id !== null;
  });
  return children;
};

export const getCollection = async (options, pageNum) => {
  if (Boolean(options.id) === Boolean(options.handle)) {
    throw new Error("Either a handle or id is required");
  }

  const slug = options.id || options.handle;
  const query = CATEGORY_SLUGS.find((val) => val.includes(slug));
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const category = await swell.categories.get(query, {});
  const categoryParent = category.parent_id
    ? await swell.categories.get(category.parent_id, {})
    : null;

  const result = await swell.products.list({
    categories: query,
    limit: 24,
    page: !pageNum ? 1 : pageNum,
  });

  const products = result?.results ? normalizeProducts(result?.results) : [];

  const count = result?.count ? result.count : 0;
  const page_count = result?.page_count ? result.page_count : 0;
  const page = result?.page ? result.page : 0;
  const children = category?.children?.results
    ? normalizeProducts(category?.children?.results)
    : [];
  const hasNextPage = category?.products?.page_count > 1 ? true : false;
  const nextPageCursor = null;
  return {
    ...category,
    children,
    products,
    nextPageCursor,
    hasNextPage,
    count,
    page_count,
    page,
    categoryParent,
  };
};

const compareAnswers = (product, answers) => {
  // Initialize the score to zero
  let score = 0;
  // Loop through the answers and compare them with the product’s attributes
  Object.keys(answers).forEach((key) => {
    Object.keys(product).forEach((productKey) => {
      const productValue = product[productKey];
      if (
        typeof answers[key] === "string" &&
        typeof product[productKey] === "string"
      ) {
        if (product[productKey].includes(answers[key])) {
          // If it matches, increase the score by one
          score++;
        }
      }
      // If the answer is an array, check if it contains the product’s attribute
      else if (Array.isArray(answers[key])) {
        if (answers[key].includes(product[productKey])) {
          // If it contains, increase the score by one
          score++;
        }
      } // If the answer is a number, check if it is within the product’s attribute range
      else if (
        isNumeric(answers[key]) &&
        typeof product[productKey] === "number"
      ) {
        if (product[productKey] <= answers[key]) {
          // If it is within, increase the score by one
          score++;
        }
      } else if (
        typeof product[productKey] === "object" &&
        productKey !== "images" &&
        !Array.isArray(product[productKey]) &&
        product[productKey]
      ) {
        Object.keys(productValue).forEach((objectKey) => {
          const objectValue = productValue[objectKey];
          Object.keys(objectValue).forEach((aKey) => {
            if (
              typeof answers[key] === "string" &&
              typeof objectValue[aKey] === "string"
            ) {
              if (objectValue[aKey].includes(answers[key])) {
                // If it matches, increase the score by one
                score++;
              }
            } else if (
              typeof answers[key] === "number" &&
              typeof objectValue[aKey] === "number"
            ) {
              if (objectValue[aKey] <= answers[key]) {
                // If it is within, increase the score by one
                score++;
              }
            }
          });
        });
      }
    });
  });
  return score;
};

// Define a function that will loop through the products and find the best matches based on the score
export const findBestMatches = (categoryProducts, customerAnswers) => {
  // Initialize an empty array to store the best matches
  let bestMatches = [];

  // Initialize a variable to store the highest score
  let highestScore = 0;
  // Loop through the products in the category
  categoryProducts.forEach((product, index) => {
    // Get the current product
    // const product = categoryProducts[index];
    const score = compareAnswers(product, customerAnswers);
    // If the score is higher than the highest score, update the highest score and clear the best matches array
    if (score > highestScore) {
      highestScore = score;
      bestMatches = [];
    }
    // If the score is equal to the highest score, add the product to the best matches array
    if (score === highestScore) {
      bestMatches.push(product);
    }
  });

  // Return the best matches array
  return bestMatches;
};

export const getCategoryAccessories = async (options, pageNum) => {
  if (Boolean(options.id) === Boolean(options.handle)) {
    throw new Error("Either a handle or id is required");
  }
  const slug = options.id || options.handle;
  if (slug !== "anchoring" && slug !== "dinghies") {
    return [];
  }
  const query = CATEGORY_ACCESORY_SLUGS.find((val) => val.includes(slug));
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const category = await swell.categories.get(query, {});
  const categoryParent = category.parent_id
    ? await swell.categories.get(category.parent_id, {})
    : null;

  const result = await swell.products.list({
    categories: query,
    limit: 24,
    page: !pageNum ? 1 : pageNum,
  });

  const products = result?.results ? normalizeProducts(result?.results) : [];

  const count = result?.count ? result.count : 0;
  const page_count = result?.page_count ? result.page_count : 0;
  const page = result?.page ? result.page : 0;
  const children = category?.children?.results
    ? normalizeProducts(category?.children?.results)
    : [];
  const hasNextPage = category?.products?.page_count > 1 ? true : false;
  const nextPageCursor = null;
  return {
    ...category,
    children,
    products,
    nextPageCursor,
    hasNextPage,
    count,
    page_count,
    page,
    categoryParent,
  };
};
