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
              point
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-table>
      <thead v-for="item in headers" :key="item.text">
        <tr>
          <th class="text-left">{{ item.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in samples" :key="item.Id">
          <td>{{ item.FamilyName }}</td>
          <td>{{ item.ProductName }}</td>
          <td>{{ item.Name }}</td>
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
      { text: "Identifier", value: "Id" },
      { text: "Family Name", value: "FamilyName" },
      { text: "Product Name", value: "ProductName" },
      { text: "Name", value: "Name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    samples: [
      {
        FamilyName: "Aurix",
        ProductName: "TC3xx",
        Name: "POR1",
        Id: 1,
      },
      {
        FamilyName: "Aurix",
        ProductName: "TC2xx",
        Name: "SS1",
        Id: 2,
      },
      {
        FamilyName: "Aurix",
        ProductName: "TC2xx",
        Name: "POR1",
        Id: 3,
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
};
</script>

<style></style>
