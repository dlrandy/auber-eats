# auber-eats


pnpm --filter next-app dev

pnpm add shared-tools --filter next-app --workspace

pnpm run -r dev
pnpm run -r build

pnpm add nx -D -w


nx <target> <project>
nx  run <projext>:<target>
pnpx nx build next-app
pnpx nx run-many --target=build --projects=next-app,nest-app
pnpx nx run-many --target=dev 
pnpx nx init
pnpx nx graph

## affected commands
- look Git history
- figure out project changed
- run command on projects

npx nx affected:<target>    build|test
npx nx affected:graph --base=main


