export const entity = {
  Events: 'Events',
  Sports: 'Sports',
  Category: 'Category',
  Participants: 'Participants',
};

export const action = {
  create: 'create',
  view: 'view',
  edit: 'edit',
  delete: 'delete',
};

export const authorization = {
  Admin: {
    Sports: [action.view, action.create, action.edit, action.delete],
    Category: [action.view, action.create, action.edit, action.delete],
    Events: [action.view, action.create, action.edit, action.delete],
    Participant: [action.view, action.edit, action.delete],
  },
  Host: {
    Sports: [action.view],
    Category: [action.view],
    Events: [action.view, action.create, action.edit, action.delete],
    Participant: [action.view, action.edit, action.delete],
  },
  Participant: {
    Sports: [],
    Category: [],
    Events: [action.view],
    Participant: [],
  },
};
