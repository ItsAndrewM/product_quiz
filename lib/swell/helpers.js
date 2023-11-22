import swellConfig from "@/swell.config";
import swell from "swell-js";

const CATEGORY_SLUGS = [
  "dinghies-tenders",
  "sails",
  "furlers-tracks",
  "anchoring",
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
  console.log(query);
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
