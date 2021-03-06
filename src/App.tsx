import {
  FC,
  memo,
  useReducer,
  useState,
  useRef,
  useEffect,
} from 'react'
import {
  createAssistant,
  AssistantAppState,
} from '@sberdevices/assistant-client'
import './App.css'

import { initializeAssistant } from './assistant'

import { notes } from './redux/reducers'
import { act } from 'react-dom/test-utils'

export const App: FC = memo(() => {
  const [appState, dispatch] = useReducer(notes, { notes: [] })

  const [note, setNote] = useState('')

  const assistantStateRef = useRef<AssistantAppState>()
  const assistantRef = useRef<ReturnType<typeof createAssistant>>()

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on('data', ({ navigation, action }: any) => {
      if (navigation) {
          switch (navigation.command) {
            case 'UP':
              window.scrollTo(0, window.scrollY - 500);
              break;
            case 'DOWN':
              window.scrollTo(0, window.scrollY + 500);
              break;
          }
      }

      if (action) {
        console.log(action)
        dispatch(action);
      }
    });
  }, []);

  useEffect(() => {
    assistantStateRef.current = {
      item_selector: {
        items: appState.notes.map(({ id=0, title='' }, index: number) => ({
          number: index + 1,
          id,
          title,
        })),
      },
    };
  }, [appState]);


  return (
    <main className='container'>
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
        {appState.notes.map((note: {completed: boolean, id: number, title: string}, index: number) => (
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
})
