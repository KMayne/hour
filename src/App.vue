<template>
  <main id="app" class="app-container" :class="{ 'modal-active': modalActive }">
    <section class="backlog-container">
      <h1>Backlog</h1>
      <draggable @update="itemMoved" @remove="itemMoved" tag="ul" class="backlog" v-model="taskData.backlog" group="tasks">
        <li v-for="item in taskData.backlog" class="task" :key="item.id">{{item.name}}</li>
      </draggable>
      <button @click="modalActive = true">Add</button>
    </section>

    <section class="plan-container">
      <h1>Plan</h1>
      <template v-for="day in taskData.days">
      <h2 :key="'heading-' + day.dateStr">{{day.dateStr}}</h2>
      <draggable @update="itemMoved" @remove="itemMoved" tag="ol" class="task-list" :key="'list-' + day.dateStr" v-model="day.tasks" group="tasks">
        <li v-for="item in day.tasks" class="task" :key="item.id">{{ item.name }}</li>
      </draggable>
      </template>
    </section>

    <div class="modal-overlay" @click="() => modalActive = false">
      <form class="modal" @click.stop="() => false">
        <span @click="() => modalActive = false" class="close-button material-icons">close</span>
        <h1>Add task</h1>
        <label for="task-name">Task: <input type="text" v-model="taskForm.name" name="task-name"></label>
        <label for="minute-estimate">Estimate (mins): <input type="number" v-model="taskForm.minuteEstimate" name="minute-estimate"></label>
        <button @click.prevent="taskAddClicked" :disabled="!formValid">Add</button>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { DateTime } from 'luxon';
import draggable from 'vuedraggable';

interface Task {
  id: number;
  name: string;
  minuteEstimate?: number;
}

const initialFormState = {
  name: '',
  minuteEstimate: undefined
}

function uuidv4() {
  return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, (c: string) =>
    (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
  );
}

export default Vue.extend({
  components: { draggable },
  data: () => ({
    modalActive: false,
    taskForm: { ...initialFormState },
    taskData: {
      backlog: [],
      days: [{
          dateStr: 'Today',
          tasks: []
        }, {
          dateStr: 'Tomorrow',
          tasks: []
        }
      ]
    }
  }),
  mounted() {
    this.taskData.backlog = JSON.parse(localStorage.getItem('backlog') || '[]');
    this.taskData.days[0].tasks = JSON.parse(localStorage.getItem('todaysTasks') || '[]');
    this.taskData.days[1].tasks = JSON.parse(localStorage.getItem('tomorrowsTasks') || '[]');
  },
  methods: {
    taskAddClicked(e: MouseEvent) {
      this.taskData.backlog.push({ ...this.taskForm, id: uuidv4() });
      this.modalActive = false;
      this.taskForm = { ...initialFormState };
      localStorage.setItem('backlog', JSON.stringify(this.taskData.backlog));
    },
    itemMoved() {
      localStorage.setItem('backlog', JSON.stringify(this.taskData.backlog));
      localStorage.setItem('todaysTasks', JSON.stringify(this.taskData.days[0].tasks));
      localStorage.setItem('tomorrowsTasks', JSON.stringify(this.taskData.days[1].tasks));
    }
  },
  computed: {
    formValid() {
      return this.taskForm.name && this.taskForm.name !== '';
    }
  }
});
</script>

<style>
.app-container {
  height: 100vh;
  width: 100vw;
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
  padding: 8px;
  box-sizing: border-box;
}

main > section > ul {
  text-align: left;
}

.backlog, .task-list {
  list-style: none;
  padding: 0;
}

.task {
    border: 1px solid black;
    border-radius: 3px;
    margin: 8px 0;
    padding: 4px;
}

:root {
  --modal-width: 60vw;
  --modal-height: 22vh;
}

.modal-active > section {
  filter: blur(3px);
}

.modal-active .modal-overlay, .modal-active .modal {
  display: block;
}

.modal-overlay {
  display: none;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.modal {
  display: none;
  position: fixed;
  background: white;
  border-radius: 3px;
  padding: 8px;
  height: var(--modal-height);
  width: var(--modal-width);
  top: calc(50vh - var(--modal-height) / 2);
  left: calc(50vw - var(--modal-width) / 2);
}

.modal .close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.modal > label {
  display: block;
  padding-bottom: 8px;
}

</style>
