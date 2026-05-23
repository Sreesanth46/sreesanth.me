import { createContext } from '~/composables/create-context';
import { Blog } from '~/types';

export const [useBlog, provideBlogContext] = createContext<Blog>('BlogPage');
