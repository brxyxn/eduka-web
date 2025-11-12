import { supabase, type Tables } from '@/lib/supabase'
import { StudentEnrollmentSchema } from '@/lib/validations/student'
import { type z } from 'zod'

export async function createStudentEnrollment(data: z.infer<typeof StudentEnrollmentSchema>) {
    try {
        // Start a Supabase transaction
        const { data: student, error: studentError } = await supabase
            .from('students')
            .insert({
                first_name: data.firstName,
                middle_name: data.middleName,
                last_name: data.lastName,
                personal_id: data.personalId,
                date_of_birth: data.dateOfBirth,
                gender: data.gender,
                nationality: data.nationality,
            })
            .select()
            .single()

        if (studentError) throw studentError
        if (!student) throw new Error('Failed to create student')

        // Insert guardians
        const guardiansPromises = data.guardians.map(async (guardian) => {
            const { data: guardianData, error: guardianError } = await supabase
                .from('guardians')
                .insert({
                    student_id: student.id,
                    full_name: guardian.fullName,
                    personal_id: guardian.personalId,
                    date_of_birth: guardian.dateOfBirth,
                    email: guardian.email,
                    relation_to_student: guardian.relationToStudent,
                    is_primary_guardian: guardian.isPrimaryGuardian,
                })
                .select()
                .single()

            if (guardianError) throw guardianError
            if (!guardianData) throw new Error('Failed to create guardian')

            // Insert guardian phones
            const phonesPromises = guardian.phones.map((phone) =>
                supabase.from('guardian_phones').insert({
                    guardian_id: guardianData.id,
                    number: phone.number,
                    type: phone.type,
                })
            )

            await Promise.all(phonesPromises)

            return guardianData
        })

        await Promise.all(guardiansPromises)

        // Insert address
        const { error: addressError } = await supabase.from('addresses').insert({
            student_id: student.id,
            address_line1: data.addressLine1,
            address_line2: data.addressLine2,
            zone: data.zone,
            state: data.state,
            city: data.city,
        })

        if (addressError) throw addressError

        // Insert emergency contacts
        const contactsPromises = data.emergencyContacts.map((contact) =>
            supabase.from('emergency_contacts').insert({
                student_id: student.id,
                full_name: contact.fullName,
                relationship: contact.relationship,
                phone_number: contact.phone.number,
                phone_type: contact.phone.type,
            })
        )

        await Promise.all(contactsPromises)

        return { success: true, data: student }
    } catch (error) {
        console.error('Error creating student enrollment:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
}
