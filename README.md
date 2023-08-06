This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[中文](READMD_CN.md)

## Next.js and GitHub Gist-based Blog

### Project Description

This project is a blog system based on Next.js and GitHub Gist. It supports code snippets in various languages, including TypeScript, JavaScript, TSX, JSON, JSON5, Python, Rust, Go, PHP, Lua, Shell, PowerShell, HTML, CSS, and SCSS. Code snippets are displayed in code blocks. Markdown and MDX files are rendered into beautiful web pages using next-mdx-remote.

Additionally, this blog system supports categories, tags, and article archives. The commenting feature is currently under testing and will be introduced in future versions. There are also plans to synchronize the star feature of GitHub Gist, allowing users to bookmark articles.

### Tech Stack

Next.js
TypeScript
GitHub Gist

### Features

Support for code snippets in multiple languages
Render Markdown and MDX files using next-mdx-remote
Support for categories, tags, and article archives
Commenting feature (under testing)
Planned synchronization of GitHub Gist star feature

### Installation and Usage

- Clone the project
- Create a postgres database on Vercel
- Pull the environment variables

```shell
# Customize the following
GITHUB_ID=
GITHUB_SECRET=
GITHUB_ACCESS_TOKEN=
GITHUB_API_BASEURL="https://api.github.com"
# PIXABAY API KEY
PIXABAY_KEY=
# Direct link to the cover image
DEFAULT_COVER=
```

- Test and deploy

```shell
npm run dev

vercel --prod
```

- [Rules for Writing Blog Content](https://gist.github.com/akirco/4543214ca7eeee637873f9cad20f545e)

### Contribution

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please submit an issue or provide a Pull Request.

### License

This project is licensed under the MIT License.
