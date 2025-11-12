import * as z from 'zod'

const PhoneSchema = z.object({
    number: z.string().min(1, "Phone number is required"),
    type: z.enum(["cellphone", "home", "other"]),
})

const GuardianFormSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    personalId: z.string().min(1, "Personal ID is required"),
    dateOfBirth: z.date(),
    email: z.string().email("Invalid email address"),
    phones: z.array(PhoneSchema).min(1, "At least one phone number is required"),
    relationToStudent: z.string().min(1, "Relation is required"),
    isPrimaryGuardian: z.boolean(),
})

const EmergencyContactSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    phone: PhoneSchema,
})

export const StudentEnrollmentSchema = z.object({
    // Student Personal Information
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    personalId: z.string().min(1, "Personal ID is required"),
    dateOfBirth: z.date().nullable(),
    gender: z.enum(["male", "female", "other"]),
    nationality: z.string().min(1, "Nationality is required"),

    // Guardians Information (up to 3)
    guardians: z.array(
        GuardianFormSchema.extend({
            dateOfBirth: z.date().nullable(),
        })
    ).min(1).max(3),

    // Address Information
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z.string().optional(),
    zone: z.number().min(1, "Zone is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),

    // Emergency Contacts
    emergencyContacts: z.array(EmergencyContactSchema).min(1),
})
