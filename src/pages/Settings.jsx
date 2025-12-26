import React from 'react'
import SettingsTable from '../components/settings/SettingsTable'
import SettingForm from '../components/settings/SettingForm'

const Settings = () => {
  return (
    <div>
      <SettingForm />
        <SettingsTable />
    </div>
  )
}

export default Settings