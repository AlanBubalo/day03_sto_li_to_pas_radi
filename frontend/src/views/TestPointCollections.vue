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
          <th class="text-left">Parameter</th>
          <th class="text-left">Nez</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
          <td>
            <v-btn @click="current_id = i"> TEST POINTS </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    current_id: 0,
    headers: [
      { text: "Dessert (100g serving)", value: "name" },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        points: [1, 2, 3, 4, 5],
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        points: [1, 2, 3, 4, 5],
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 24,
        protein: 6.0,
        points: [1, 2, 3, 4, 5],
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        points: [1, 2, 3, 4, 5],
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        points: [1, 2, 3, 4, 5],
      },
    ],
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
    const response = await fetch(
      "http://localhost:3000/api/test-point-collections"
    );
    const jsonData = await response.json();
    console.log(jsonData);
  },
};
</script>

<style></style>
