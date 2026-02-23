# VeraLex Blog

A static blog built with Next.js for VeraLex legal services platform.

## 🚀 Getting Started

### Installation

```bash
# Navigate to the blog directory
cd /Users/jeonghwan/Desktop/veralex-blog

# Install dependencies
npm install

# Add @tailwindcss/typography plugin
npm install @tailwindcss/typography
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

## 📝 Writing Blog Posts

Blog posts are written in MDX format (Markdown with JSX support) and stored in `/content/posts/`.

### Creating a New Post

1. Create a new `.mdx` file in `/content/posts/`
2. Add frontmatter metadata at the top:

```mdx
---
title: "Your Post Title"
date: "2025-01-20"
author: "Author Name"
category: "Legal Guides"
excerpt: "A brief description of your post"
readTime: "5 min read"
---

# Your content here...
```

### Categories

Current categories:
- Legal Guides
- Immigration
- Business
- Consumer Rights

## 🏗️ Project Structure

```
veralex-blog/
├── app/
│   ├── layout.tsx          # Main layout with navigation
│   ├── page.tsx            # Homepage with all posts
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx   # Individual post page
│   └── globals.css         # Global styles
├── content/
│   └── posts/              # MDX blog posts
├── public/                 # Static assets
└── next.config.js          # Next.js configuration
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. Import to Vercel:
- Go to [vercel.com](https://vercel.com)
- Import GitHub repository
- Deploy automatically

3. Set custom domain:
- In Vercel dashboard → Settings → Domains
- Add `blog.veralex.com`

### Option 2: Static Export

1. Build static files:
```bash
npm run build
```

2. Static files will be in `/out` directory
3. Deploy to any static hosting (Netlify, GitHub Pages, S3, etc.)

## 🔗 Integration with Main Site

### In your main VeraLex app:

```typescript
// Update Blog links to external URL
<a href="https://blog.veralex.com" target="_blank">
  Blog
</a>
```

Or if using subdirectory:
```typescript
<a href="https://veralex.com/blog">
  Blog
</a>
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to match your brand colors:
```typescript
colors: {
  primary: {
    DEFAULT: '#6366f1',  // Your primary color
    dark: '#4f46e5',
  },
}
```

### Typography
Modify prose styles in `tailwind.config.ts` for article formatting.

## 📚 Adding Features

### RSS Feed
```bash
npm install feed
# Create app/feed.xml/route.ts for RSS generation
```

### Sitemap
```bash
npm install next-sitemap
# Add next-sitemap.config.js
```

### Search
Consider adding:
- Algolia DocSearch
- Or local search with Fuse.js

### Comments
Options:
- Disqus
- Giscus (GitHub Discussions)
- Utterances (GitHub Issues)

## 🔍 SEO

Each post can have custom metadata:
```mdx
---
title: "Page Title"
description: "Meta description"
keywords: "legal, advice, immigration"
ogImage: "/images/post-cover.jpg"
---
```

## 📈 Analytics

Add to `app/layout.tsx`:
```typescript
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

## Commit Message Tags

Use these prefixes for commit messages:

| Tag | When to use |
|---|---|
| `New Post:` | Adding a new blog post |
| `Add` | Adding a new feature or component |
| `Fix:` | Bug fixes |
| `Update` | Enhancements to existing features |

Example: `New Post: Will AI Replace Lawyers?`

## 🤝 Contributing

1. Write posts in MDX format
2. Place in `/content/posts/`
3. Follow naming convention: `kebab-case-title.mdx`
4. Include all required frontmatter fields
5. Test locally before deploying

## 📄 License

© 2025 VeraLex. All rights reserved.