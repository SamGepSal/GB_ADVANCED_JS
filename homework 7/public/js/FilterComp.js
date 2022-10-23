Vue.component('filter-search', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action='#' class="fist-link" @submit.prevent="$parent.$refs.products.filter(userSearch)">
    <input type="text" placeholder="Поиск" class="search" v-model="userSearch"/>
    <button type="submit" class="btn-search">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>`
})

