<template>
  <!-- Social Media Links Main DIV -->
  <div>
    <!-- Email Link -->
    <app-button
      appearance="icon"
      icon="email"
      size="sm"
      color="smb"
      target="_blank"
      :tooltip="$t('socialMedia.email')"
      href="mailto:dirkmichaelnm@gmail.com?subject=CloudDWHArchitect"
    />
    <!-- Discord Link -->
    <app-button
      appearance="icon"
      icon="bi-discord"
      size="sm"
      color="smb"
      target="_blank"
      :tooltip="$t('socialMedia.discord')"
      href="https://discord.gg/nepJ6jZEAr"
    />
    <!-- Twitter X Link -->
    <app-button
      appearance="icon"
      icon="bi-twitter-x"
      size="sm"
      color="smb"
      target="_blank"
      :tooltip="$t('socialMedia.twitter')"
      href="https://x.com/dmic2501"
    />
    <!-- Instagram Link -->
    <app-button
      appearance="icon"
      icon="bi-instagram"
      size="sm"
      color="smb"
      target="_blank"
      :tooltip="$t('socialMedia.instagram')"
      href="https://www.instagram.com/dirk_michael_nm"
    />
    <!-- Linked In Link -->
    <app-button
      appearance="icon"
      icon="bi-linkedin"
      size="sm"
      color="smb"
      target="_blank"
      :tooltip="$t('socialMedia.linkedIn')"
      href="https://www.linkedin.com/in/dirk-michael-7b651636/"
    />
    <!-- Twitch Link -->
    <app-button
      appearance="icon"
      icon="bi-twitch"
      size="sm"
      color="smb"
      target="_blank"
      :tooltip="$t('socialMedia.twitch')"
      href="https://twitch.tv/khrenn"
    />
  </div>
</template>

<script setup lang="ts">
import AppButton from 'components/common/AppButton.vue';
</script>
