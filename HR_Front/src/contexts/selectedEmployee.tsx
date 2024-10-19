import { createContext, useContext, useEffect, useState } from 'react';

interface SelectedEmployeeContextData {
  selectedEmployeeId: number | null;
  selectedEmployeeName: string | null; // Nouveau champ pour le nom de l'employé sélectionné
  setSelectedEmployee: (employeeId: number, employeeName: string) => void; // Mettre à jour la signature
  clearSelectedEmployee: () => void;
}

const SelectedEmployeeContext = createContext<SelectedEmployeeContextData>(
  {} as SelectedEmployeeContextData
);

const storedId = localStorage.getItem('@3035TECH/EmployeeId');
const storedName = localStorage.getItem('@3035TECH/EmployeeName'); // Ajouter le nom dans le stockage local

export function useSelectedEmployee() {
  return useContext(SelectedEmployeeContext);
}

export function SelectedEmployeeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    storedId ? parseInt(storedId, 10) : null
  );
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string | null>(
    storedName ? storedName : null
  );

  const setSelectedEmployee = (employeeId: number, employeeName: string) => { // Mettre à jour la fonction
    setSelectedEmployeeId(employeeId);
    setSelectedEmployeeName(employeeName);
  };

  const clearSelectedEmployee = () => {
    setSelectedEmployeeId(null);
    setSelectedEmployeeName(null);
  };

  useEffect(() => {
    if (selectedEmployeeId !== null) {
      localStorage.setItem('@3035TECH/EmployeeId', selectedEmployeeId.toString());
      localStorage.setItem('@3035TECH/EmployeeName', selectedEmployeeName ? selectedEmployeeName : ''); // Sauvegarder le nom
    } else {
      localStorage.removeItem('@3035TECH/EmployeeId');
      localStorage.removeItem('@3035TECH/EmployeeName'); // Retirer le nom
    }
  }, [selectedEmployeeId, selectedEmployeeName]); // Mettre à jour les dépendances

  return (
    <SelectedEmployeeContext.Provider
      value={{
        selectedEmployeeId,
        selectedEmployeeName, // Fournir le nom dans le contexte
        setSelectedEmployee,
        clearSelectedEmployee
      }}
    >
      {children}
    </SelectedEmployeeContext.Provider>
  );
}
