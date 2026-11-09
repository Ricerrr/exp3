import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_ARTICLES } from '../data/mock.js'

export const useBlogStore = create(
  persist(
    (set, get) => ({
      user: null,
      login: (username) => set({ user: { username } }),
      logout: () => set({ user: null }),

      articles: INITIAL_ARTICLES,

      addArticle: (article) =>
        set((s) => ({
          articles: [
            {
              ...article,
              id: Date.now(),
              slug: article.slug || 'post-' + Date.now(),
              createdAt: new Date().toISOString().slice(0, 10),
              views: 0,
              likes: 0,
              likedBy: []
            },
            ...s.articles
          ]
        })),

      deleteArticle: (id) =>
        set((s) => ({ articles: s.articles.filter((a) => a.id !== id) })),

      incrementViews: (id) =>
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === id ? { ...a, views: (a.views || 0) + 1 } : a
          )
        })),

      toggleLike: (id) => {
        const username = get().user?.username
        if (!username) return
        set((s) => ({
          articles: s.articles.map((a) => {
            if (a.id !== id) return a
            const liked = a.likedBy.includes(username)
            return {
              ...a,
              likes: liked ? a.likes - 1 : a.likes + 1,
              likedBy: liked ? a.likedBy.filter((u) => u !== username) : [...a.likedBy, username]
            }
          })
        }))
      },

      comments: {},
      addComment: (articleId, content) => {
        const username = get().user?.username || '匿名读者'
        const list = get().comments[articleId] || []
        const newComment = {
          id: Date.now(),
          username,
          content,
          createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
        }
        set((s) => ({
          comments: { ...s.comments, [articleId]: [newComment, ...list] }
        }))
      },

      dark: false,
      toggleTheme: () => set((s) => ({ dark: !s.dark }))
    }),
    { name: 'se3306-exp3-storage' }
  )
)
