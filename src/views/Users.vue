<template>
  <div class="users">
    <h1>Users</h1>
    <b-table :data="users">
      <b-table-column field="uid" label="ID" width="40" v-slot="props">
        {{ props.row.uid }}
      </b-table-column>
      <b-table-column field="displayName" label="Name" v-slot="props">
        {{props.row.displayName}}
      </b-table-column>
      <b-table-column field="email" label="Email" v-slot="props">
        {{props.row.email}}
      </b-table-column>
      <b-table-column label="Admin" v-slot="props">
        <b-button
          v-if="props.row.customClaims && props.row.customClaims.admin"
          type="is-danger is-light outlined"
          size="is-small"
          @click="revokeAdmin(props.row.uid)"
          >Revoke</b-button
        >
        <b-button
          v-if="!props.row.customClaims || !props.row.customClaims.admin"
          type="is-success is-light outlined"
          size="is-small"
          @click="grantAdmin(props.row.uid)"
          >Grant</b-button
        >
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
//import { FIRESTORE_USERS } from "@/firebase/db";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      newUserName: null,
      modifyingUser: null,
      modifiedName: null,
    };
  },
  /*
  firestore: {
    users: FIRESTORE_USERS,
	},
	*/
  mounted() {
		this.updateUsers();
	},

  methods: {
    updateUsers() {
      axios
        .get(
          "/users"
        )
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        });
    },
    async grantAdmin(uid) {
      await axios.post(
        "/users/admin/grant",
        { uid, admin: true }
			);
			this.updateUsers();
    },
    async revokeAdmin(uid) {
      await axios.post(
        "/users/admin/grant",
        { uid, admin: false }
			);
			this.updateUsers();
    },
    /*
    addNewUser() {
      FIRESTORE_USERS.add({ name: this.newUserName });
      this.newUserName = null;
    },
    deleteUser(id) {
      FIRESTORE_USERS.doc(id).delete();
    },
    modifyUser(id) {
      if (this.modifyingUser == id) {
        this.modifyingUser = null;
      } else {
        const userDetails = this.users.find((user) => user.id == id);
        this.modifyingUser = id;
        this.modifiedName = userDetails.name;
      }
		},
		saveNewName() {
			FIRESTORE_USERS.doc(this.modifyingUser).update({name: this.modifiedName});
			this.modifyingUser = null;
			this.modifiedName = null;
		}
		*/
  },
};
</script>
