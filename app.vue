<!--
Welcome to my Algolia Client UI-Demo built with Vue.js and Algolia InstantSearch! 
This E-Commerce Product Catalog Search Template, designed on the Nuxt.js framework, offers a seamless search experience with various options including:

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

To get started, make sure to install the necessary dependencies and run 'yarn dev' to fire up the Demo UI locally or enjoy the CodeSandbox should I supply one instead.

Dive into Algolia documentation for insights on how I leveraged Vue InstantSearch to meet the Algolia search needs within the Client's vertical.  Explore the docs alongside the code to understand the implementation of the search features.

Documentation Links:
- Algolia Vue InstantSearch: https://www.algolia.com/doc/guides/building-search-ui/installation/vue/
- Algolia Widgets: https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/
- Nuxt.js with Algolia: https://algolia.nuxtjs.org/
- FontAwesome for Vue: https://docs.fontawesome.com/web/use-with/vue/use-with

› Have fun playing around with my UI!
-->

<template>
  <!-- InstantSearch component initialization -->
  <ais-instant-search :index-name="indexName" :search-client="algolia">
    <div>
      <!-- Header section -->
      <div class="app-header">
        <header class="header">
          <div class="header-img">
            <nuxt-img src="/header.webp" style="width:210px" class="header-image" alt="Algolia Client Demo" />
          </div>
          <div class="header-content">
            <!-- Search box for input -->
            <div class="hit-search">
              <ais-search-box :debounce="500" placeholder="Search for Products.."></ais-search-box>
            </div>
            <!-- Current refinements display -->
            <div class="selected-refinements-container">
              <div class="selected-refinements">
              </div>
              <ais-current-refinements />
            </div>
          </div>
        </header>
      </div>

      <!-- Main search section -->
      <div class="search-section">
        <div class="content">
          <div class="left-side-content">
            <!-- Left menu for filtering options -->
            <div class="left-menu">
              <!-- Toggle button for browsing products -->
              <div class="filter-label" @click="toggleBrowseProducts">
                <font-awesome-icon class="menuicon" :icon="browseIcon()" />SEARCH OPTIONS
              </div>
              <!-- Collapsible section for browsing products -->
              <div id="browse-products-section" class="collapse-section" :class="{ 'expanded': browseProductsVisible }">
                <ais-clear-refinements />
                <!-- Sorting options -->
                <div class="sort-by-wrapper">
                  <label for="sort-by-select" class="sort-by-label">SORTING:</label>
                  <ais-sort-by id="sort-by-select" :items="sortByItems" class="sort-by"></ais-sort-by>
                </div> 
                <!-- Refinement list for brands -->
                <div class="filter-section">
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
                  <!-- Refinement list for product categories -->
                  <div class="categories-label" @click="toggleCategories">
                    PRODUCT CATEGORY
                    <button class="toggle-btn" :class="{ 'rotate': categoriesSectionVisible }">❯</button>
                  </div>
                  <div id="categories-section" class="collapse-section" :class="{ 'expanded': categoriesSectionVisible }">
                    <ais-panel header="Categories">
                      <ais-menu attribute="categories"></ais-menu>
                    </ais-panel>
                  </div>
                  <!-- Numeric menu for price range -->
                  <div class="pricerange-label">PRODUCT PRICE RANGE</div>
                  <ais-panel header="Price Range">
                    <ais-numeric-menu attribute="price" :items="priceRangeItems"></ais-numeric-menu>
                  </ais-panel>
                  <!-- Toggle refinement for shipping options -->
                  <div class="shipping-label">SHIPPING OPTION</div>
                  <ais-panel header="Shipping">
                    <div class="custom-toggle-refinement">
                      <ais-toggle-refinement attribute="free_shipping" :on="true" label="Free Shipping"></ais-toggle-refinement>
                    </div>
                  </ais-panel>
                  <!-- Rating menu for customer reviews -->
                  <div class="normal-label">CUSTOMER REVIEW</div>
                  <ais-panel header="Ratings">
                    <ais-rating-menu attribute="rating" :max="5"></ais-rating-menu>
                  </ais-panel>
                </div>
              </div>
            </div>
         
          </div>
          <!-- Display search results -->
          <div class="hits">
            <div class="hit-wrap-gobal">
              <!-- Hits rendering -->
              <ais-hits>
                <template v-slot:item="{ item }">
                  <div class="hit-item"  @click="addToCart(item)">
                    <div class="hit-content">
                      <div class="hit-img-container">
                        <!-- Product image -->
                        <img class="hit-img" :src="item.image">
                      </div>
                      <div class="hit-name-wrapper">
                        <!-- Product name -->
                        <p class="hit-name" v-if="item.name.length > 50">{{ item.name.substring(0, 50) + '...' }}</p>
                        <p class="hit-name" v-else>{{ item.name }}</p>
                      </div>
                      <!-- Product rating -->
                      <div class="hit-result-rating">
                        <template v-for="n in 5">
                          <span v-if="n <= item.rating" class="item-result-star" :key="`filled-${n}`"></span>
                          <span v-else class="item-result-star--empty" :key="`empty-${n}`"></span>
                        </template>
                      </div>
                      <!-- Product description -->
                      <div class="hit-description-wrapper">
                        <p class="hit-description" v-if="item.description.length > 75">{{ item.description.substring(0, 75) + '...' }}</p>
                        <p v-else>{{ item.description }}</p>
                      </div>
                      <!-- Product meta information -->
                      <div class="hit-meta">
                        <div class="hit-item-price">${{ item.price }}</div>
                        <div class="hit-item-buttom">
                          <div class="hit-item-shipping-option">{{ item.free_shipping ? 'Free Shipping' : '+ Shipping Costs' }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </ais-hits>
              <!-- Pagination and hits per page controls -->
              <div class="bottom-controls">
                <ais-pagination></ais-pagination>
                <ais-hits-per-page :items="hitsPerPageItems"></ais-hits-per-page>
              </div>
              <!-- Cart icon -->
              <div class="cart-icon"">
                <font-awesome-icon icon="cart-plus" />
                <div class="cart-count">{{ cartCount }}</div>
                <div class="total-price">Total: ${{ totalPrice.toFixed(2) }}</div>
                <div class="tooltip">Click on Item to add to Cart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="footer-content">
          <!-- Project / Social icons -->
          <div class="social-icons">
            <font-awesome-icon class="linkedin" :icon="linkedin" @click="openUrlInNewTab(linkedinUrl)" />
            <font-awesome-icon class="github" :icon="github" @click="openUrlInNewTab(githubUrl)" />
            <div class="architecture" @click="openUrlInNewTab(miroUrl)">
              <nuxt-img src="/miro.webp" style="width: 60px" class="miro-logo" alt="Miro" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  </ais-instant-search>
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
  const linkedin = faLinkedin;
  const github = faGithub;
  const docs = faBook;
  const indexName = 'ProductCatalog';
  const openURL = (url: string) => url && window.open(url, '_blank');
  const linkedinUrl = 'https://www.linkedin.com/in/andreas-j-hack/';
  const githubUrl = 'https://github.com/andreash902/Algolia-Solution-Architect---Hiring-Test';
  const miroUrl = 'https://miro.com/app/board/uXjVNgkFMqI=/';
  const algoliaDocsUrl = 'https://www.algolia.com/doc/guides/building-search-ui/installation/vue/';
  const openUrlInNewTab = (url: string) => {  if (url) window.open(url, '_blank', 'noopener,noreferrer'); };
  const browseProductsVisible = ref(false);
  const toggleBrowseProducts = () => { browseProductsVisible.value = !browseProductsVisible.value; };
  const browseIcon = () => { return browseProductsVisible.value ? faBars : faChevronDown; };
  const algolia = useAlgoliaRef();
  const cartCount = ref(0);
  const totalPrice = ref(0);
  const addToCart = (item) => { cartCount.value++; totalPrice.value += item.price; };

  import {
    AisCurrentRefinements, AisClearRefinements, AisInstantSearch, AisSearchBox, AisHits,
    AisRefinementList, AisSortBy, AisPagination, AisHitsPerPage,
    AisPanel, AisMenu, AisNumericMenu, AisRatingMenu, AisToggleRefinement, AisStats
  } from 'vue-instantsearch/vue3/es';

  const brandsSectionVisible = ref(false);
  const categoriesSectionVisible = ref(false);
  const toggleBrands = () => { brandsSectionVisible.value = !brandsSectionVisible.value; };
  const toggleCategories = () => { categoriesSectionVisible.value = !categoriesSectionVisible.value; };

  const sortByItems = [
    { value: 'ProductCatalog', label: 'Default' },
    { value: 'ProductCatalog_rating', label: 'Best Rating' },
    { value: 'ProductCatalog_relevance', label: 'Most Popular' },
    { value: 'ProductCatalog_price_asc', label: 'Price Lowest' },
    { value: 'ProductCatalog_price_desc', label: 'Price Highest' }
  ];

  const priceRangeItems = [
    { label: 'Under €50', end: 50 },
    { label: '€50 to €100', start: 50, end: 100 },
    { label: 'Over €100', start: 100 }
  ];

  const hitsPerPageItems = [
    { value: 6, label: '6 Products per Page', default: true  },
    { value: 12, label: '12 Products per Page' },
    { value: 18, label: '18 Products per Page' },
    { value: 10000, label: 'Show all Search Results' }
  ];
</script>

<style scoped>
@import url('https://unpkg.com/instantsearch.css@7/themes/satellite-min.css');
@import url('./assets/style.css');

/* Current Refinements */
:deep(.ais-CurrentRefinements-label) {
  color: #23263b;
  font-weight: bold;
}
:deep(.ais-RatingMenu-label){
  display: none;
}

:deep(.ais-ClearRefinements-button--disabled) {
    display: none;
}
:deep(.ais-ClearRefinements-button) {
    max-width: 200px;
    border-radius: 8px;
    transition: color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease; 
    font-weight: 100;
    font-size: 12px;
}
:deep(.ais-CurrentRefinements-categoryLabel) {
  color: #33263b;
}
:deep(.ais-CurrentRefinements-item) {
  border: 1px solid #d6d6e7;
  color: #5a5e9a;;
  background-color: white;
  opacity: 0.7;
  border-radius: 8px;
  transition: color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease; 
}

/* Hits and Hits Item */
:deep(.ais-Hits-list) {
  min-width: 1000px;
  max-width: 1000px;
}
:deep(.ais-Hits-item) {
  border: 1px solid rgb(214, 214, 231);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  transition: box-shadow 0.3s ease;
  min-width: 300px;
  padding: 0px!important;
}
:deep(.ais-Hits-item:hover) {
  box-shadow: 0px 0px 8px hsl(233, 100%, 66%);
  transform: scale(1.015);
  transition: color 0.25s ease, transform 0.3s ease;
}

/* Toggle Refinement */
:deep(.ais-ToggleRefinement-label) {
  display: flex;
  align-items: center;
  cursor: pointer;
}
:deep(.ais-ToggleRefinement-labelText) {
  margin-left: 5px;
}

/* Search Box */
:deep(.hit-search .ais-SearchBox-input),
:deep(.filter-section .ais-SearchBox-input) {
  appearance: none;
  height: 40px;
  position: relative;
  background-color: #f5f5fa;
  border: 1px solid #c4c8d8;
  border-radius: 8px;
  font-weight: 100;
  font-family: 'Open Sans', sans-serif;
}

:deep(.hit-search .ais-SearchBox-input:hover),
:deep(.filter-section .ais-SearchBox-input:hover) {
  box-shadow: 0px 0px 8px hsl(233, 100%, 66%);
  background-color: white;
}
:deep(.hit-search .ais-SearchBox-input) {
  padding: 14px 20px;
  font-size: 18px;
  border-radius: 5px;
  min-width: 930px;
  background-color: white;
}
:deep(.filter-section .ais-SearchBox-input) {
  max-width: 180px;
  text-align: left;
  height: 30px;
}

/* Sort By Select */
:deep(.ais-SortBy-select) {
  width: 125px;
  padding-left: 4px;
  padding-right: 8px;
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
:deep(.ais-SortBy-select:hover), :deep(.ais-ClearRefinements-button:hover), :deep(.ais-CurrentRefinements-item:hover) {
  color: rgb(14, 14, 14);
  box-shadow: 0px 0px 8px hsl(233, 100%, 66%);
  transform: scale(1.025); 
  font-weight: 500;
  cursor: pointer;
}

/* Hits Per Page Select */
:deep(.ais-HitsPerPage-select) {
  flex-shrink: 0;
  width: 150px;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid #c4c8d8;
  border-radius: 8px;
  background-color: white;
  appearance: none;
  line-height: 16px;
  font-size: 11px;
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

/* Social Icons */
.menuicon, .linkedin, .github, .docs {
  width: 25px;
  height: 22px;
  margin-right: 10px;
  vertical-align: middle;
  margin-left: 10px;
}

.linkedin:hover, .github:hover, .docs-wrapper:hover .docs, .docs-wrapper:hover .algoliadocs {
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
  font-weight: bold;
}

/* Architecture */
.architecture {
  opacity: 0.6;
  Padding-top: 4px;
  margin-left: 15px;
}
.architecture:hover {
  opacity: 1;
  cursor: pointer;
}
</style>

