Vue.component('search',{
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <input
            type="text"
            class="filter-search"
            name="search"
            placeholder="Search"
            v-model="userSearch"/>
        <button type="submit" class="btn-filterSearch">
            <img src="img/search.svg" alt="search" />
        </button>
    </form>
    `
})


