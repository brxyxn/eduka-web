import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables = {
    students: {
        id: string
        first_name: string
        middle_name?: string
        last_name: string
        cui: string
        date_of_birth: string
        gender: 'male' | 'female' | 'other'
        nationality: string
        created_at: string
    }
    guardians: {
        id: string
        student_id: string
        full_name: string
        cui: string
        date_of_birth: string
        email: string
        relation_to_student: string
        is_primary_guardian: boolean
        created_at: string
    }
    guardian_phones: {
        id: string
        guardian_id: string
        number: string
        type: 'cellphone' | 'home' | 'other'
        created_at: string
    }
    addresses: {
        id: string
        student_id: string
        address_line1: string
        address_line2?: string
        zone: number
        state: string
        city: string
        created_at: string
    }
    emergency_contacts: {
        id: string
        student_id: string
        full_name: string
        relationship: string
        phone_number: string
        phone_type: 'cellphone' | 'home' | 'other'
        created_at: string
    }
}

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = { error: { message: string; code: string | number } }