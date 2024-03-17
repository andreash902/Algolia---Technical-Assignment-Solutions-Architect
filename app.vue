<!--
  Welcome to my Algolia Client UI-Demo built with Vue.js and Algolia InstantSearch! 
  This E-Commerce Product Catalog Search Template, designed on the Nuxt.js framework, 
  offers a seamless search experience with various options including:

  • Sorting through various options
  • Filtering in the search options
  • Pagination and hits per page
  • Sleek UI for great UX
  • Rethemed Algolia Widgets

  Purpose:
  › Algolia Solution Architect Hiring Process › Take-Home Assignment 

  General Architecture of our "Client":
  › https://miro.com/app/board/uXjVNgkFMqI=/

  Dependencies:
  - Vue.js, Nuxt.js
  - FontAwesome for Vue.js
  - Algolia Vue InstantSearch

  Structure Overview:
  • Header: Featuring an eye-catching image to set the tone.
  • Search Options: Explore sorting, filtering by brand, category, and price range, along with shipping options.
  • Project Links: Find me on LinkedIn, View Project Repo on GitHub, or explore our architecture on Miro.
  • Documentation: Find detailed instructions in the Algolia documentation for setting up Vue InstantSearch.
  • Author Information: Learn more about the creator of this template.

  To get started, make sure to install the necessary dependencies and run 'yarn dev' 
  to fire up the Demo UI locally or enjoy the CodeSandbox should I supply one instead.

  Dive into Algolia documentation for insights on how I leveraged Vue InstantSearch 
  to meet the Algolia search needs within the Client's vertical.  Explore the docs 
  alongside the code to understand the implementation  of the search features.

  Documentation Links:
  - Algolia Vue InstantSearch: https://www.algolia.com/doc/guides/building-search-ui/installation/vue/
  - Algolia Widgets: https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/
  - Nuxt.js with Algolia: https://algolia.nuxtjs.org/
  - FontAwesome for Vue: https://docs.fontawesome.com/web/use-with/vue/use-with

  › Have fun playing around with my UI!

-->


