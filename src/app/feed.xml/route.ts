import RSS from 'rss';

import env from '@/env.mjs';
import { getBlogPosts } from '@/lib/blog';

const feed = new RSS({
  title: 'Dario Prawara Teh',
  description: 'Blog of Dario Prawara Teh',
  site_url: env.NEXT_PUBLIC_WEBSITE_URL,
  feed_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/feed.xml`,
});

getBlogPosts().map((post) => {
  feed.item({
    title: post.title,
    guid: `${env.NEXT_PUBLIC_WEBSITE_URL}/${post.language}/blog/${post.slug}`,
    url: `${env.NEXT_PUBLIC_WEBSITE_URL}/${post.language}/blog/${post.slug}`,
    date: post.publishedAt,
    description: post.summary,
    author: 'Dario Prawara Teh',
    categories: post.tags,
  });
});

export function GET() {
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
