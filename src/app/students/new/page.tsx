"use client"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, Users, HomeIcon, Phone } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { createStudentEnrollment } from "@/lib/api/students"
import { StudentEnrollmentSchema } from "@/lib/validations/student"
import { toast } from "sonner"
import * as z from "zod"

const phoneTypes = [
    { label: "Cellphone", value: "cellphone" },
    { label: "Home", value: "home" },
    { label: "Other", value: "other" },
] as const

const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
] as const

// This will need to be fetched from an API
const states = [
    { label: "Guatemala", value: "guatemala" },
    { label: "Sacatepequez", value: "sacatepequez" },
] as const

const cities = [
    { label: "Guatemala City", value: "guatemala-city" },
    { label: "Antigua Guatemala", value: "antigua-guatemala" },
] as const



export default function NewStudentEnrollmentPage() {
    const form = useForm<z.infer<typeof StudentEnrollmentSchema>>({
        resolver: zodResolver(StudentEnrollmentSchema),
        defaultValues: {
            guardians: [
                {
                    fullName: "",
                    cui: "",
                    dateOfBirth: undefined,
                    email: "",
                    phones: [{ number: "", type: "cellphone" }],
                    relationToStudent: "",
                    isPrimaryGuardian: false,
                },
            ],
            emergencyContacts: [
                {
                    fullName: "",
                    relationship: "",
                    phone: { number: "", type: "cellphone" },
                },
            ],
        },
    })

    const router = useRouter()

    async function onSubmit(data: z.infer<typeof StudentEnrollmentSchema>) {
        try {
            const result = await createStudentEnrollment(data)

            if (!result.success) {
                toast.error("Failed to enroll student", {
                    description: result.error
                })
                return
            }

            toast.success("Student enrolled successfully")
            router.push("/students")
        } catch (error) {
            toast.error("An error occurred", {
                description: error instanceof Error ? error.message : "Please try again"
            })
        }
    }

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <GraduationCap className="h-6 w-6" />
                        New Student Enrollment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Student Personal Information */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <h3 className="text-xl font-semibold">Student Personal Information</h3>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="middleName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Middle Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="cui"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CUI</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="dateOfBirth"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date of Birth</FormLabel>
                                                    <FormControl>
                                                        <DatePicker
                                                            date={field.value ?? undefined}
                                                            onSelect={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                                        <FormField
                                            control={form.control}
                                            name="nationality"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nationality</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel>Gender</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="grid grid-cols-3 gap-2"
                                                        >
                                                            {genders.map((gender) => (
                                                                <div key={gender.value} className="min-w-0">
                                                                    <RadioGroupItem
                                                                        value={gender.value}
                                                                        id={`gender-${gender.value}`}
                                                                        className="peer sr-only"
                                                                    />
                                                                    <FormLabel
                                                                        htmlFor={`gender-${gender.value}`}
                                                                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover h-9 px-3 text-xs hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer leading-none"
                                                                    >
                                                                        <span className="font-medium truncate">{gender.label}</span>
                                                                    </FormLabel>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Guardian Information */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Users className="h-5 w-5 text-primary" />
                                    <h3 className="text-xl font-semibold">Guardian Information</h3>
                                </div>
                                <div className="space-y-4">
                                    {form.watch("guardians")?.map((_, index) => (
                                        <Card key={`guardian-${index}`}>
                                            <CardContent className="pt-6">
                                                <div className="grid gap-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`guardians.${index}.fullName`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Full Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`guardians.${index}.cui`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>CUI</FormLabel>
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`guardians.${index}.dateOfBirth`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Date of Birth</FormLabel>
                                                                    <FormControl>
                                                                        <DatePicker
                                                                            date={field.value ?? undefined}
                                                                            onSelect={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`guardians.${index}.email`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Email</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="email" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`guardians.${index}.relationToStudent`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Relation to Student</FormLabel>
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`guardians.${index}.isPrimaryGuardian`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <div className="flex items-center space-x-2 p-4 rounded-lg border bg-muted/50">
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value}
                                                                                onCheckedChange={(checked) => {
                                                                                    // Uncheck all other primary guardians
                                                                                    if (checked) {
                                                                                        const guardians = form.getValues("guardians")
                                                                                        for (const [i, _] of guardians.entries()) {
                                                                                            if (i !== index) {
                                                                                                form.setValue(
                                                                                                    `guardians.${i}.isPrimaryGuardian`,
                                                                                                    false
                                                                                                )
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    field.onChange(checked)
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <div className="grid gap-1.5 leading-none">
                                                                            <FormLabel className="text-sm font-medium leading-none">
                                                                                Primary Guardian
                                                                            </FormLabel>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                This person will be the main contact for school communications
                                                                            </p>
                                                                        </div>
                                                                        <FormMessage />
                                                                    </div>
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <Separator className="my-4" />

                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4 text-primary" />
                                                                <h4 className="font-semibold">Contact Numbers</h4>
                                                            </div>

                                                            {form.watch(`guardians.${index}.phones`)?.map((_, phoneIndex) => (
                                                                <div key={`phone-${index}-${phoneIndex}`}
                                                                    className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-2">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`guardians.${index}.phones.${phoneIndex}.number`}
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex-1">
                                                                                <FormLabel className={phoneIndex > 0 ? "sr-only" : ""}>
                                                                                    Phone Number
                                                                                </FormLabel>
                                                                                <FormControl>
                                                                                    <Input {...field} placeholder="Enter phone number" className="w-full" />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />

                                                                    <div className="flex items-center gap-2 w-full">
                                                                        <FormField
                                                                            control={form.control}
                                                                            name={`guardians.${index}.phones.${phoneIndex}.type`}
                                                                            render={({ field }) => (
                                                                                <FormItem className="flex-1">
                                                                                    <FormLabel className={phoneIndex > 0 ? "sr-only" : ""}>
                                                                                        Type
                                                                                    </FormLabel>
                                                                                    <Select
                                                                                        onValueChange={field.onChange}
                                                                                        defaultValue={field.value}
                                                                                    >
                                                                                        <FormControl>
                                                                                            <SelectTrigger>
                                                                                                <SelectValue placeholder="Select type" />
                                                                                            </SelectTrigger>
                                                                                        </FormControl>
                                                                                        <SelectContent>
                                                                                            {phoneTypes.map((type) => (
                                                                                                <SelectItem key={type.value} value={type.value}>
                                                                                                    {type.label}
                                                                                                </SelectItem>
                                                                                            ))}
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                        {phoneIndex > 0 ? (
                                                                            <Button
                                                                                type="button"
                                                                                variant="destructive"
                                                                                size="icon"
                                                                                className="ml-0"
                                                                                onClick={() => {
                                                                                    const phones = form.getValues(
                                                                                        `guardians.${index}.phones`
                                                                                    )
                                                                                    form.setValue(
                                                                                        `guardians.${index}.phones`,
                                                                                        phones.filter((_, i) => i !== phoneIndex)
                                                                                    )
                                                                                }}
                                                                            >
                                                                                ×
                                                                            </Button>
                                                                        ) : (
                                                                            <span className="w-10" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                size="sm"
                                                                onClick={() => {
                                                                    const phones = form.getValues(`guardians.${index}.phones`)
                                                                    form.setValue(`guardians.${index}.phones`, [
                                                                        ...phones,
                                                                        { number: "", type: "cellphone" },
                                                                    ])
                                                                }}
                                                            >
                                                                Add Phone Number
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}

                                    {form.watch("guardians")?.length < 3 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                const guardians = form.getValues("guardians")
                                                form.setValue("guardians", [
                                                    ...guardians,
                                                    {
                                                        fullName: "",
                                                        cui: "",
                                                        dateOfBirth: null,
                                                        email: "",
                                                        phones: [{ number: "", type: "cellphone" }],
                                                        relationToStudent: "",
                                                        isPrimaryGuardian: false,
                                                    },
                                                ])
                                            }}
                                        >
                                            Add Guardian
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Address Information */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <HomeIcon className="h-5 w-5 text-primary" />
                                    <h3 className="text-xl font-semibold">Address Information</h3>
                                </div>
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="addressLine1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address Line 1</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="addressLine2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address Line 2</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="zone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Zone</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(Number.parseInt(e.target.value, 10))
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select state" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {states.map((state) => (
                                                                <SelectItem key={state.value} value={state.value}>
                                                                    {state.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select city" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {cities.map((city) => (
                                                                <SelectItem key={city.value} value={city.value}>
                                                                    {city.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Emergency Contacts */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <h3 className="text-xl font-semibold">Emergency Contacts</h3>
                                </div>
                                <div className="space-y-4">
                                    {form.watch("emergencyContacts")?.map((_, index) => (
                                        <Card key={`emergency-contact-${index}`}>
                                            <CardContent className="pt-6">
                                                <div className="grid gap-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`emergencyContacts.${index}.fullName`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Full Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`emergencyContacts.${index}.relationship`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Relationship</FormLabel>
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`emergencyContacts.${index}.phone.number`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Phone Number</FormLabel>
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`emergencyContacts.${index}.phone.type`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Phone Type</FormLabel>
                                                                    <Select
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                    >
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select type" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            {phoneTypes.map((type) => (
                                                                                <SelectItem key={type.value} value={type.value}>
                                                                                    {type.label}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="mt-4"
                                                        onClick={() => {
                                                            const contacts = form.getValues("emergencyContacts")
                                                            form.setValue(
                                                                "emergencyContacts",
                                                                contacts.filter((_, i) => i !== index)
                                                            )
                                                        }}
                                                    >
                                                        Remove Contact
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            const contacts = form.getValues("emergencyContacts")
                                            form.setValue("emergencyContacts", [
                                                ...contacts,
                                                {
                                                    fullName: "",
                                                    relationship: "",
                                                    phone: { number: "", type: "cellphone" },
                                                },
                                            ])
                                        }}
                                    >
                                        Add Emergency Contact
                                    </Button>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="flex justify-end gap-4 mt-6">
                                <Button type="button" variant="outline" className="w-32">
                                    Save as Draft
                                </Button>
                                <Button type="submit" className="w-32">
                                    Enroll Student
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}