import { FC, useState } from "react"

export const App: FC = () => {
  const [note, setNote] = useState("")

  return (
    <main className="container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setNote("");
        }}
      >
        <input
          className="add-note"
          type="text"
          value={note}
          onChange={({ target: { value } }) => setNote(value)}
        />
      </form>
      <ul className="notes">
        {appState.notes.map((note, index) => (
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
            />
          </li>
        ))}
      </ul>
    </main>
  )
}
