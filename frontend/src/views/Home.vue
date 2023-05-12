<template>
  <v-container>
    <v-col class="text-right"> <v-btn color="primary">SWITCH</v-btn></v-col>
    <v-table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Input voltage</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.idx">
          <td>
            <v-btn plain>{{ item.idx }}</v-btn>
          </td>
          <td>
            <v-btn plain>{{ item.temperature }}</v-btn>
          </td>
          <td>
            <v-btn plain>{{ item.humidity }}</v-btn>
          </td>
          <td>
            <v-btn plain>{{ item.input_voltage }}</v-btn>
          </td>
          <td>
            <v-btn plain>{{ item.freq }}</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-col class="text-left"> <v-btn color="primary">EXPORT</v-btn></v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    data: [
      { idx: 1, temperature: -40, humidity: 10, input_voltage: 3.3, freq: 5 },
      {
        idx: 2,
        temperature: -400,
        humidity: 910,
        input_voltage: 34.3,
        freq: 544,
      },
    ],
  }),
};
</script>

<style>
.v-btn {
  /* elevation: zero; */
}
</style>
