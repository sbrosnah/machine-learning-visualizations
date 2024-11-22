import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Documentation = defineDocumentType(() => ({
    name: 'Documentation',
    filePathPattern: `docs/**/*.mdx`, // This will match MDX files in the docs directory
    contentType: 'mdx',
    fields: {
      title: {
        type: 'string',
        required: true,
      },
      section: {
        type: 'string',
        required: true,
      },
    },
    computedFields: {
      url: {
        type: 'string',
        resolve: (doc) => `/docs/${doc._raw.flattenedPath.replace('docs/', '')}`,
      },
    },
  }))
  
  export default makeSource({
    contentDirPath: 'content', // Your root content directory
    documentTypes: [Documentation],
  })