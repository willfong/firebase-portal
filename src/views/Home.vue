<template>
  <div class="home">
		<h1 class="title">Dashboard</h1>
		<p><button @click="click">Hit API</button></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Home',
	methods: {
		async click() {
			const response = await axios.get("/");
			console.log(response.data);
		}
	}
}
</script>
