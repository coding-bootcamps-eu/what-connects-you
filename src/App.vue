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
    <button
      class="button"
      @click="createSessions()"
      :disabled="!isValidSession"
    >
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
      <li
        v-for="(session, i) in sessions"
        :key="i"
        class="sessions__list-item"
        :class="{ finished: isSessionCompleted(session) }"
      >
        <h2>Session {{ i + 1 }}</h2>
        <p v-for="(singleSession, j) in session" :key="j">
          {{ session[j][0] + " - " + session[j][1] }}
        </p>
        <button @click="finishSession(session)" class="button">
          Session finished
        </button>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
// todo: add missing unit tests
import { defineComponent } from "vue";
import { createSessions, Sessions, Session } from "./round-robin-matching";

export default defineComponent({
  name: "App",
  components: {},

  data(): {
    attendees: string[];
    attendee: string;
    sessions: Sessions;
    completedSessions: Sessions;
  } {
    return {
      attendees: [],
      attendee: "",
      sessions: [],
      completedSessions: [],
    };
  },
  // created() {
  //   this.createSessions();
  // },
  computed: {
    isValidSession: function (): boolean {
      return this.attendees.length > 1 && this.attendees.length % 2 === 0;
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
    finishSession(session: Session) {
      this.completedSessions.push(session);
    },
    isSessionCompleted(session: Session) {
      return this.completedSessions.includes(session);
    },
  },
});
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: sans-serif;
}
.sessions__list {
  list-style: none;
}

.finished {
  text-decoration: line-through;
}
</style>
