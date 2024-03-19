<h1 align="center" id="title"><b>🌐ALGOLIA</B> DATA INTEGRATION SOLUTION <br> & CLIENT UI DEMO REPOSITORY</h1>

<p align="center"><img src="https://media.licdn.com/dms/image/D4E16AQH3kKXcRJWoSg/profile-displaybackgroundimage-shrink_200_800/0/1666804692598?e=2147483647&amp;v=beta&amp;t=0lT4sz1TsIzEUJRIeFEded0xM9DlNNWjQecdltvW8Ww" alt="project-image"></p>

<b><center><p id="description">The objective of this GitHub repository is to host the codebase for the Algolia Data Integration Solution project. This project aims to design and implement a comprehensive data integration solution connecting various systems to Algolia for efficient search functionality. The project also requires building a demo UI to showcase the new search functionality to the client. The UI highlights Algolia's key features, demonstrate an understanding of Algolia's service offerings, in our case many parameters and instantsearch.</p></center></b>
<br><h2>💻 TECHNOLOGIES USED</h3>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
<h3>This project utilizes:</h3>
<ul>
    <li>Vue.js and Nuxt.js for the frontend framework</li>
    <li>FontAwesome for Vue.js for scalable vector icons</li>
    <li>Algolia Vue InstantSearch for seamless integration of Algolia search services</li>
</ul><
<h3>Documentation Links</h3>
<ul>
    <li><a href="https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/">Algolia Vue InstantSearch</a></li>
    <li><a href="https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/">Algolia Widgets</a></li>
    <li><a href="https://nuxtjs.org/">Nuxt.js with Algolia</a></li>
    <li><a href="https://fortawesome.github.io/Font-Awesome/">FontAwesome for Vue</a></li>
</ul>
<br><h2>💻 CLIENT ARCHITECTURE</h3><br>
![MIRO](https://img.shields.io/badge/Miro-050038.svg?style=for-the-badge&logo=Miro&logoColor=white)
[CICK HERE TO OPEN](https://miro.com/app/board/uXjVNgkFMqI=/?share_link_id=425562275864)


<br><h2>🌳 PROJECT STRUCTRUE </h2><br><B>
REPOSITORY<br>
│<br>
├── Catalog Syndication - Algolia API only/    ----------------------Script for API push to Algolia<br> 
│   └── index.js<br>
│<br>
├── Catalog Syndication - Client Version/  ------------------------Client Script Version | FULL <br> 
│   └── index.js<br>
│<br>
├── assets/<br>
│   └── style.css --------------------------------------------------------NUXT 3 - UI DEMO STYLE<br>
│<br>
├── plugins/<br>
│<br>
├── public/------------------------------------------------------------NUXT 3 - UI DEMO IMGs<br>
│   ├── header.webp<br>
│   ├── fav.ico<br>
│   └── miro.webp<br>
│<br>
└── app.vue---------------------------------------------------------- NUXT 3 - UI DEMO VUE APP<br><br></b>
<br><h2>🚀 GETTING STARTED WITH THE PROJECT </h2>
<pre>1. First check Catalog Syndication - Client Version/index.js as it handles the import to Algolia for indexing</pre>
<pre>2. Optional: Use Support Access to Review the bits and pieces configured in my Algolia Account</pre>
<pre>3. Fire up CodeSandbox & ideally (*1) Vercel to review the UI (+ it's code if you're bold enough to scroll)</pre>

<br><h2>🔎 LOCAL DEV PREVIEW </h2>
Locally preview production build:

```bash
# npm
npm run dev

# pnpm
pnpm run preview

# yarn
yarn dev
```

<b>Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.</b>

<br><h2>🏖️ TRY ON SANDBOXES</h2><b>

![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white)
[VIEW UI DIRECTLY ON VERCEL](https://algolia-technical-assignment-solutions-architect-ojap3cqkl.vercel.app) ⬅️ SUGGESTED 

![CS](https://img.shields.io/badge/CodeSandbox-151515.svg?style=for-the-badge&logo=CodeSandbox&logoColor=white)
[OPEN IN CODESANDBOX](https://algolia-technical-assignment-solutions-architect-ojap3cqkl.vercel.app) </b>

> **Important:** During testing I have encountered a bug with <br>CodeSandbox and Nuxt 3 Deployments we need to address first:
> 
<b>1. <b>.env</b> needs to be created with API-Key and APP-ID as expected which is fine:</b>
<pre>ALGOLIA_APPLICATION_ID=XIBNVPFIEF
ALGOLIA_API_KEY=a8a7412fe12dce49086694f747537a6b</pre><br>
> 2. In codesandbox even though you add the <b>Environment Variables</b> you will maybe not be able to get it launched due to a bug in their Vite configuration. If you're invited as member and set your Environement Variables it works perfectly fine. But as a guest even with workarounds we face Vite errors and it is therefore <u>almost unusubale for UI Demo reviews</u> currently on my stack.<br>
<b> <br>This issue / bug is reported to Codesandbox already and they are on it.</b>



