import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: ['custom-sdl.graphql','http://localhost:4000/graphql',],
    documents: ['hooks/**/*.ts','components/**/*.tsx','pages/**/*.tsx','fragments.ts','middleware.ts', '!gql/**/*'],
    // emitLegacyCommonJSImports: false,
    overwrite: true,
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './gql/': {
            preset: 'client',
            plugins: [],
            presetConfig: { 
                      fragmentMasking: false, 
                       },
            config: {
                dedupeFragments: true, // <- added this and it works 🎉
              }
        },
        // 'apollo-helpers.ts': {
        //     schema: './custom-sdl.graphql',
        //     plugins: ['typescript-apollo-client-helpers']
        //   }
    }
}

export default config
