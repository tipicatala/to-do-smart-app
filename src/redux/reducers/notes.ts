type State = {
  notes: [{ id?: string, completed?: boolean }]
}

type Action = {
  type: string,
  id: string,
}

export const notes = (state: any, action: any) => {
  switch (action.type) {
    case "add_note":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: Math.random().toString(36).substring(7),
            title: action.note,
            completed: false,
          },
        ],
      };

    case "done_note":
      return {
        ...state,
        notes: state.notes.map((note: { id: string, completed: boolean}) =>
          note.id === action.id ? { ...note, completed: !note.completed } : note
        ),
      };

    case "delete_note":
      return {
        ...state,
        notes: state.notes.filter(({ id=0 }) => id !== action.id),
      };

    default:
      throw new Error()
  }
}