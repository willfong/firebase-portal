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
import firebase from "firebase";

export default {
  name: "Login",

  methods: {
    googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //var token = result.credential.accessToken;

          // The signed-in user info.
          //this.user = result.user;
          console.log(result.user);
          this.$router.push("/");
          // ...
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
