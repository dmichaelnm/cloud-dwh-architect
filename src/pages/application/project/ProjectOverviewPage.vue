<template>
  <!-- Overview Page -->
  <overview-page :scope="EFSDocumentType.project" :columns="[]">

  </overview-page>
</template>

<script setup lang="ts">
import OverviewPage from 'components/application/main/OverviewPage.vue';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
</script>
