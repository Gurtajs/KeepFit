import { createContext, useState } from "react";

export type WorkoutContextType = {
  workouts: Array<any>
  setWorkouts: React.Dispatch<React.SetStateAction<Array<string>>>
}

export const WorkoutContext = createContext<WorkoutContextType>({
  workouts: [],
  setWorkouts:  () => {},
})

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<any[]>([]);


  
  return (
    <WorkoutContext.Provider value={{workouts, setWorkouts}}>
      {children}
    </WorkoutContext.Provider>
  )
}