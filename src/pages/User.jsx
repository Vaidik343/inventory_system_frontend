import React from 'react'
import UserTable from '../components/Users/UserTable'
import UserForm from '../components/Users/UserForm'
import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import PeopleIcon from '@mui/icons-material/People';

const User = () => {
  return (
    <Box>
      <PageHeader
        icon={PeopleIcon}
        title="User Management"
        subtitle="Manage user accounts and permissions"
      />

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <UserForm />
      </Box>

      <UserTable />
    </Box>
  )
}

export default User