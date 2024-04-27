<template>
  <h3>Keagiatan Saya</h3>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form action="">

            </form>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li class="list-group-item" v-for="(item, i) in items" :key="item._id">
        {{i+1}}.{{item.description}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
    };
  },
  async mounted(){
    const response = await axios.get("/api/todolistitems");
    this.items = response.data;

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
