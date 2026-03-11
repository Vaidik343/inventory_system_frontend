import React from 'react'
import SettingsTable from '../components/settings/SettingsTable'
import SettingForm from '../components/settings/SettingForm'
import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {
  return (
    <Box>
      <PageHeader
        icon={SettingsIcon}
        title="System Settings"
        subtitle="Configure system-wide settings and preferences"
      />

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <SettingForm />
      </Box>

      <SettingsTable />
    </Box>
  )
}

export default Settings