# markblog

云计算环境下的博客系统开发实践（R0802010.01）项目作品

## 技术栈

~~最新最热前端技术（2024/6/6）~~

- React 19
- Next.js 15
- Auth.js
- Tailwind CSS
- Primsa & PostgreSQL

## 项目特色

- 基本的文章增删改（支持 markdown 语法）
- 评论功能（也支持 markdown 语法）
- 点赞功能
- 基于 OAuth 的用户身份验证（当然也支持邮件）
- 使用 Server Actions 取代传统的 REST API
- TypeScript 与 Prisma 确保的类型安全
- Atomic CSS
- Docker 部署

## 运行

建议使用 Docker Compose 运行，需在文件中设置以下环境变量

- `environments/db.env`
  - `POSTGRES_PASSWORD`：数据库密码
  - `POSTGRES_DB`：数据库名称
- `environments/auth.env`
  - `AUTH_TRUST_HOST`：设置为 `true`
  - `AUTH_URL`：本地运行请设置为 `http://localhost:3000`
  - `AUTH_SECRET`: 运行 `npx auth secret` 以生成
  - `AUTH_EMAIL_USER` 与 `AUTH_EMAIL_PASS`：参见 nodemailer 文档与 `src/lib/auth/index.ts`
  - `AUTH_GITHUB_ID`：GitHub OAuth Application Client ID
  - `AUTH_GITHUB_SECRET`：GitHub OAuth Application Client Secret
- `environments/app.env`
  - `DATABASE_URL`：一般设置为 `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}?schema=public`
