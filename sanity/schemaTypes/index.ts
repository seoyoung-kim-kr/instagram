import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import user from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, user],
}