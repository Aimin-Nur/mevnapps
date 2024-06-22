<template>
  <h3 class="text-center">Keagiatan Saya</h3>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form action="">
              <div class="form-group">
                <label for="Description">Input Kegiatan : 
                  <input type="text" name="description" id="description" class="form-control" v-model="description" placeholder="Masukkan Kegiatan">
                </label>
                <button class="btn btn-primary" @click="addItem" :disabled="!description">Insert</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ul>
      <li class="list-group-item" v-for="(item, i) in items" :key="item._id">
        <form action="" v-if="isSelected(item)">
          <input type="text" v-model="editDescription" id="editDescription" name="editDescription"/>
        </form>
        <span v-else>
          {{i+1}}.{{item.description}}
        </span>
        <button class="btn btn-danger ms-5" type="button" @click="isSelected(item) ? updateItem(item, i ) : removeItem(item,i)">{{isSelected(item) ? "Save" : "Delete"}}</button>
        <button class="btn btn-info ms-2" type="button" @click="isSelected(item) ? unselect(item, i ) : select(item)">{{isSelected(item) ? "Cancel" : "Edit"}}</button>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      description:"",
      editDescription:"",
      selected: {},
    };
  },
  async mounted(){
    const response = await axios.get("/api/todolistitems");
    this.items = response.data;

  },
  methods:{
    async addItem(){
      const response = await axios.post("api/todolistitems/", {description:this.description});
      this.items.push(response.data);
      this.description="";
    },
    async removeItem(item,i){
      await axios.delete("/api/todolistitems/" + item._id);
      this.items.splice(i,1);
    },
    select(item) {
      this.selected = item;
      this.editDescription = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editDescription = "";
    },
    async updateItem(item, i){
      const response = await axios.put("/api/todolistitems/" + item._id, {
        description: this.editDescription,
      });
      this.items[i] = response.data;
      this.unselect();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
