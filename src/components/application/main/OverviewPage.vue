<template>
  <!-- Page -->
  <q-page class="overview-page">
    <!-- Overview Frame -->
    <div class="overview-frame q-col-gutter-y-md">
      <!-- Title & Button Row -->
      <div class="row items-center">
        <!-- Title Column -->
        <div class="col overview-title">
          {{ $t(`${scope}.overview.title`) }}
        </div>
        <!-- Button Column -->
        <div class="col text-right">
          <!-- Close Button -->
          <app-button
            :label="$t('button.close')"
            color="sbutton"
            @click="routeTo('/', false)"
          />
        </div>
      </div>
      <!-- Message Row -->
      <div class="row">
        <!-- Message Column -->
        <div class="col-9">{{ $t(`${scope}.overview.message`) }}</div>
      </div>
      <!-- Table Row -->
      <div class="row">
        <!-- Table Column -->
        <div class="col">
          <!-- Table -->
          <app-editable-table
            :columns="tableColumn"
            :rows="cmp.session.projects"
          >
          </app-editable-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Overview Page
.overview-page {
  padding: 48px;
}

// Overview Frame
.overview-frame {
  padding: 24px;
  background-color: $light-background-frame;
  border-radius: 8px;
  box-shadow: 4px 4px 8px 0 $shadow;
}

// Overview Frame (Dark Mode)
.body--dark .overview-frame {
  background-color: $dark-background-frame;
}

// Overview Title
.overview-title {
  font-size: 14pt;
  font-variant: small-caps;
}
</style>

<script setup lang="ts">
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
import AppButton from 'components/common/AppButton.vue';
import * as cm from 'src/scripts/utilities/common';
import AppEditableTable from 'components/common/AppEditableTable.vue';
import { computed } from 'vue';
import { TTableColumn } from 'src/scripts/utilities/common';

// Get common composables
const cmp = cm.useCommonComposables();
// Get route to composable
const routeTo = cm.useRouteTo();

/** Defines the properties of this component */
defineProps<{
  // Scope of the overview
  scope: EFSDocumentType;
  // Custom columns
  columns: cm.TTableColumn[];
}>();

const tableColumn = computed<TTableColumn[]>(() => {
  // Columns array
  const cols: TTableColumn[] = [];
  // Return columns array
  return cols;
});
</script>
