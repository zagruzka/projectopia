'use client'

import { atom } from 'jotai'

const state = atom<boolean>(typeof window !== 'undefined' && (localStorage.getItem('sidebar') ? localStorage.getItem('sidebar') === 'true' : true))

const sidebarStore = atom(
  (get) => get(state),
  (_, set, expand: boolean) => {
    set(state, expand)
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar', String(expand))
    }
  }
)

export { sidebarStore }
