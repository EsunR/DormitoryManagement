<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import studentDashboard from './student'

export default {
  name: 'Dashboard',
  components: { adminDashboard, studentDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (this.roles.includes('student')) {
      this.currentRole = 'studentDashboard'
    }
  }
}
</script>
