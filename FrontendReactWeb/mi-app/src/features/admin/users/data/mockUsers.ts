import type { ResUser, BillnovaUser } from "../types/user.types";

export const mockResUsers: ResUser[] = [
  { id: 1, name: "Juan Ramírez", login: "jramirez", email: "juan.ramirez@empresa.com", active: true },
  { id: 2, name: "María Jiménez", login: "mjimenez", email: "maria.jimenez@empresa.com", active: true },
  { id: 3, name: "Carlos Mendoza", login: "cmendoza", email: "carlos.mendoza@empresa.com", active: true },
  { id: 4, name: "Laura Castillo", login: "lcastillo", email: "laura.castillo@empresa.com", active: false },
  { id: 5, name: "Pedro Alcántara", login: "palcantara", email: "pedro.alcantara@empresa.com", active: true },
  { id: 6, name: "Sofía Núñez", login: "snunez", email: "sofia.nunez@empresa.com", active: true },
];

export const mockBillnovaUsers: BillnovaUser[] = [
  { id: 101, name: "Juan Ramírez", email: "juan.ramirez@empresa.com", phone: "809-555-1001", address: "Av. Churchill 101", is_mobile_user: true, res_user_id: 1 },
  { id: 102, name: "María Jiménez", email: "maria.jimenez@empresa.com", phone: "809-555-1002", address: "Calle 27 #45", is_mobile_user: false, res_user_id: 2 },
  { id: 103, name: "Carlos Mendoza", email: "carlos.mendoza@empresa.com", phone: "809-555-1003", address: "Av. Núñez de Cáceres 22", is_mobile_user: true, res_user_id: 3 },
  { id: 104, name: "Laura Castillo", email: "laura.castillo@empresa.com", phone: "809-555-1004", address: "Calle El Conde 18", is_mobile_user: false, res_user_id: 4 },
  { id: 105, name: "Pedro Alcántara", email: "pedro.alcantara@empresa.com", phone: "809-555-1005", address: "Av. Independencia 300", is_mobile_user: true, res_user_id: 5 },
  { id: 106, name: "Sofía Núñez", email: "sofia.nunez@empresa.com", phone: "809-555-1006", address: "Calle 19 #12", is_mobile_user: false, res_user_id: 6 },
];
