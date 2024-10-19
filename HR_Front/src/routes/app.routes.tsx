import { Routes, Route } from 'react-router-dom'
import { SelectedEmployeeProvider } from '../contexts/selectedEmployee'
import { PageContextProvider } from '../contexts/pageName'
import { DefaultLayout } from '../layouts/DefaultLayout'
import {
  Alerts,
  DocumentsEmployee,
  EditEmployee,
  EditUser,
  Employees,
  Events,
  Home,
  NewEmployee,
  NewUser,
  NewVacation,
  EditVacation,
  Reports,
  Settings,
  Stock,
  EditTerminationEmployee,
  ViewTerminationEmployee,
  ViewSalaryEmployee,
  Users,
  ViewEmployee,
  ViewUser,
  ViewEquipmentsEmployee,
  EquipmentDelivery,
  EquipmentReturn,
  Logout,
  Vacations,
  NewEquipement,
  EditEquipement,
  NewEvent,
  NewAlert,
  EquipmentEdit
} from '../pages'

export function AppRoutes() {
  return (
    <PageContextProvider>
      <SelectedEmployeeProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="" element={<Home />} />
            <Route path="*" element={<Home />} />

            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<NewUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/users/view/:id" element={<ViewUser />} />

            <Route path="/stock" element={<Stock />} />
            <Route path="/stock/new" element={<NewEquipement />} />
            <Route path="/stock/edit/:id" element={<EditEquipement />} />



            <Route path="/alerts" element={<Alerts />} />
            <Route path="/alerts/new" element={<NewAlert />} />


            <Route path="/events" element={<Events />} />
            <Route path="/events/new" element={<NewEvent />} />


            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/new" element={<NewEmployee />} />
            <Route path="/employees/edit/:id" element={<EditEmployee />} />
            <Route path="/employees/view/:id" element={<ViewEmployee />} />
            <Route
              path="/employees/documents/:id"
              element={<DocumentsEmployee />}
            />
            <Route
              path="/employees/termination/edit/:id"
              element={<EditTerminationEmployee />}
            />
            <Route
              path="/employees/salary/:id"
              element={<ViewSalaryEmployee />}
            />
            <Route
              path="/employees/termination/view/:id"
              element={<ViewTerminationEmployee />}
            />
            <Route path="/employees/vacation/:id" element={<Vacations />} />

            <Route
              path="/employees/vacation/new/:id"
              element={<NewVacation />}
            />
            <Route
              path="/employees/vacation/edit/:id"
              element={<EditVacation />}
            />
            <Route
              path="/employees/equipments/view/:id"
              element={<ViewEquipmentsEmployee />}
            />
            <Route
              path="/employees/equipments/delivery/edit/:id"
              element={<EquipmentEdit />}
            />
            <Route
              path="/employees/equipments/delivery/new/:id"
              element={<EquipmentDelivery />}
            />
            <Route
              path="/employees/equipments/return/edit/:id"
              element={<EquipmentReturn />}
            />
            <Route
              path="/employees/equipments/return/new/:id"
              element={<EquipmentReturn />}
            />

            <Route path="/reports" element={<Reports />} />

            <Route path="/config" element={<Settings />} />

            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </SelectedEmployeeProvider>
    </PageContextProvider>
  )
}
