import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Document {
  id: string
  title: string
  content?: string
  createdAt: Date
  updatedAt: Date
}

interface DocumentStore {
  documents: Document[]
  activeDocument: Document | null
  createDocument: (title: string, content?: string) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  deleteDocument: (id: string) => void
  setActiveDocument: (document: Document | null) => void
}

export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set) => ({
      documents: [],
      activeDocument: null,
      createDocument: (title, content) => {
        const newDocument: Document = {
          id: crypto.randomUUID(),
          title,
          content,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        set((state) => ({
          documents: [...state.documents, newDocument],
          activeDocument: newDocument,
        }))
      },
      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id
              ? { ...doc, ...updates, updatedAt: new Date() }
              : doc
          ),
          activeDocument:
            state.activeDocument?.id === id
              ? { ...state.activeDocument, ...updates, updatedAt: new Date() }
              : state.activeDocument,
        }))
      },
      deleteDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
          activeDocument:
            state.activeDocument?.id === id ? null : state.activeDocument,
        }))
      },
      setActiveDocument: (document) => {
        set({ activeDocument: document })
      },
    }),
    {
      name: 'markdown-documents',
    }
  )
) 