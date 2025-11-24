import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

interface PostPageProps {
  params: { slug: string }
}

interface Post {
  slug: string
  content: string
  title?: string
  date?: string
  author?: string
  category?: string
  readTime?: string
  excerpt?: string
}

function getPost(slug: string): Post | null {
  try {
    const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...data
    } as Post
  } catch (error) {
    return null
  }
}

function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts')

  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)

  return filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug: filename.replace('.mdx', ''),
        content: '',
        ...data
      } as Post
    })
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date + 'T00:00:00').getTime() : 0
      const dateB = b.date ? new Date(b.date + 'T00:00:00').getTime() : 0
      return dateB - dateA
    })
}

function getAdjacentPosts(currentSlug: string) {
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug)

  return {
    prevPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    nextPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')

  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)

  return filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => ({
      slug: filename.replace('.mdx', '')
    }))
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  const { prevPost, nextPost } = getAdjacentPosts(params.slug)

  // Remove the first heading from content since we display it in the header
  const contentWithoutTitle = post.content.replace(/^#\s+.+$/m, '').trim()

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      {/* Back to Blog Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>
      </div>

      <header className="mb-12">
        {post.category && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
              {post.category}
            </span>
          </div>
        )}
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title || 'Untitled'}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>{post.author || 'VeraLex Team'}</span>
          <span>•</span>
          <time>{post.date ? new Date(post.date + 'T00:00:00').toLocaleDateString() : 'No date'}</time>
          <span>•</span>
          <span>{post.readTime || '5 min read'}</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        <MDXRemote source={contentWithoutTitle} />
      </div>

      {/* Previous/Next Post Navigation */}
      <nav className="border-t pt-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Previous Post */}
          <div className="text-left">
            {prevPost ? (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="group inline-flex flex-col space-y-2 hover:text-indigo-600 transition-colors"
              >
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </span>
                <span className="font-medium group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div className="text-gray-400">
                <span className="text-sm flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </span>
                <span className="text-sm">No previous post</span>
              </div>
            )}
          </div>

          {/* Next Post */}
          <div className="text-right">
            {nextPost ? (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group inline-flex flex-col space-y-2 hover:text-indigo-600 transition-colors"
              >
                <span className="text-sm text-gray-500 flex items-center justify-end gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </span>
                <span className="font-medium group-hover:text-indigo-600 transition-colors line-clamp-2 text-right">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div className="text-gray-400">
                <span className="text-sm flex items-center justify-end gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </span>
                <span className="text-sm">No next post</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </article>
  )
}