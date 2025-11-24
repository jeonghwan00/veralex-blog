'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

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

interface BlogClientProps {
  posts: Post[]
}

const categories = ["All", "Company", "Legal Info", "Immigration", "Business", "Baklava", "Updates"]

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  const featuredPosts = posts.filter(post => post.featured)

  return (
    <>
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="px-4 pb-16 bg-gradient-to-b from-[#f8faff] to-white border-b">
          <div className="max-w-6xl mx-auto text-center pt-16">
            <Badge className="mb-4 bg-primary/10 text-primary font-medium">
              VeraLex Blog
            </Badge>
            <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
              Insights & Updates
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-1">
              Stories, guides, and thoughts on
            </p>
            <p className="text-base md:text-lg text-primary font-semibold mt-1 leading-snug">
              Accessible Legal Help, Made Simple.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="px-4 pb-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {featuredPosts.map(post => (
                  <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                    <Link href={`/posts/${post.slug}`} className="block">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge 
                            variant="outline"
                            className={post.category === "Baklava" ? "bg-[#A8D5BA]/20 border-[#A8D5BA] text-[#5A8A6F] font-['Comic_Sans_MS',_'Chalkboard_SE',_cursive]" : ""}
                          >
                            {post.category}
                          </Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                        </div>
                        <CardTitle className="text-xl hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="flex items-center text-primary">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => {
                // Special styling for Baklava category
                const isBaklava = category === "Baklava"
                const isSelected = selectedCategory === category
                
                if (isBaklava && isSelected) {
                  return (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      size="sm"
                      className="bg-[#A8D5BA] hover:bg-[#8FC9A8] text-gray-800 font-['Comic_Sans_MS',_'Chalkboard_SE',_cursive] shadow-sm"
                    >
                      {category}
                    </Button>
                  )
                }
                
                if (isBaklava) {
                  return (
                    <Button
                      key={category}
                      variant="outline"
                      onClick={() => setSelectedCategory(category)}
                      size="sm"
                      className="border-[#A8D5BA] text-[#7AA68A] hover:bg-[#A8D5BA]/10 font-['Comic_Sans_MS',_'Chalkboard_SE',_cursive]"
                    >
                      {category}
                    </Button>
                  )
                }
                
                return (
                  <Button
                    key={category}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === "All" ? "All Articles" : selectedCategory}
            </h2>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No posts in this category yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                    <Link href={`/posts/${post.slug}`} className="block">
                      <CardHeader>
                        <Badge 
                          variant="outline" 
                          className={`mb-2 w-fit ${post.category === "Baklava" ? "bg-[#A8D5BA]/20 border-[#A8D5BA] text-[#5A8A6F] font-['Comic_Sans_MS',_'Chalkboard_SE',_cursive]" : ""}`}
                        >
                          {post.category}
                        </Badge>
                        <CardTitle className="text-lg hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Legal Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with verified attorneys for fixed-price legal services
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="http://localhost:5173/request">
                <Button size="lg">
                  Get Started Now
                </Button>
              </Link>
              <Link href="http://localhost:5173/attorney-application">
                <Button size="lg" className="bg-white text-black border border-gray-200 hover:bg-gray-50">
                  Join as Attorney
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}