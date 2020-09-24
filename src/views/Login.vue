<template>
  <section class="hero is-primary is-large">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form class="box">
							<div class="field has-text-centered">
							<p>Administration Portal</p>
              <b-button
                size="is-medium"
                icon-left="google"
                @click="googleLogin"
              >
                Login with Google
              </b-button>
							</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import firebase from "firebase";

export default {
  name: "Login",

  methods: {
    googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
					firebase.auth().currentUser.getIdToken(true).then(async (idToken) => {
						//console.log(idToken);
						axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
						this.$router.push("/");
					}).catch(function(error) {
						console.log(error);
					});

        })
        .catch(function(error) {
          /*
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
					// ...
					*/
          console.log(error);
        });
    },
  },
};
</script>
