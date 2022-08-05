<template>
  <h1 class="app__header">What connects you?</h1>
  <div class="name-form">
    <input
      type="text"
      name="name-input"
      id="name-input"
      v-model="attendee.name"
      @keypress.enter="addAttendee"
    />
    <label for="name-input"></label>
    <button class="button" @click="addAttendee">Add</button>
    <button class="button">Create Sessions</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  data() {
    return {
      attendees: [{}],
      attendee: { name: null },
    };
  },
  methods: {
    addAttendee() {
      if (this.attendee.name) {
        this.attendees.push({ name: this.attendee.name });
        this.attendee.name = null;
      }
    },
  },
});
</script>

<style></style>
