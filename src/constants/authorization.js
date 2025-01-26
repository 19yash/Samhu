export const entity = {
  Events: 'Events',
  Sports: 'Sports',
  Category: 'Category',
  Participants: 'Participants',
  Dashboard: 'Dashboard',
};

export const action = {
  create: 'create',
  view: 'view',
  edit: 'edit',
  delete: 'delete',
};

export const authorization = {
  Admin: {
    Dashboard: [action.view],
    Sports: [action.view, action.create, action.edit, action.delete],
    Category: [action.view, action.create, action.edit, action.delete],
    Events: [action.view, action.create, action.edit, action.delete],
    Participants: [action.view, action.edit, action.delete],
  },
  Host: {
    Dashboard: [action.view],
    Sports: [action.view],
    Category: [action.view, action.create],
    Events: [action.view, action.create, action.edit, action.delete],
    Participants: [action.view, action.edit, action.delete],
  },
  Participant: {
    Dashboard: [action.view],
    Sports: [],
    Category: [],
    Events: [action.view],
    Participants: [action.create],
  },
};
