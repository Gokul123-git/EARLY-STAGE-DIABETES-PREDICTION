# Wearable Data Import Reference

This document outlines what health metrics are imported from each wearable device and how they map to the diabetes risk assessment parameters.

## Wearable Device Comparison

| Metric | Fitbit | Google Fit | Apple Health |
|--------|--------|------------|--------------|
| Age | ❌ | ❌ | ❌ |
| BMI | ✅ | ❌ | ✅ |
| Blood Pressure (Systolic) | ✅ | ❌ | ✅ |
| Blood Pressure (Diastolic) | ✅ | ❌ | ✅ |
| Fasting Glucose | ❌ | ❌ | ❌ |
| Physical Activity | ✅ | ✅ | ✅ |
| Family History | ❌ | ❌ | ❌ |
| Heart Rate | ✅ | ✅ | ✅ |
| Steps | ✅ | ✅ | ✅ |

## Fitbit

### Available Metrics
- **BMI** - Calculated from weight and height profiles
- **Blood Pressure** - From connected BP monitors or manual entry
- **Physical Activity** - Calculated from active minutes
- **Heart Rate** - Continuous heart rate monitoring
- **Steps** - Daily step count

### What You'll Need to Enter Manually
- Age
- Fasting Glucose (requires lab test)
- Family History

### API Endpoints (Production)
```
GET /1/user/-/profile.json - User profile (BMI)
GET /1/user/-/activities/heart/date/today/1d.json - Heart rate
GET /1/user/-/activities/steps/date/today/1d.json - Steps
GET /1/user/-/bp/date/today.json - Blood pressure
```

### OAuth Scopes Required
- `activity`
- `heartrate`
- `profile`
- `weight`

## Google Fit

### Available Metrics
- **Physical Activity** - Active minutes per week
- **Heart Rate** - Average heart rate
- **Steps** - Daily step count

### What You'll Need to Enter Manually
- Age
- BMI
- Blood Pressure
- Fasting Glucose
- Family History

### API Endpoints (Production)
```
GET /fitness/v1/users/me/dataset:aggregate - Activity data
GET /fitness/v1/users/me/dataSources - Available data sources
```

### OAuth Scopes Required
- `https://www.googleapis.com/auth/fitness.activity.read`
- `https://www.googleapis.com/auth/fitness.heart_rate.read`

## Apple Health

### Available Metrics
- **BMI** - From Health app body measurements
- **Blood Pressure** - From connected devices or manual entry
- **Physical Activity** - Active energy and exercise time
- **Heart Rate** - Continuous monitoring (Apple Watch required)
- **Steps** - Daily step count

### What You'll Need to Enter Manually
- Age (can be inferred from date of birth if shared)
- Fasting Glucose (requires lab test or continuous glucose monitor)
- Family History

### HealthKit Types (iOS)
```swift
HKQuantityType.bodyMassIndex() // BMI
HKQuantityType.bloodPressureSystolic() // Systolic BP
HKQuantityType.bloodPressureDiastolic() // Diastolic BP
HKQuantityType.activeEnergyBurned() // Activity
HKQuantityType.heartRate() // Heart rate
HKQuantityType.stepCount() // Steps
```

### Notes
- Requires native iOS app (HealthKit not available in web)
- User must grant specific permissions for each data type
- Data stays on device until explicitly shared

## Mock Data (Demo Mode)

The current implementation uses these simulated values:

### Fitbit Mock Data
```javascript
{
  bmi: 26.3,
  bloodPressureSystolic: 128,
  bloodPressureDiastolic: 82,
  physicalActivity: 4.5, // hours/week
  heartRate: 72,
  steps: 8420
}
```

### Google Fit Mock Data
```javascript
{
  physicalActivity: 5.2, // hours/week
  heartRate: 68,
  steps: 9850
}
```

### Apple Health Mock Data
```javascript
{
  bmi: 24.8,
  bloodPressureSystolic: 118,
  bloodPressureDiastolic: 76,
  physicalActivity: 6.0, // hours/week
  heartRate: 65,
  steps: 11200
}
```

## Activity Calculation

Different devices measure activity differently. Here's how we convert to "hours per week":

