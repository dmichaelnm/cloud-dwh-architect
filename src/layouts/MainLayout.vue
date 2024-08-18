<template>
  <!-- Layout -->
  <q-layout view="lHh Lpr lFf">
    <!-- Footer -->
    <q-footer class="footer">
      <!-- Footer Main DIV -->
      <div>
        <!-- Footer Row -->
        <div class="row">
          <!-- Left Footer Column -->
          <div class="col text-left"></div>
          <!-- Center Footer Column -->
          <div class="col text-center">
            <!-- Social Media Links -->
            <social-media-links />
          </div>
          <!-- Right Footer Column -->
          <div class="col text-right"></div>
        </div>
      </div>
    </q-footer>

    <!-- Page Container -->
    <q-page-container>
      <!-- Router View -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import SocialMediaLinks from 'components/application/SocialMediaLinks.vue';
import { onBeforeMount } from 'vue';
import { onAccountStateChange } from 'src/scripts/application/Account';
import { useCommonComposables } from 'src/scripts/utilities/common';

// Get common composables
const cmp = useCommonComposables();

/** Lifecycle method that is called before this component is mounted */
onBeforeMount(() => {
  // Register the event listener for changes on the account state of the current user
  onAccountStateChange((account) => {
    if (account === null) {
      // There is no authorized account, redirect to login page
      cmp.router.push({ path: '/authentication/login' });
    } else {
      // Found authorized account
      console.log(account);
    }
  });
});
</script>
