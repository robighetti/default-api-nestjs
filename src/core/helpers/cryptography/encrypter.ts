import { hash, compare } from "bcryptjs"

export function createHash(plain: string): Promise<string> {
  return hash(plain, 8)
}

export function compareHash(plain: string, hash: string): Promise<boolean> {
  return compare(plain, hash)
}
