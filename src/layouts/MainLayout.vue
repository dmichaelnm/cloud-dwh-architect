<template>
  <!-- Layout -->
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header>
      <!-- Main Div -->
      <div>
        <!-- Toolbar Row -->
        <div class="row items-center header-toolbar">
          <!-- Header Title Row -->
          <div class="col-auto">
            <!-- Header Title -->
            <q-toolbar-title class="application-title"
              >{{ $t('application.title') }}
            </q-toolbar-title>
          </div>
          <!-- Space Column -->
          <div class="col-grow" />
          <!-- Account Name & Role -->
          <div class="col-auto account-text text-right">
            <!-- Account Name -->
            <div>{{ cmp.session.currentAccountName }}</div>
          </div>
          <!-- Account Menu Row -->
          <div class="col-auto">
            <!-- Account Menu -->
            <app-button appearance="icon" icon="person" color="toolbutton">
              <!-- Account Menu -->
              <q-menu :style="{ width: '200px' }">
                <!-- Account Menu List -->
                <q-list>
                  <!-- Dark Mode Button -->
                  <app-menu-item
                    clickable
                    closeable
                    show-icon
                    :icon="
                      cmp.quasar.dark.isActive ? 'light_mode' : 'dark_mode'
                    "
                    :label="
                      cmp.quasar.dark.isActive
                        ? $t('button.lightMode')
                        : $t('button.darkMode')
                    "
                    @click="switchDarkMode"
                  />
                  <!-- Language Selection Button -->
                  <app-menu-item
                    clickable
                    show-icon
                    icon="language"
                    :label="$t('button.language')"
                  >
                    <!-- Language Menu -->
                    <q-menu
                      anchor="top left"
                      self="top right"
                      :style="{ width: '200px' }"
                    >
                      <!-- Language List -->
                      <q-list>
                        <!-- Language Item -->
                        <app-menu-item
                          v-for="lng in languageOptions"
                          :key="lng.value"
                          clickable
                          closeable
                          show-icon
                          :label="$t(lng.label)"
                          :icon="lng.icon"
                          @click="switchLanguage(lng.value)"
                        />
                      </q-list>
                    </q-menu>
                  </app-menu-item>
                  <!-- Separator -->
                  <q-separator />
                  <!-- Logout Button -->
                  <app-menu-item
                    clickable
                    closeable
                    show-icon
                    icon="logout"
                    :label="$t('button.logout')"
                    @click="logoutFromApplication"
                  />
                </q-list>
              </q-menu>
            </app-button>
          </div>
        </div>
      </div>
    </q-header>

    <!-- Footer -->
    <q-footer class="footer">
      <!-- Footer Main DIV -->
      <div>
        <!-- Footer Row -->
        <div class="row">
          <!-- Left Footer Column -->
          <div class="col text-left footer-hint">
            <!-- Copyright Notice -->
            <div v-html="$t('application.copyright')" />
          </div>
          <!-- Center Footer Column -->
          <div class="col text-center">
            <!-- Social Media Links -->
            <social-media-links />
          </div>
          <!-- Right Footer Column -->
          <div class="col text-right footer-hint">
            <!-- Version Information -->
            {{
              $t('application.version', {
                major: versionInfo.major,
                minor: versionInfo.minor,
                patch: versionInfo.patch,
                build: versionInfo.build,
              })
            }}
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

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Header Toolbar
.header-toolbar {
  background-color: $light-background-frame;
  padding: 4px 16px;
  box-shadow: 4px 4px 8px 0 $shadow;
}

// Header Toolbar (Dark Mode)
.body--dark .header-toolbar {
  background-color: $dark-background-frame;
}

// Application Title
.application-title {
  font-variant: small-caps;
  color: $light-text-normal;
}

// Application Title (Dark Mode)
.body--dark .application-title {
  font-variant: small-caps;
  color: $dark-text-normal;
}

// Account Name & Role
.account-text {
  padding: 0 16px;
  font-size: 9pt;
  color: $light-text-hint;
}

// Account Name & Role (Dark Mode)
.body--dark .account-text {
  color: $dark-text-hint;
}
</style>

<script setup lang="ts">
import SocialMediaLinks from 'components/application/SocialMediaLinks.vue';
import { onBeforeMount } from 'vue';
import { onAccountStateChange } from 'src/scripts/application/Account';
import {
  EEditorMode,
  useCommonComposables,
  useOpenEditor,
} from 'src/scripts/utilities/common';
import { versionInfo } from 'src/scripts/config/version';
import AppButton from 'components/common/AppButton.vue';
import AppMenuItem from 'components/common/AppMenuItem.vue';
import { logout } from 'src/scripts/utilities/firebase';
import { languageOptions } from 'src/scripts/options/language';
import { loadProjects } from 'src/scripts/application/Project';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';

// Get common composables
const cmp = useCommonComposables();
// Get open editor composable
const openEditor = useOpenEditor();

/** Lifecycle method that is called before this component is mounted */
onBeforeMount(() => {
  // Lock the screen
  cmp.quasar.loading.show();
  // Register the event listener for changes on the account state of the current user
  onAccountStateChange(async (account) => {
    if (account === null) {
      // Unlock the screen
      cmp.quasar.loading.hide();
      // There is no authorized account, redirect to login page
      await cmp.router.push({ path: '/authentication/login' });
    } else {
      // Apply account to the session
      cmp.session.setAccount(account);
      // Found authorized account, set dark mode and language
      cmp.quasar.dark.set(account.data.preferences.dark);
      cmp.i18n.locale.value = account.data.preferences.language;
      // Load all projects of the current user
      cmp.session.setProjectList(await loadProjects());
      if (cmp.session.projects.length === 0) {
        // If the user has no projects, redirect to new project editor page
        await openEditor(EFSDocumentType.project, EEditorMode.create, 'new');
      }
      // Unlock the screen
      cmp.quasar.loading.hide();
    }
  });
});

/**
 * Switches the dark mode on or off.
 *
 * This method toggles the dark mode of the application using the Quasar framework.
 * It updates the dark mode cookie and the user account preferences.
 */
function switchDarkMode(): void {
  // Switch the dark mode
  cmp.quasar.dark.toggle();
  // Set the dark mode cookie
  cmp.quasar.cookies.set('dark', cmp.quasar.dark.isActive ? 'true' : 'false', {
    expires: 365,
  });
  // Update the account
  cmp.session.currentAccount.data.preferences.dark = cmp.quasar.dark.isActive;
  cmp.session.currentAccount.update();
}

/**
 * Switches the language in the application.
 *
 * @param {string} value - The value representing the language to switch to.
 */
function switchLanguage(value: string): void {
  // Switch the language
  cmp.i18n.locale.value = value;
  // Set the language cookie
  cmp.quasar.cookies.set('language', value, { expires: 365 });
  // Update the account
  cmp.session.currentAccount.data.preferences.language = value;
  cmp.session.currentAccount.update();
}

/**
 * Logs out the user from the application.
 */
function logoutFromApplication(): void {
  // Logout from Firebase
  logout();
}
</script>
