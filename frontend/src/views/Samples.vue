<template>
  <v-container>
    <v-dialog v-model="dialog" activator="parent" width="30%">
      <v-card>
        <v-header> Test points </v-header>
        <v-card-text>
          <v-chip-group>
            <v-chip
              v-for="point in desserts[current_id]['points']"
              :key="point"
            >
              {{ point }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Family name</th>
          <th class="text-left">Product name</th>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.Id">
          <td>{{ item.FamilyName }}</td>
          <td>{{ item.ProductName }}</td>
          <td>
            {{ item.Name }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    data: [],
  }),
  methods: {
    editItem(item) {
      // Implement edit item logic here
    },
    deleteItem(item) {
      // Implement delete item logic here
    },
  },
  async mounted() {
    const response = await fetch("http://localhost:3000/api/samples");
    const jsonData = await response.json();
    console.log(jsonData);
    this.data = jsonData.data;
  },
};
</script>

<style></style>
