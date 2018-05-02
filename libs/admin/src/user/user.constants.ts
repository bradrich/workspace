import { authRoleAdmin } from '@swampfox/auth';
import { TableConfig } from '@swampfox/shared';

import { User } from './user.model';

export const userPredicates = ['login', 'email', 'authorities'];

export const userTableConfig: TableConfig = {
  quickAdd: false,
  rowClick: {
    action: 'select'
  },
  columns: [
    {
      type: 'selection',
      show: true,
      showInViewOptions: false,
      header: 'Selected',
      isDisabled: (entity: User, specialEntity: User) => entity.login === specialEntity.login
    },
    {
      type: 'button',
      show: true,
      header: 'Activated',
      model: 'activated',
      button: {
        type: 'icon',
        icon: (entity: User) => (entity.activated ? 'done' : 'block'),
        color: (entity: User) => (entity.activated ? 'info' : 'danger'),
        action: 'setParameter'
      },
      tooltip: (entity: User) => (entity.activated ? 'Click to Deactivate' : 'Click to Activate'),
      isDisabled: (entity: User, specialEntity: User) => entity.login === specialEntity.login
    },
    {
      type: 'text',
      show: true,
      showInViewOptions: false,
      header: 'Login',
      model: 'login',
      specialEntityLabel: {
        show: (entity: User, specialEntity: User) => entity.login === specialEntity.login,
        text: `It's you`,
        className: 'ml-2 badge badge-success'
      },
      isSortable: true
    },
    {
      type: 'text',
      show: true,
      header: 'Email',
      model: 'email',
      isSortable: true
    },
    {
      type: 'repeat',
      show: true,
      header: 'Profiles',
      cellWidth: 'shrinkToFit',
      model: 'authorities',
      repeat: {
        model: 'name',
        color: (repeatItem) => {
          if (repeatItem === authRoleAdmin) {
            return 'success';
          } else {
            return 'info';
          }
        }
      }
    },
    {
      type: 'timeAgo',
      show: true,
      header: 'Last Modified',
      cellWidth: 'shrinkToFit',
      model: 'lastModifiedDate',
      timeAgo: {
        dateFilter: 'mediumDate',
        byModel: 'lastModifiedBy'
      },
      isSortable: true
    },
    {
      type: 'menu',
      show: true,
      showInViewOptions: false,
      header: 'Actions',
      textAlign: 'right',
      menu: {
        icon: 'more_vert',
        items: [
          {
            type: 'button',
            icon: 'vpn_key',
            text: 'Reset password',
            action: 'resetPassword'
          },
          {
            type: 'button',
            icon: 'delete',
            text: 'Delete user',
            action: 'delete'
          }
        ]
      },
      isDisabled: (entity: User, specialEntity: User) => entity.login === specialEntity.login
    }
  ]
};

export const userIsMultipleInfoMessage = `
  The inputs below are given values that are common to all Users that were selected for multiple
  edit. Only the inputs that are changed, which are given a green color, will be saved to each User.
  The other input values are ignored.
`;
