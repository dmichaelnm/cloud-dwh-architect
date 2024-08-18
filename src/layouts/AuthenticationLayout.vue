<template>
  <!-- Layout -->
  <q-layout view="lHh Lpr lFf">
    <!-- Message Dialog -->
    <message-dialog
      v-model="messageDialogOptions.visibility"
      :options="messageDialogOptions"
    />

    <!-- Footer -->
    <q-footer class="footer">
      <!-- Footer Main DIV -->
      <div>
        <!-- Footer Row -->
        <div class="row">
          <!-- Center Footer Column -->
          <div class="col text-center">
            <!-- Social Media Links -->
            <social-media-links />
          </div>
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
import MessageDialog from 'components/application/MessageDialog.vue';
import { useMessageDialog } from 'src/scripts/utilities/messageDialog';

// Get the message dialog options
const { messageDialogOptions } = useMessageDialog();
</script>
