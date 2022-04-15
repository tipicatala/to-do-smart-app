import { createSmartappDebugger, createAssistant } from '@sberdevices/assistant-client'

export const initializeAssistant = (getState: () => any) => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === "development") {

    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYzRmOGU2Y2FhMDgyOTExZjYyOTE0MjI3NjVjZWE3MGM1YmE3NDJiYzIwODNiZjcxMmEzNWFmNjIzMTQ5Mjc3NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1MDAzNTIyOSwiaWF0IjoxNjQ5OTQ4ODE5LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiOTliOTMzNjEtZDI1Zi00NjU5LWE1MTYtMjJkMDI5ZDZiMDcyIiwic2lkIjoiYmQ5NGYxY2UtMzg0Yi00YWI2LTljZDAtMmQ3NGVkMzhjODNiIn0.kAyFWtkQfO5ac63ROPI18knQBQLDQad2CY8b1SNMuhn7PrZwEs_x6ixGF_QBi9g6uVJXlWfqBc54js2bsALf5eruLuy5Hj_qk5kcSaRxrQ8RrjlYpNDqLk6_ZdDrIIf1lKeg7GiFqWOal7emUJcytJucvpqW_5CdkC-T_Kq1QLFVXXXRVxs2RoCKDCE6yQl8LZCNqxO9Zi-_2PWoI4HdsQ0Pt_TcgjbnJsr2BoinNrXWmJC4mBKpMAISMqY2mau25dUb5-MbkRoL3rVTrs5I-K6B-KmhZBerj9oTImQ9TwuZBWO0cTZTIasudG_zYaz-BflfsJxi3fzffA3bmbSnVcHXa_cniSQrhWXxAx9CvXd1y5ur6FJpRRI84b_A6plis-Zmx8lx6zxsn7bOt9z3XJRsqPDY_JFMNvHMjGlI0Cq0gBYZymQLg222YjIW9W1Hc2Mkzsozgl2dh1skLKOStf1i44_ekUsHF6vdRzHARL38gcc3TPXX2jFB0NuvzpOa-390r9xTP091jZzQ5SrvfFkEQ4NKFJOaEhI1daOks8oCZgj27HrYz5PV-ZxZbdk160Aybe-a49IAaTuhuMdX0XKYR_UNR48gLM4RxjYA3Wzl0jyElWaZLo24sOoPaOUZViG7_ermFmNgg7ZBRbanKHXYccEA6rwLOiOtVexC3FY',
      initPhrase: `Запусти`,
      // initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState
    });
  }

  return createAssistant({ getState })
};