<template>
  <div>
    <div class="app-header">
      <header>
        <div>
          <nuxt-img src="/header.webp" style="width:350px" class="header-image" alt="Algolia Client Demo" />
        </div>
      </header>
    </div>

    <!-- Algolia instant search component setup -->
    <ais-instant-search :index-name="indexName" :search-client="algolia">
      <div class="search-section">
        <div class="content">
          <div class="left-side-content">
            <div class="left-menu">
              <!-- Collapsible section for search options -->
              <div class="filter-label" @click="toggleBrowseProducts">
                <font-awesome-icon class="menuicon" :icon="browseIcon()" />SEARCH OPTIONS
              </div>
              <div id="browse-products-section" class="collapse-section" :class="{ 'expanded': browseProductsVisible }">
                <!-- Sorting options -->
                <div class="sort-by-wrapper">
                  <label for="sort-by-select" class="sort-by-label">SORTING:</label>
                  <ais-sort-by id="sort-by-select" :items="sortByItems" class="sort-by"></ais-sort-by>
                </div>

                <!-- Display currently selected refinements -->
                <div class="selected-refinements-container">
                  <div class="selected-refinements">
                    <ais-current-refinements />
                  </div>
                  <!-- Option to clear refinements -->
                  <div class="clear-refinements">
                    <ais-clear-refinements />
                  </div>
                </div>

                <!-- Filter section for brands and categories -->
                <div class="filter-section">
                  <!-- Brand filter with collapsible option -->
                  <div class="brands-label" @click="toggleBrands">
                    BRANDS
                    <button class="toggle-btn" :class="{ 'rotate': brandsSectionVisible }">❯</button>
                  </div>
                  <div id="brands-section" class="collapse-section" :class="{ 'expanded': brandsSectionVisible }">
                    <ais-panel header="Brands" class="brands-panel">
                      <ais-search-box :debounce="500" placeholder="Search Brands"></ais-search-box>
                      <ais-refinement-list attribute="brand"></ais-refinement-list>
                    </ais-panel>
                  </div>

                  <!-- Category filter with collapsible option -->
                  <div class="categories-label" @click="toggleCategories">
                    PRODUCT CATEGORY
                    <button class="toggle-btn" :class="{ 'rotate': categoriesSectionVisible }">❯</button>
                  </div>
                  <div id="categories-section" class="collapse-section" :class="{ 'expanded': categoriesSectionVisible }">
                    <ais-panel header="Categories">
                      <ais-menu attribute="categories"></ais-menu>
                    </ais-panel>
                  </div>

                  <!-- Numeric menu for price range filtering -->
                  <div class="normal-label">PRICE RANGE</div>
                  <ais-panel header="Price Range">
                    <ais-numeric-menu attribute="price" :items="priceRangeItems"></ais-numeric-menu>
                  </ais-panel>

                  <!-- Toggle refinement for shipping options -->
                  <div class="normal-label">SHIPPING OPTION</div>
                  <ais-panel header="Shipping">
                    <div class="custom-toggle-refinement">
                      <ais-toggle-refinement attribute="free_shipping" :on="true" label="👍 Free Shipping"></ais-toggle-refinement>
                    </div>
                    <div class="custom-toggle-refinement">
                      <ais-toggle-refinement attribute="free_shipping" :on="false" label="📦 Shipping Cost"></ais-toggle-refinement>
                    </div>
                  </ais-panel>

                  <!-- Rating menu for filtering by customer reviews -->
                  <div class="normal-label">CUSTOMER REVIEW</div>
                  <ais-panel header="Ratings">
                    <ais-rating-menu attribute="rating" :max="5"></ais-rating-menu>
                  </ais-panel>
                </div>
              </div>
            </div>
            <!-- Display search statistics (speed) -->
            <div class="stats-wrapper">
              <span class="speed-label">Speed:</span><ais-stats></ais-stats>
            </div>
            <!-- Project & Sociak Links -->
            <div class="social-links">
              <span class="intro-text">Links:</span>
              <font-awesome-icon class="linkedin" :icon="linkedin" @click="openUrlInNewTab(linkedinUrl)" />
              <font-awesome-icon class="github" :icon="github" @click="openUrlInNewTab(githubUrl)" />
              <div class="architecture" @click="openUrlInNewTab(miroUrl)">
                <nuxt-img src="/miro.webp" style="width: 60px" class="miro-logo" alt="Miro" />
              </div>
            </div>
            <!-- Link to Algolia documentation -->
            <div class="docs-wrapper" @click="openUrlInNewTab(algoliaDocsUrl)">
              <span class="doc-text">Docs:</span><font-awesome-icon class="docs" :icon="docs" />
              <div class="algoliadocs">Algolia Docs</div>
            </div>
            <div class="author-text"><span>© Made by Andreas Hack</span></div>
          </div>
          <!-- Search results display area -->
          <div class="hits">
            <div class="hit-wrap-gobal">
              <div class="hit-search">
<!-- Inside the template section -->
<ais-search-box 
  :debounce="500" 
  placeholder="Search for Products.." 
  :autocomplete="true"
