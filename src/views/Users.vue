<template>
  <div class="users">
    <h1>Users</h1>
    <b-field label="Add New User" grouped>
      <b-input
        placeholder="Add New User"
        type="search"
        v-model="newUserName"
      ></b-input>
      <p class="control">
        <b-button class="button is-primary" @click="addNewUser">Add</b-button>
      </p>
    </b-field>
    <b-table :data="users">
      <b-table-column field="id" label="ID" width="40" v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column field="name" label="Name" v-slot="props">
        <span v-if="props.row.id != modifyingUser">{{ props.row.name }}</span>
        <b-field
          v-if="props.row.id == modifyingUser"
          grouped
        >
          <b-input
            placeholder="Add New User"
            type="search"
            v-model="modifiedName"
          ></b-input>
          <p class="control">
            <b-button class="button is-primary" @click="saveNewName"
              >Save</b-button
            >
          </p>
        </b-field>
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button
          type="is-success is-light outlined"
          size="is-small"
          @click="modifyUser(props.row.id)"
          >Modify</b-button
        >
        <b-button
          type="is-danger is-light outlined"
          size="is-small"
          @click="deleteUser(props.row.id)"
          >Delete</b-button
        >
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { FIRESTORE_USERS } from "@/firebase/db";

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
  firestore: {
    users: FIRESTORE_USERS,
  },
  methods: {
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
  },
};
</script>
