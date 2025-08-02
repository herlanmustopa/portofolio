import { createClient } from 'next-sanity'

// Ambil detail proyek dari Sanity Studio Anda
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // `false` jika Anda ingin data yang benar-benar real-time
})