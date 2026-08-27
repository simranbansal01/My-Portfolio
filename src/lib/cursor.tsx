import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type CursorMode = 'default' | 'link' | 'project' | 'image'

interface CursorState {
  mode: CursorMode
  label: string
}

interface CursorApi {
  state: CursorState
  setCursor: (mode: CursorMode, label?: string) => void
  resetCursor: () => void
}

const CursorContext = createContext<CursorApi | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>({ mode: 'default', label: '' })

  const setCursor = useCallback((mode: CursorMode, label = '') => {
    setState({ mode, label })
  }, [])

  const resetCursor = useCallback(() => {
    setState({ mode: 'default', label: '' })
  }, [])

  const value = useMemo(() => ({ state, setCursor, resetCursor }), [state, setCursor, resetCursor])

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) {
    return {
      state: { mode: 'default' as CursorMode, label: '' },
      setCursor: () => {},
      resetCursor: () => {},
    }
  }
  return ctx
}
