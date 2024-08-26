<template>
  <!-- Button -->
  <q-btn
    no-caps
    flat
    :label="label"
    class="project-button"
    icon-right="arrow_drop_down"
  >
    <!-- Menu -->
    <q-menu>
      <!-- List -->
      <q-list dense padding>
        <!-- Project Overview -->
        <app-menu-item
          clickable
          closeable
          :label="$t('project.button.overview')"
          @click="emit('project:overview')"
        />
        <!-- Create Project -->
        <app-menu-item
          clickable
          closeable
          :label="$t('project.button.create')"
          @click="emit('project:create')"
        />
        <!-- Separator -->
        <q-separator />
        <!-- List of projects -->
        <app-menu-item
          v-for="prj in cmp.session.projects"
          :key="prj.id"
          clickable
          closeable
          :label="prj.data.common.name"
          @click="() => (internal = prj.id)"
        />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Project Button
.project-button {
  font-weight: normal;
  color: $light-button;
}

// Project Button (Dark Mode)
.body--dark .project-button {
  color: $dark-button;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { useCommonComposables } from 'src/scripts/utilities/common';
import AppMenuItem from 'components/common/AppMenuItem.vue';

// Get common composables
const cmp = useCommonComposables();

/** Defines the properties of this component */
const props = defineProps<{
  /** The model value */
  modelValue: string | null;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  /** Model value changed event */
  (event: 'update:modelValue', value: string | null): void;
  /** Project overview event */
  (event: 'project:overview'): void;
  /** Create project event */
  (event: 'project:create'): void;
}>();

/** Internal model value */
const internal = computed({
  get: () => props.modelValue,
  set: (value: string | null) => emit('update:modelValue', value),
});

/** Button label */
const label = computed(() => {
  if (internal.value === 'overview') {
    // Return label for project overview
    return cmp.i18n.t('project.button.overview');
  }
  if (internal.value === 'create') {
    // Return label for new project
    return cmp.i18n.t('project.button.create');
  }
  // Return the name of the project
  const project = cmp.session.getProject(internal.value);
  return project ? project.data.common.name : '';
});
</script>