></ais-search-box>
              </div>
              <ais-hits>
                <template v-slot:item="{ item }">
                  <div class="hit-item">
                    <div class="hit-content">
                      <div class="hit-img-container">
                        <img class="hit-img" :src="item.image">
                      </div>
                      <div class="hit-name-wrapper">
                        <p class="hit-name" v-if="item.name.length > 50">{{ item.name.substring(0, 50) + '...' }}</p>
                        <p class="hit-name" v-else>{{ item.name }}</p>
                      </div>
                      <div class="hit-result-rating">
                        <template v-for="n in 5">
                          <span v-if="n <= item.rating" class="item-result-star" :key="`filled-${n}`"></span>
                          <span v-else class="item-result-star--empty" :key="`empty-${n}`"></span>
                        </template>
                      </div>
                      <div class="hit-description-wrapper">
                        <p class="hit-description" v-if="item.description.length > 75">{{ item.description.substring(0, 75) + '...' }}</p>
                        <p v-else>{{ item.description }}</p>
                      </div>
                      <div class="hit-meta">
                        <div class="hit-item-price">${{ item.price }}</div>
                        <div class="hit-item-buttom">
                          <div class="hit-item-shipping-option">{{ item.free_shipping ? '👍 Free Shipping' : '📦 Shipping Costs' }}</div>
                          <div class="buynow-container" @click="openURL(item.url)">
                            <font-awesome-icon class="addcart" :icon="currentIcon" @mouseover="showbuynow = true" @mouseleave="showbuynow = false" />
                            <div v-if="showbuynow" class="buynow">BUY NOW</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </ais-hits>
              <!-- Pagination and hits-per-page controls -->
              <div class="bottom-controls">
                <ais-pagination></ais-pagination>
                <ais-hits-per-page :items="hitsPerPageItems"></ais-hits-per-page>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ais-instant-search>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faBars, faCartPlus, faCartArrowDown, faChevronDown, faBook
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const menuicon = faBars;
const ChevronDown = faChevronDown;
const addcart = faCartPlus;
const downcart = faCartArrowDown;
const linkedin = faLinkedin;
const github = faGithub;
const docs = faBook;
const indexName = 'ProductCatalog'; // Algolia Index Name
const currentIcon = ref(addcart);
const showbuynow = ref(false);
const openURL = (url: string) => url && window.open(url, '_blank');
const linkedinUrl = 'https://www.linkedin.com/in/andreas-j-hack/';
const githubUrl = 'https://github.com/andreash902/Algolia-Solution-Architect---Hiring-Test';
const miroUrl = 'https://miro.com/app/board/uXjVNgkFMqI=/';
const algoliaDocsUrl = 'https://www.algolia.com/doc/guides/building-search-ui/installation/vue/';
const openUrlInNewTab = (url: string) => {  if (url) window.open(url, '_blank', 'noopener,noreferrer'); };
const changeIcon = (icon: typeof addcart | typeof downcart) => { currentIcon.value = icon; };
const browseProductsVisible = ref(false);
const toggleBrowseProducts = () => { browseProductsVisible.value = !browseProductsVisible.value; };
const browseIcon = () => { return browseProductsVisible.value ? faBars : faChevronDown; };
const algolia = useAlgoliaRef();
// Algolia Widgets I used
import {
  AisCurrentRefinements, AisClearRefinements, AisInstantSearch, AisSearchBox, AisHits,
  AisRefinementList, AisSortBy, AisPagination, AisHitsPerPage,
  AisPanel, AisMenu, AisNumericMenu, AisRatingMenu, AisToggleRefinement, AisStats
} from 'vue-instantsearch/vue3/es';

const brandsSectionVisible = ref(false);
const categoriesSectionVisible = ref(false);
const toggleBrands = () => { brandsSectionVisible.value = !brandsSectionVisible.value; };
const toggleCategories = () => { categoriesSectionVisible.value = !categoriesSectionVisible.value; };

// Options for sorting, price range, and hits per page
const sortByItems = [
  { value: 'ProductCatalog', label: 'Default' },
  { value: 'ProductCatalog_rating', label: 'Best Rating' },
  { value: 'ProductCatalog_relevance', label: 'Most Popular' },
  { value: 'ProductCatalog_price_asc', label: 'Price Low to High' },
  { value: 'ProductCatalog_price_desc', label: 'Price High to Low' }
];

const priceRangeItems = [
  { label: '💵 Under €50', end: 50 },
  { label: '💸 €50 to €100', start: 50, end: 100 },
  { label: '💰 Over €100', start: 100 }
];

const hitsPerPageItems = [
  { value: 6, label: '6 Products per Page', default: true  },
  { value: 12, label: '12 Products per Page' },
  { value: 18, label: '18 Products per Page' },
  { value: 10000, label: 'Show all Search Results' }
];
</script>



<style scoped>

:deep(.ais-SearchBox-input) {
  justify-content: center;
  flex-grow: 0;
  max-width: 933px;
  margin: 0 auto;
}

@media (max-width: 1254px) {
  :deep(.ais-SearchBox-input) {
    max-width: 617px;
  }
}

@media (max-width: 950px) {
  :deep(.ais-SearchBox-input) {
    max-width: 475px;
  }
}

:deep(.ais-RatingMenu-list) {
  margin-bottom: 20px;
}

:deep(.ais-Stats-text) {
  color: #5468ff;
  font-size: 1=pt;
}

:deep(.hit-search .ais-SearchBox-input),
:deep(.filter-section .ais-SearchBox-input) {
  appearance: none;
  padding: 0.3rem 1.7rem;
  width: 100%;
  height: 40px;
  position: relative;
  background-color: #f5f5fa;
  border: 1px solid #c4c8d8;
  border-radius: 8px;
  font-weight: 100;
  font-family: 'Open Sans', sans-serif;
}

