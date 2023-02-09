import { atom } from 'jotai'
import { IUser } from '../types'

export const currentUserAtom = atom<IUser | null>(null)
export const jwtTokenAtom = atom<string | null>(null)