# Data Import Guide

The DiabetesAI Risk Assessment app supports automatic health data import from wearable devices and medical reports, making it easy for users to complete assessments without manual data entry.

## Features

### 🔗 Wearable Device Integration
Connect your fitness trackers and health apps to automatically import metrics:

- **Fitbit** - BMI, blood pressure, physical activity, heart rate, steps
- **Google Fit** - Physical activity, heart rate, steps  
- **Apple Health** - Comprehensive health metrics including BMI, blood pressure, and activity

### 📄 Medical Report Upload
Upload lab reports and health records in standard formats:

- **CSV Files** - Structured health data exports
- **PDF Reports** - Laboratory test results (with text extraction)

### ✅ Automatic Data Extraction
The system automatically identifies and extracts:
- Age
- BMI (Body Mass Index)
- Fasting Blood Glucose levels
- Blood Pressure (Systolic & Diastolic)
- Physical Activity levels
- Family History of Diabetes

## How to Use

### Method 1: Connect Wearable Device

1. Click **"Import Data"** button on the assessment page
2. Select the **"Wearables"** tab
3. Choose your device (Fitbit, Google Fit, or Apple Health)
4. Click **"Connect"** and authorize access
5. Review the imported data
6. Click **"Import to Form"** to auto-fill the assessment

**Note**: Current implementation is a demo. Production deployment requires OAuth setup for each provider.

### Method 2: Upload CSV File

1. Click **"Import Data"** button
2. Select the **"Upload Reports"** tab
3. Download the CSV template (optional)
4. Prepare your CSV file with health metrics
5. Click **"Select File"** or drag and drop
6. Review extracted data
7. Click **"Import to Form"**

#### CSV Format Example

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

#### Supported CSV Formats

**Simple Key-Value:**
```csv
Parameter,Value
Age,45
BMI,26.5
Glucose,102
Blood Pressure,128/82
```

**Lab Report Style:**
```csv
Test Name,Result,Unit,Reference Range
Patient Age,45,years,N/A
Body Mass Index,26.5,kg/m²,18.5-24.9
Fasting Plasma Glucose,102,mg/dL,70-99
Systolic Blood Pressure,128,mmHg,<120
Diastolic Blood Pressure,82,mmHg,<80
```

### Method 3: Upload PDF Report

1. Click **"Import Data"** button
2. Select the **"Upload Reports"** tab  
3. Upload your PDF lab report
4. Wait for text extraction and parsing
5. Review extracted metrics
6. Click **"Import to Form"**

**Requirements:**
- Text-based PDF (not scanned images)
- Standard medical terminology
- Clear numerical values with units
- Maximum file size: 10MB

## Supported Parameters

The data parser recognizes these parameter names (case-insensitive):

| Parameter | Recognized Names |
|-----------|-----------------|
| **Age** | age, patient age, years |
| **BMI** | bmi, body mass index |
| **Glucose** | glucose, fasting glucose, fasting blood glucose, FPG |
| **Blood Pressure (Systolic)** | systolic, bp systolic, sbp, blood pressure systolic |
| **Blood Pressure (Diastolic)** | diastolic, bp diastolic, dbp, blood pressure diastolic |
| **Blood Pressure (Combined)** | blood pressure (format: 120/80) |
| **Physical Activity** | physical activity, exercise, activity level |
| **Family History** | family history, family history diabetes |

## Data Validation

All imported data is automatically validated:

- **Age**: 0-120 years
- **BMI**: 10-60 kg/m²
- **Glucose**: 40-400 mg/dL
- **Blood Pressure**: Systolic 70-250 mmHg, Diastolic 40-150 mmHg
- **Physical Activity**: 0-50 hours/week

Invalid or out-of-range values are filtered out.

## Privacy & Security

✅ **Client-Side Processing**: All file parsing happens in your browser  
✅ **No Server Upload**: Files are not sent to any server  
✅ **No Data Storage**: Imported data is only stored locally in memory  
✅ **Validated Input**: All data is sanitized and validated before use  

⚠️ **Important**: This tool is for educational/demo purposes. Do not use for production healthcare data without proper security measures and compliance certifications (HIPAA, GDPR, etc.).

## Technical Implementation

### Wearable API (`/lib/wearableApi.ts`)
- Mock OAuth flow for demonstration
- Simulates API calls to Fitbit, Google Fit, Apple Health
- Returns sample health data

**For Production:**
1. Register app with each provider
2. Obtain OAuth client credentials
3. Implement real OAuth flow
4. Handle token storage and refresh
5. Make authenticated API calls

### Data Parser (`/lib/dataParser.ts`)
- Parses CSV using pattern matching
- Extracts text from PDF (mock implementation)
- Validates and normalizes health metrics
- Generates downloadable CSV template

**For Production PDF Parsing:**
- Use `pdf.js` for text extraction
- Implement OCR with Tesseract.js or Google Cloud Vision
- Add NLP for better parameter recognition
- Support multiple languages

### Import Modal (`/components/DataImportModal.tsx`)
- Tabbed interface for wearables vs uploads
- Real-time upload progress
- Data preview before import
- Toast notifications for user feedback

## Use Cases

### For Individuals
- Quick health check using wearable data
- Track risk progression over time
- Import annual physical exam results

### For Clinics
- Streamline patient onboarding
- Import lab results directly
- Reduce data entry errors
- Save staff time

### For Wellness Programs
- Integrate with corporate health platforms
- Batch import employee health data
- Track program effectiveness

## Troubleshooting

**Wearable won't connect:**
- Check if provider is supported
- Clear browser cache and try again
- (Production) Verify OAuth credentials

**CSV parsing fails:**
- Ensure correct format (comma-separated)
- Check parameter names match supported list
- Verify numerical values are valid
- Use UTF-8 encoding

**PDF parsing fails:**
- Ensure PDF contains text (not scanned image)
- Check file size < 10MB
- Verify medical terminology is standard
- (Production) Implement OCR for image-based PDFs

**Data not imported:**
- Review validation requirements
- Check console for parsing errors
- Ensure at least one valid parameter present

## Future Enhancements

- [ ] Real OAuth integration with wearable providers
- [ ] Advanced OCR for scanned PDF documents
- [ ] Support for HL7 FHIR health records
- [ ] Integration with EHR systems
- [ ] Multi-language support
- [ ] Batch import for multiple patients
- [ ] AI-powered data extraction
- [ ] Support for more file formats (JSON, XML)

## Related Files

- `/lib/wearableApi.ts` - Wearable device integration
- `/lib/dataParser.ts` - CSV and PDF parsing logic
- `/components/DataImportModal.tsx` - Import UI component
- `/components/AssessmentForm.tsx` - Form with import support
- `/public/sample_health_data.csv` - Sample CSV template

## Support

For questions or issues with data import:
1. Check this guide for troubleshooting steps
2. Review sample CSV format
3. Verify your data meets validation requirements
4. Check browser console for detailed error messages
