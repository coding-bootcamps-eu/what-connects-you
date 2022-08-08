<template>
  <h1 class="app__header">What connects you?</h1>
  <div class="name-form">
    <input
      type="text"
      name="name-input"
      id="name-input"
      v-model="attendee"
      @keypress.enter="addAttendee"
    />
    <label for="name-input"></label>
    <button class="button" @click="addAttendee">Add</button>
    <button class="button">Create Sessions</button>
  </div>
  <div>
    <ol>
      <li v-for="attendee in attendees" :key="attendee">{{ attendee }}</li>
    </ol>
  </div>
</template>

<script lang="ts">
// todo: add missing unit tests
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},

  data(): {
    attendees: string[];
    attendee: string;
  } {
    return {
      attendees: [],
      attendee: "",
    };
  },
  methods: {
    addAttendee() {
      if (this.attendee) {
        this.attendees.push(this.attendee);
        this.attendee = "";
      }
    },
  },
});
</script>

<style></style>
