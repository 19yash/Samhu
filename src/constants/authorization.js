export const entity = {
  event: 'Event',
  sports: 'Sports',
};

export const action = {
  create: 'create',
  view: 'view',
  edit: 'edit',
  delete: 'delete',
};

export const authorization = {
  Admin: {
    sports: [action.view, action.create, action.edit, action.delete],
    Event: [action.view, action.create, action.edit, action.delete],
  },
  Host: {
    Event: [action.view, action.create, action.edit, action.delete],
  },
  Participant: {
    Event: [action.view],
  },
};
