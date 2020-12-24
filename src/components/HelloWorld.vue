<template>
  <div class="hello">
    <button @click="getInfo">点击我，调用接口</button>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      info: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getInfo () {
      axios.get('http://127.0.0.1:9000/test').then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>