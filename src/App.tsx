import { FC, useState, useReducer, useRef, useEffect } from "react"
import { notes } from './redux/reducers'
import { initializeAssistant } from './assistant'

export const App: FC = () => {
  const [note, setNote] = useState("")
  const [appState, dispatch] = useReducer(notes, { notes: [] });

  const assistantRef = useRef();

  useEffect(() => {
    assistantRef.current = initializeAssistant(dispatch as any) as any

    (assistantRef.current as any).on("data", ({ action={} }) => {
      if (action) {
        dispatch(action);
      }
    });
  }, []);

  return (
    <main className="container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch({ type: "add_note", note });
          setNote("");
        }}
      >
        <input
          className="add-note"
          type="text"
          placeholder="Add Note"
          value={note}
          onChange={({ target: { value } }) => setNote(value)}
          required
          autoFocus
        />
      </form>
      <ul className="notes">
        {appState.notes.map((note: any, index: number) => (
          <li className="note" key={note.id}>
            <span>
              <span style={{ fontWeight: "bold" }}>{index + 1}. </span>
              <span
                style={{
                  textDecorationLine: note.completed ? "line-through" : "none",
                }}
              >
                {note.title}
              </span>
            </span>
            <input
              className="done-note"
              type="checkbox"
              checked={note.completed}
              onChange={() => dispatch({ type: "done_note", id: note.id })}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
