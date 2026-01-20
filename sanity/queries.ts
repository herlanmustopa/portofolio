import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export interface ArticlePreview {
  _id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  description: string;
}

export interface ArticleDetail {
  _id: string;
  title: string;
  mainImage: any;
  authorName: string;
  publishedAt: string;
  body: any;
  slug: string;
  description: string;
}

// Query for article list (homepage preview)
export async function getArticles(): Promise<ArticlePreview[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    mainImage,
    "slug": slug.current,
    "description": pt::text(body[0..1])
  }`;

  const articles = await client.fetch(query);

  return articles.map((article: any) => ({
    _id: article._id,
    title: article.title,
    imageUrl: article.mainImage ? urlFor(article.mainImage).width(800).url() : null,
    slug: article.slug,
    description: article.description,
  }));
}

// Query for single article detail
export async function getArticle(slug: string): Promise<ArticleDetail | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    mainImage,
    "authorName": author->name,
    publishedAt,
    body,
    "slug": slug.current,
    "description": pt::text(body[0..2])
  }`;

  const article = await client.fetch(query, { slug });
  return article;
}

// Get all article slugs for static generation
export async function getAllArticleSlugs(): Promise<string[]> {
  const query = `*[_type == "post"].slug.current`;
  return client.fetch(query);
}
