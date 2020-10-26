<template>
  <main id="app" class="app-container">
    <section class="backlog-container">
      <h1>Backlog</h1>
      <ul>
        <li v-for="item in backlog" :key="item.id">{{item.name}}</li>
      </ul>
    </section>

    <section class="plan-container">
      <h1>Plan</h1>
      <template v-for="day in daysToDisplay">
      <h2 :key="'heading-' + day">{{day.toLocaleString({ weekday: 'long' })}}</h2>
      <ul :key="'list-' + day">
        <li v-for="item in getItemsForDay(day)" :key="item.id">{{ item.name }}</li>
      </ul>
      </template>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { DateTime } from 'luxon';

export default Vue.extend({
  data: () => ({
    backlog: [
      { name: 'Item 1', id: 1 },
      { name: 'Item 2', id: 2 },
      { name: 'Item 3', id: 3 }
    ],
    scheduledItems: [
      { name: 'Item 4', id: 4, scheduledTime: DateTime.local() },
      { name: 'Item 5', id: 5, scheduledTime: DateTime.local().plus({ hour: 1 }) },
      { name: 'Item 6', id: 6, scheduledTime: DateTime.local().plus({ hour: 3, days: 1 }) },
    ]
  }),
  methods: {
    getItemsForDay(day: DateTime) {
      return this.scheduledItems.filter(item => item.scheduledTime.hasSame(day, 'day'));
    }
  },
  computed: {
    daysToDisplay() {
      const numDaysToDisplay = 7;
      const today = DateTime.local().startOf('day');
      return Array.from({ length: numDaysToDisplay },
        (_, i) => today.plus({ days: i }));
    }
  }
});
</script>

<style>
.app-container {
  height: 100vh;
  width: 100vh;
  display: flex;
  flex-direction: row;
  font-family: sans-serif;
}

main > section > h1 {
  text-align: center;
}

main > section {
  height: 100%;
  flex: 1;
}

main > section > ul {
  text-align: left;
}
</style>
