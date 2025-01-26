export default function PatientDetails({ patient }) {
    return (
        <div className="mt-6 text-center">
            <h3 className="text-xl font-medium">
                {patient.name}
            </h3>
        </div>
    )
}
