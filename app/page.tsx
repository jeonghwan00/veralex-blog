import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogClient from '@/components/BlogClient'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  category: string
  readTime: string
  featured?: boolean
}

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts')

  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
        author: data.author || 'VeraLex Team',
        category: data.category || 'General',
        readTime: data.readTime || '5 min read',
        featured: data.featured || false,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export default function BlogPage() {
  const posts = getPosts()

  return <BlogClient posts={posts} />
}