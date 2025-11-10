import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {v4 as uuidv4} from 'uuid';
import type { DraftPatient, Patient } from './types';

type PatientState = {
    patients: Patient[];
    activeId: Patient['id'];
    addPatient: (data: DraftPatient) => void;
    deletePatient: (id: Patient['id']) => void;
    getPatientById: (id: Patient['id']) => void;
    updatePatient: (data: DraftPatient) => void;
}

const createPatient = (patient: DraftPatient) : Patient => {
    return {...patient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>()(
    devtools<PatientState>(
        persist<PatientState>(
        (set, _get) => ({
            patients: [],
            activeId: '' as Patient['id'],
            addPatient: (data) => {
                const newPatient = createPatient(data);
                set((state: PatientState) => ({
                    patients: [...state.patients, newPatient]
                }))
            },
            deletePatient: (id) => {
                set((state: PatientState) => ({
                    patients: state.patients.filter((patient: Patient) => patient.id !== id),
                }))
            },
            getPatientById(id) {
                set(() => ({
                    activeId: id
                }))
            },
            updatePatient: (data) => {
                set((state: PatientState) => ({
                    patients: state.patients.map((patient: Patient) => patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
                    activeId: '' as Patient['id']
                }))
            }
        }), {
            name: 'patient-storage'
        }
    ) as any)
);