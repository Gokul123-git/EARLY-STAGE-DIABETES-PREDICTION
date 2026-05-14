# Supabase Setup Guide

## Database Schema

Run this SQL in your Supabase SQL Editor to create the assessments table:

```sql
-- Create assessments table
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Personal Info
  age INTEGER NOT NULL,
  
  -- Physical Measurements
  bmi DECIMAL(5,2) NOT NULL,
  physical_activity DECIMAL(5,2) NOT NULL,
  
  -- Cardiovascular Metrics
  blood_pressure_systolic INTEGER NOT NULL,
  blood_pressure_diastolic INTEGER NOT NULL,
  
  -- Metabolic & Risk Factors
  fasting_glucose INTEGER NOT NULL,
  family_history BOOLEAN NOT NULL,
  
  -- Risk Assessment Results
  risk_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_assessments_created_at ON assessments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only read their own assessments
CREATE POLICY "Users can view their own assessments"
  ON assessments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own assessments
CREATE POLICY "Users can insert their own assessments"
  ON assessments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own assessments
CREATE POLICY "Users can delete their own assessments"
  ON assessments
  FOR DELETE
  USING (auth.uid() = user_id);
```

## Environment Variables

Add these to your project's environment variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

## Authentication Setup

1. In your Supabase dashboard, go to Authentication > Providers
2. Enable Email provider
3. Configure email templates if desired
4. Optionally disable email confirmation for development

## Testing the Integration

1. Sign up for a new account
2. Complete an assessment
3. Click "Save to History"
4. Navigate to the History tab to see your saved assessments
5. Complete multiple assessments to see the trend chart

## Security Notes

- Row Level Security (RLS) is enabled to ensure users can only access their own data
- The anon key is safe to use in client-side code
- Never expose your service_role key in the frontend

## Data Import Feature

The app now supports importing health data from multiple sources:

### Wearable Devices
- **Fitbit**: Imports BMI, blood pressure, and physical activity data
- **Google Fit**: Imports physical activity and heart rate data
- **Apple Health**: Imports comprehensive health metrics

**Note**: The wearable integration is currently a demo/mock implementation. For production use, you'll need to:
1. Register your app with each provider's developer portal
2. Obtain OAuth credentials
3. Implement the OAuth flow in `lib/wearableApi.ts`
4. Handle token refresh and data syncing

### Medical Report Upload
Users can upload health data in two formats:

#### CSV Format
Download the template from the app or use this structure:
```csv
Parameter,Value,Unit
Age,45,years
BMI,26.5,kg/m²
Fasting Blood Glucose,102,mg/dL
Blood Pressure Systolic,128,mmHg
Blood Pressure Diastolic,82,mmHg
Physical Activity,4.5,hours/week
Family History Diabetes,Yes,boolean
```

#### PDF Format (Lab Reports)
The app can extract data from PDF lab reports. For production use:
- Integrate an OCR service like Tesseract.js or Google Cloud Vision API
- Implement text extraction in `lib/dataParser.ts`
- Add pattern matching for common lab report formats

### Privacy & Security
- All data parsing happens client-side (no data sent to external servers)
- Imported data is validated before being used
- Files are processed in-memory and not stored
- This tool is not intended for collecting PII or sensitive medical data in production
