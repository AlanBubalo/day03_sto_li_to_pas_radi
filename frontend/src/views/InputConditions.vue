<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Parameter</th>
          <th class="text-left">Minimum</th>
          <th class="text-left">Maximum</th>
          <th class="text-left">Time between points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.Id">
          <td>{{ item.Parameter }}</td>
          <td>{{ item.Minimum }}</td>
          <td>
            {{ item.Maximum }}
          </td>
          <td>
            {{ item.TimeBetweenPoints }}
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
    const response = await fetch("http://localhost:3000/api/input-conditions");
    const jsonData = await response.json();
    console.log(jsonData);
    this.data = jsonData.data;
  },
};
</script>

<style></style>
