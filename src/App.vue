<template>
  <h1 class="app__header">What connects you?</h1>
  <div class="name-form">
    <input
      type="text"
      name="name-input"
      id="name-input"
      v-model="attendee"
      @keypress.enter="addAttendee"
      class="name-input"
    />
    <label for="name-input"></label>
    <button class="button" @click="addAttendee()">Add</button>
    <button class="button" @click="createSessions()" :disabled="isValidSession">
      Create Sessions
    </button>
  </div>
  <div class="added-attendees">
    <ol class="attendee-list">
      <li
        v-for="attendee in attendees"
        :key="attendee"
        class="attendee-list__item"
      >
        {{ attendee }}
      </li>
    </ol>
  </div>
  <div class="sessions">
    <ol class="sessions__list">
      <li v-for="(session, i) in sessions" :key="i" class="sessions__list-item">
        <h2 :class="{ finished: finishedSession === i }">
          Session {{ i + 1 }}
        </h2>
        <p
          v-for="(singleSession, j) in session"
          :key="j"
          :class="{ finished: finishedSession === i }"
        >
          {{ session[j][0] + " - " + session[j][1] }}
        </p>
        <button @click="toggleFinished(i)" class="button">
          Session finished
        </button>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
// todo: add missing unit tests
import { defineComponent } from "vue";
import { createSessions, Sessions } from "./round-robin-matching";

export default defineComponent({
  name: "App",
  components: {},

  data(): {
    attendees: string[];
    attendee: string;
    sessions: Sessions;
    finishedSession: number | null;
  } {
    return {
      attendees: ["aaaa", "bbbb", "ccc", "ddd", "eee", "fff", "ggg", "hhh"],
      attendee: "",
      sessions: [],
      finishedSession: null,
    };
  },
  created() {
    this.createSessions();
  },
  computed: {
    isValidSession: function (): boolean {
      return this.attendees.length > 1 && this.attendees.length % 2 !== 0;
    },
  },
  methods: {
    addAttendee() {
      if (this.attendee) {
        this.attendees.push(this.attendee);
        this.attendee = "";
      }
    },
    createSessions() {
      this.sessions = createSessions(this.attendees);
    },
    toggleFinished(index: number) {
      if (this.finishedSession === index) {
        this.finishedSession = null;
      } else {
        this.finishedSession = index;
      }
    },
  },
});
</script>

<style>
.sessions__list {
  list-style: none;
}

.finished {
  text-decoration: line-through;
}
</style>
