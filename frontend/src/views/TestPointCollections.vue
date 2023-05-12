<template>
  <v-container>
    <v-dialog v-model="dialog" activator="parent" width="30%">
      <v-card>
        <v-header> Test points </v-header>
        <v-card-text>
          <v-chip-group v-if="!loading">
            <v-chip
              v-for="point in data[current_id]['TestPoints']"
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
    <v-col class="text-center">
      <div v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div v-else>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Input condition ID</th>
              <th class="text-left">Sample ID</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in data" :key="item.Id">
              <td>{{ item.InputConditionId }}</td>
              <td>{{ item.SampleIds }}</td>
              <td>
                <v-btn @click="current_id = i"> TEST POINTS </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    current_id: 0,
    loading: false,
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
    this.loading = true;
    const response = await fetch(
      "http://localhost:3000/api/test-point-collections"
    );
    const res = await response.json();

    const res_data = res.data;

    const nesto = res_data.map((a) => {
      return {
        Id: a["Id"],
        InputConditionId: a["InputConditionId"],
        SampleIds: a["SampleIds"].replace(/\[|\]/g, "").split(","),
        TestPoints: a["TestPoints"].replace(/\[|\]/g, "").split(","),
      };
    });

    console.log(nesto);
    this.data = nesto;

    console.log(this.data);

    this.loading = false;
  },
};
</script>

<style></style>
