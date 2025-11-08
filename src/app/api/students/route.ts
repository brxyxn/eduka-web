import { NextResponse } from 'next/server'
import { createStudentEnrollment } from '@/lib/api/students'
import { StudentEnrollmentSchema } from '@/lib/validations/student'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const parse = StudentEnrollmentSchema.safeParse(body)
        if (!parse.success) {
            return NextResponse.json({ success: false, error: 'Validation failed', issues: parse.error.format() }, { status: 400 })
        }

        const result = await createStudentEnrollment(parse.data)

        if (!result.success) {
            return NextResponse.json({ success: false, error: result.error }, { status: 500 })
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 201 })
    } catch (err) {
        console.error('API /api/students error', err)
        return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 })
    }
}
