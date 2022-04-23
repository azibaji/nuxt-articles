<template>
  <div>

    <search-box @searchArticle="searchArticle"/>

    <Articles :keywordSearch="keywordSearch"/>
  </div>
  
</template>

<script>
import Articles from '../components/Articles/Articles.vue'
import SearchBox from '../components/Shared/SearchBox.vue'

export default {

  layout: 'user',
  name: 'IndexPage',

  data(){
    return {
      keywordSearch:''
    }
  },
  components: { 
    SearchBox,
    Articles
  },

  methods:{
    searchArticle(value){
      this.keywordSearch=value
    }
  }
}
</script>
