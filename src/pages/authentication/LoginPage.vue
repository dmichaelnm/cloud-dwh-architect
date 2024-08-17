<template>
  <!-- Authentication Frame -->
  <authentication-frame :message="$t('authentication.login.message')">
  </authentication-frame>
</template>

<script setup lang="ts">
import AuthenticationFrame from 'components/application/authentication/AuthenticationFrame.vue';
</script>
