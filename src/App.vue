<template>
  <div id="app">
    <v-app>
      <v-toolbar app>
        <v-toolbar-title v-if="!this.$isLoggedIn">Szánhúzókutyák adatbázisa</v-toolbar-title>
        <div v-if="this.$isLoggedIn" class="logo">
          <v-toolbar-title>Szánhúzókutyák adatbázisa</v-toolbar-title>
          <!-- E-mal cím kiírása ha van bejelentkezett felhasználó! -->
          <p>Bejelentkezve: {{ getUserEmail }}</p>
        </div>
        <v-spacer/>
        <!-- Router link-eknél beállítva, hogy mikor jelenjenek meg (v-if-ek segítségével) -->
        <v-btn
          color="info"
          class="links"
          :disabled="this.$isLoggedIn || this.$route.path == '/'"
          to="/"
        >Bejelentkezés</v-btn>
        <v-btn
          color="info"
          class="links"
          :disabled="this.$isLoggedIn || this.$route.path == '/signup'"
          to="/signup"
        >Regisztrálás</v-btn>
        <v-btn
          color="info"
          class="links"
          :disabled="!this.$isLoggedIn || this.$isVerified || this.$route.path == '/verify'"
          to="/verify"
        >Megerősítés</v-btn>
        <v-btn
          color="info"
          class="links"
          :disabled="!this.$isLoggedIn || !this.$isVerified || this.$route.path == '/demo'"
          to="/demo"
        >Adatbázis</v-btn>
        <v-btn
          color="info"
          class="links"
          :disabled="!this.$isLoggedIn"
          @click="logout()"
        >Kijelentkezés</v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
      <v-footer/>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class App extends Vue {
  // Kijelentkezés
  private logout(): void {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace("login");
      });
  }

  // Felhasználó e-mail
  private get getUserEmail(): string | null {
    return (
      firebase.auth().currentUser!.email +
      (firebase.auth().currentUser!.emailVerified
        ? " (Megerősített)"
        : " (Nem megerősített)")
    );
  }

  mounted() {
    this.$store.dispatch("fetchAll"); // fetchAll Action futtatása
  }
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
.logo {
  margin-top: 10px;
}
.links {
  text-decoration: none;
}
</style>
