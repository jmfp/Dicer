import type { MDXComponents } from 'mdx/types'
import { ReviewCard } from './app/components/container/container'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}