### Fitbit
- Uses "active minutes" (moderate to vigorous activity)
- Conversion: `active_minutes_per_day * 7 / 60 = hours/week`

### Google Fit
- Uses "move minutes" and "heart points"
- Conversion: `move_minutes_per_day * 7 / 60 = hours/week`

### Apple Health
- Uses "exercise minutes" and "active energy"
- Conversion: `exercise_minutes_per_day * 7 / 60 = hours/week`

## Data Freshness

| Device | Sync Frequency | Last Sync Available |
|--------|----------------|---------------------|
| Fitbit | Every 15-30 min | ✅ Yes |
| Google Fit | Real-time to hourly | ✅ Yes |
| Apple Health | When app opens | ✅ Yes |

## Production Implementation Checklist

### Fitbit
- [ ] Register app at https://dev.fitbit.com
- [ ] Obtain Client ID and Client Secret
- [ ] Implement OAuth 2.0 flow
- [ ] Request appropriate scopes
- [ ] Handle token refresh (8 hour expiry)
- [ ] Store tokens securely
- [ ] Implement webhook for automatic sync

### Google Fit
- [ ] Create project in Google Cloud Console
- [ ] Enable Fitness API
- [ ] Configure OAuth consent screen
- [ ] Obtain OAuth client credentials
- [ ] Implement OAuth 2.0 flow
- [ ] Request Fitness API scopes
- [ ] Handle token refresh
- [ ] Implement data aggregation queries

### Apple Health
- [ ] Create iOS native app
- [ ] Add HealthKit capability
- [ ] Configure info.plist with usage descriptions
- [ ] Request specific data type permissions
- [ ] Implement HealthKit queries
- [ ] Create bridge to web app (deep linking or API)
- [ ] Handle privacy and user consent

## Limitations

### Current Demo
- No real OAuth authentication
- Uses simulated/mock data
- No actual API calls
- Connection state stored in localStorage only

### Wearable Devices
- **Glucose monitoring**: Most wearables don't measure blood glucose (except specific CGM devices)
- **Blood pressure**: Requires additional hardware (BP cuff) - not all users have
- **Age/Demographics**: Not typically stored in fitness apps
- **Medical history**: Never stored in consumer wearables

### Recommendations
For a production diabetes assessment tool:
1. **Combine sources**: Use wearables for activity + lab reports for clinical metrics
2. **Manual entry fallback**: Always allow manual entry for missing data
3. **Data validation**: Cross-check imported values for accuracy
4. **User review**: Show imported data for user verification before calculation
5. **Clinical grade**: Consider integrating with actual medical devices (FDA approved)

## Privacy Considerations

### Data Access
- Only request minimum necessary scopes
- Clearly explain what data will be accessed
- Allow users to disconnect anytime
- Don't store sensitive health data without encryption

### Compliance
- **HIPAA**: Required if handling PHI in US healthcare context
- **GDPR**: Required for EU users
- **Apple HealthKit**: Must follow Apple's health data guidelines
- **Google Fit**: Must comply with Google API Services User Data Policy
- **Fitbit**: Must follow Fitbit Platform Terms of Service

### Best Practices
1. Process data client-side when possible
2. Use end-to-end encryption for any stored data
3. Provide clear privacy policy
4. Allow users to delete their data
5. Don't share health data with third parties
6. Implement audit logging
7. Regular security assessments

## Support & Resources

### Official Documentation
- [Fitbit Web API](https://dev.fitbit.com/build/reference/web-api/)
- [Google Fit REST API](https://developers.google.com/fit/rest)
- [Apple HealthKit](https://developer.apple.com/documentation/healthkit)

### OAuth Libraries
- [oauth-pkce](https://www.npmjs.com/package/oauth-pkce) - PKCE flow for SPAs
- [react-oauth](https://www.npmjs.com/package/@react-oauth/google) - Google OAuth
- [passport](http://www.passportjs.org/) - Node.js OAuth strategies

### Health Data Standards
- [HL7 FHIR](https://www.hl7.org/fhir/) - Healthcare data exchange
- [IEEE 11073](https://standards.ieee.org/standard/11073-10101-2019.html) - Medical device communication
- [LOINC](https://loinc.org/) - Laboratory test codes
