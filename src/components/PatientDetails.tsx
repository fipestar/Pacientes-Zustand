import { toast } from "react-toastify"
import { usePatientStore } from "../store"
import type { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {

  const deletePatient = usePatientStore((state) => state.deletePatient)
  const getPatientById = usePatientStore((state) => state.getPatientById)

  const handleClick = () => {
    deletePatient(patient.id)
    toast('Paciente eliminado correctamente',{ type: 'error' })
  }
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID" data={patient.id} />  
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Fecha de alta" data={patient.date.toString()} />
      <PatientDetailItem label="Síntomas" data={patient.symptoms} />  

      <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
        <button 
           type="button"
           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
           onClick={() => getPatientById(patient.id)}
           >Editar</button>
        <button 
           type="button"
           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
           onClick={handleClick}
           >Eliminar</button>
      </div>
    </div>
  )
}
  

