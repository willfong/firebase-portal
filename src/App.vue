<template>
  <section class="section">
    <div class="columns">
      <div class="column is-4-tablet is-3-desktop is-2-widescreen">
        <nav class="menu" v-if="user">
          <p class="menu-label">Admin Portal</p>
          <ul class="menu-list">
            <li>
              <router-link to="/">
                <b-icon icon="view-dashboard" size="is-small"> </b-icon>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/users">
                <b-icon icon="account-multiple" size="is-small"> </b-icon>
                Users
              </router-link>
            </li>
            <li>
              <a @click="logout">
                <b-icon icon="exit-to-app" size="is-small"> </b-icon>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="column">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
import { FIREBASE_AUTH } from "@/firebase/auth";

export default {
  name: "App",
  data() {
    return {
      user: null,
    };
  },
  created() {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(user);
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    logout() {
      FIREBASE_AUTH.signOut();
      this.user = null;
    },
  },
};
</script>
