"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type Post } from "@/lib/blog";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col border border-foreground/10 transition-colors duration-300 hover:border-foreground/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-foreground/[0.03] border-b border-foreground/10">
        {post.image ? (
          <img
            src={post.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-grid-lines flex items-center justify-center">
            <span className="font-display text-7xl text-foreground/10 transition-colors group-hover:text-[#eca8d6]/40">
              {post.category.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-4 left-4 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white/80 backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <h3 className="text-2xl font-display leading-tight">{post.title}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="mt-auto pt-8 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>
            {formatDate(post.date)} · {post.readingTime}
          </span>
          <ArrowUpRight className="w-4 h-4 transition-all group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export function PostGrid({ posts }: { posts: Post[] }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? posts : posts.filter((p) => p.category === category);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`px-4 py-2 text-sm border transition-colors ${
              category === c
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((post, i) => (
          <div key={post.slug} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
