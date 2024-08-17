<template>
  <!-- Page -->
  <q-page class="flex flex-center">
    <!-- Frame DIV -->
    <div class="authentication-frame">
      <!-- Header Row -->
      <div class="row authentication-row">
        <!-- Header Column -->
        <div class="col text-center">
          <!-- Application Title -->
          <div class="application-title">{{ $t('application.title') }}</div>
          <!-- Copyright Notice -->
          <div class="application-hint" v-html="$t('application.copyright')" />
          <!-- Version -->
          <div class="application-hint">
            {{
              $t('application.version', {
                major: versionConfig.major,
                minor: versionConfig.minor,
                patch: versionConfig.patch,
                build: versionConfig.build,
              })
            }}
          </div>
        </div>
      </div>

      <!-- Message Row -->
      <div class="row authentication-row">
        <!-- Message Column -->
        <div class="col" style="height: 130px">{{ message }}</div>
      </div>

      <!-- Page Content Row -->
      <div class="row authentication-row">
        <!-- Page Content Column -->
        <div class="col">
          <!-- Default Slot -->
          <slot />
        </div>
      </div>

      <!-- Options Row -->
      <div class="row authentication-row">
        <!-- Left Options Column -->
        <div class="col">
          <!-- Dark Mode Button -->
          <app-button
            appearance="icon"
            :icon="cmp.quasar.dark.isActive ? 'light_mode' : 'dark_mode'"
            @click="switchDarkMode"
          />
        </div>
        <!-- Right Options Column -->
        <div class="col">
          <!-- Language Select Component -->
          <app-select
            v-model="language"
            :options="languageOptions"
            icon="language"
            borderless
            translate
            @update:modelValue="switchLanguage"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Authentication Frame
.authentication-frame {
  width: 500px;
  padding: 16px;
  border-radius: 8px;
  background-color: $light-background-frame;
  box-shadow: 4px 4px 8px 0 $shadow;
}

// Authentication Frame (Dark Mode)
.body--dark .authentication-frame {
  background-color: $dark-background-frame;
}

.authentication-row {
  padding: 16px;
}

// Application Title
.application-title {
  font-size: 28pt;
  font-variant: small-caps;
  color: $light-text-highlight;
}

// Application Title (Dark Mode)
.body--dark .application-title {
  color: $dark-text-highlight;
}

// Application Hint
.application-hint {
  font-size: 9pt;
  color: $light-text-hint;
}

// Application Hint (Dark Mode)
.body--dark .application-hint {
  color: $dark-text-hint;
}
</style>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { versionConfig } from 'src/scripts/config/version';
import { useCommonComposables } from 'src/scripts/utilities/common';
import { ELanguage, languageOptions } from 'src/scripts/options/language';
import AppButton from 'components/common/AppButton.vue';
import AppSelect from 'components/common/AppSelect.vue';

// Get common composables
const cmp = useCommonComposables();

// The currently selected language value
const language = ref(ELanguage.enUS);

/** Defines the properties of this component. */
defineProps<{
  /** Authentication Message */
  message: string;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  // Language has changed event
  (event: 'language-changed', language: ELanguage): void;
}>();

/** Lifecycle method that is called before this component is mounted */
onBeforeMount(() => {
  // Set the dark mode from the cookie
  cmp.quasar.dark.set(cmp.quasar.cookies.get('dark') === 'true');
  // Get the language
  let lang = cmp.quasar.cookies.get('language');
  // If there is no language cookie, get the browser default
  lang = lang ? lang : navigator.language;
  // Check, if the language is supported
  if (!languageOptions.some((opt) => opt.value === lang)) {
    // If not, use English (US) as default
    language.value = ELanguage.enUS;
  } else {
    language.value = lang as ELanguage;
  }
  // Set the language
  switchLanguage();
});

/**
 * Switches the dark mode on or off and sets a cookie for the current dark mode state.
 */
function switchDarkMode(): void {
  // Switch the dark mode
  cmp.quasar.dark.toggle();
  // Set cookie for current dark mode state
  cmp.quasar.cookies.set('dark', cmp.quasar.dark.isActive ? 'true' : 'false', {
    expires: 365,
  });
}

/**
 * Switches the application language and sets the language cookie.
 */
function switchLanguage(): void {
  // Switch the language
  cmp.i18n.locale.value = language.value;
  // Set the cookie for the language
  cmp.quasar.cookies.set('language', language.value, { expires: 365 });
  // Emit event
  emit('language-changed', language.value);
}
</script>
