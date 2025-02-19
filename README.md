# todolist

cd todolist/backend
pnpm build
pm2 start dist/main.js --name backend

cd todolist/frontend
pnpm build
pm2 start ./node_modules/next/dist/bin/next --name frontend