:deep(.hit-search .ais-SearchBox),
:deep(.filter-section .ais-SearchBox) {
  transition: transform 0.2s ease;
}

:deep(.hit-search .ais-SearchBox-input:hover),
:deep(.filter-section .ais-SearchBox-input:hover) {
  box-shadow: 0px 0px 8px hsl(233, 100%, 66%);
  background-color: white;
}

:deep(.filter-section .ais-SearchBox-input) {
  width: 200px;
  height: 30px;
  box-shadow: 0px 0px 5px hsl(233, 100%, 66%);
}

:deep(.ais-SortBy-select) {
  width: 125px;
  padding-left: 4px;
  padding-right: 8px;
  box-shadow: 0px 0px 5px hsl(233, 100%, 66%);
  border: 1px solid #c4c8d8;
  border-radius: 8px;
  background-color: white;
  appearance: none;
  line-height: 16px;
  font-size: 12px;
  font-weight: 400; 
  color: rgb(109, 108, 108);
  cursor: pointer;
  transition: color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease; 
}

:deep(.ais-SortBy-select:hover) {
  color: rgb(14, 14, 14);
  box-shadow: 0px 0px 8px hsl(233, 100%, 66%);
  transform: scale(1.025); 
}

:deep(.ais-ToggleRefinement-labelText),
:deep(.ais-NumericMenu-labelText),
:deep(.ais-Menu-label),
:deep(.ais-RefinementList-labelText) { 
  font-size: 12px; 
  font-weight: 500; 
  transition: font-size 0.1s ease; 
}

:deep(.ais-ToggleRefinement-labelText:hover),
:deep(.ais-NumericMenu-labelText:hover),
:deep(.ais-Menu-label:hover),
:deep(.ais-RefinementList-labelText:hover) { 
  font-size: 12.5px; 
  font-weight: bold; 
  cursor: pointer; 
}

:deep(.ais-HitsPerPage-select) {
  flex-shrink: 0;
  width: 150px;
  padding-left: 8px;
  padding-right: 8px;
  box-shadow: 0px 0px 5px hsl(240, 4%, 10%);
  border: 1px solid #c4c8d8;
  border-radius: 8px;
  background-color: white;
  appearance: none;
  line-height: 16px;
  font-size: 12px;
  font-weight: 400; 
  color: rgb(109, 108, 108);
  cursor: pointer;
  transition: color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease; 
}

:deep(.ais-HitsPerPage-select:hover) {
  color: rgb(14, 14, 14);
  box-shadow: 0px 0px 8px hsl(233, 100%, 66%);
  transform: scale(1.025); 
}

:deep(.hit-search .ais-SearchBox:hover),
:deep(.filter-section .ais-SearchBox:hover) {
  transform: scale(1.005);
}

.menuicon, .linkedin, .github, .docs {
  width: 20px;
  height: 18px;
  margin-right: 10px;
  vertical-align: middle;
}

.linkedin, .github, .docs {
  width: 25px;
  height: 20px;
  margin-right: 5px;
  color: rgba(0, 0, 0, 0.6);
}

.linkedin:hover, .github:hover, .docs-wrapper:hover .docs, .docs-wrapper:hover .algoliadocs {
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

.algoliadocs {
  font-weight: bold;
}

.architecture {
  opacity: 0.6;
}

.architecture:hover {
  opacity: 1;
  cursor: pointer;
}

.addcart {
  width: 35px;
  margin: 0 10px -10px;
  flex-shrink: 0;
  color: lightgrey;
  transition: all 0.6s ease;
}

.addcart:hover {
  color: #5c5858;
  cursor: pointer;
}

.buynow-container {
  position: relative;
}

.buynow {
  border-radius: 8px;
  font-size: 10px;
  position: absolute;
  display: flex;
  align-items: center;
  top: calc(100% + 5px);
  left: 55%;
  transform: translateX(-50%);
  min-width: 50px;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  z-index: 999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
  white-space: nowrap;
  overflow: hidden;
}

.buynow-container:hover .buynow {
  opacity: 1;
}

</style>

