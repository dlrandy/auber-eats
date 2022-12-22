import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: ['custom-sdl.graphql','http://localhost:4000/graphql',],
    documents: ['components/**/*.tsx','pages/**/*.tsx', '!gql/**/*'],
    // emitLegacyCommonJSImports: false,
    overwrite: true,
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './gql/': {
            preset: 'client',
            plugins: []
        },
        // 'apollo-helpers.ts': {
        //     schema: './custom-sdl.graphql',
        //     plugins: ['typescript-apollo-client-helpers']
        //   }
    }
}

export default config
