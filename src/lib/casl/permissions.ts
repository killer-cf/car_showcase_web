import { AbilityBuilder } from '@casl/ability'

import { User } from '@/data/types/user'

import { AppAbility } from '.'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can }) {
    can('create', 'Car', { store_id: { $eq: user.employee_store_id ?? '' } })
  },
  MEMBER(user, { can }) {
    can('get', 'User')
  },
  BILLING(_, { can }) {
    can('manage', 'Car')
  },
  SUPER(_, { can }) {
    can('manage', 'all')
  },
}
