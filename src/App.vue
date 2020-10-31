<template>
  <main id="app" class="app-container">
    <section class="backlog-container">
      <h1>Backlog</h1>
      <draggable v-model="backlog" group="tasks">
        <li v-for="item in backlog" :key="item.id">{{item.name}}</li>
      </draggable>
    </section>

    <section class="plan-container">
      <h1>Plan</h1>
      <template v-for="day in days">
      <h2 :key="'heading-' + day">{{day.dateStr}}</h2>
      <draggable :key="'list-' + day" v-model="day.tasks" group="tasks">
        <li v-for="item in day.tasks" :key="item.id">{{ item.name }}</li>
      </draggable>
      </template>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { DateTime } from 'luxon';
import draggable from 'vuedraggable';

export default Vue.extend({
  components: { draggable },
  data: () => ({
    backlog: [
      { name: 'Item 1', id: 1 },
      { name: 'Item 2', id: 2 },
      { name: 'Item 3', id: 3 }
    ],
    days: [{
        dateStr: '2020-10-31',
        tasks: [{ name: 'Item 4', id: 4 }]
      }, {
        dateStr: '2020-11-01',
        tasks: [
          { name: 'Item 5', id: 5 },
          { name: 'Item 6', id: 6 }
        ]
      }
    ]
  }),
  methods: {
  },
  computed: {
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
