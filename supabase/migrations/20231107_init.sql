CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    cui TEXT NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    nationality TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE guardians (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    cui TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    email TEXT NOT NULL,
    relation_to_student TEXT NOT NULL,
    is_primary_guardian BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE guardian_phones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    guardian_id UUID REFERENCES guardians(id) ON DELETE CASCADE,
    number TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('cellphone', 'home', 'other')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE addresses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    zone INTEGER NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE emergency_contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    phone_type TEXT NOT NULL CHECK (phone_type IN ('cellphone', 'home', 'other')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_students_cui ON students(cui);
CREATE INDEX idx_guardians_student_id ON guardians(student_id);
CREATE INDEX idx_guardian_phones_guardian_id ON guardian_phones(guardian_id);
CREATE INDEX idx_addresses_student_id ON addresses(student_id);
CREATE INDEX idx_emergency_contacts_student_id ON emergency_contacts(student_id);

-- Create RLS policies
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian_phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all access for authenticated users" ON students
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON guardians
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON guardian_phones
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON addresses
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON emergency_contacts
    FOR ALL USING (auth.role() = 'authenticated');