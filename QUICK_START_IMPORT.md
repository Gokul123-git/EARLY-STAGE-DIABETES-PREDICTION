# Quick Start: Data Import Feature

Get your diabetes risk assessment done in seconds by importing data from your devices or health records!

## 🚀 Fastest Method: Upload CSV

### Step 1: Download Template
1. Open the app
2. Click **"Import Data"**
3. Go to **"Upload Reports"** tab
4. Click **"Download"** to get the CSV template

### Step 2: Fill Template
Open the downloaded `health_data_template.csv` and fill in your values:

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

### Step 3: Upload & Import
1. Save your CSV file
2. Click **"Select File"** or drag and drop
3. Review the imported data
4. Click **"Import to Form"**
5. Click **"Calculate Risk"**

**Done!** ✅ Your risk assessment is complete.

---

## 📱 Easy Method: Connect Wearable

### For Fitbit Users
1. Click **"Import Data"**
2. Select **"Wearables"** tab
3. Click **"Connect"** under Fitbit
4. Review imported data (BMI, BP, Activity)
5. Click **"Import to Form"**
6. Fill in remaining fields (Age, Glucose, Family History)
7. Click **"Calculate Risk"**

### For Apple Watch Users
1. Click **"Import Data"**
2. Select **"Wearables"** tab
3. Click **"Connect"** under Apple Health
4. Review imported data
5. Click **"Import to Form"**
6. Fill in remaining fields
7. Click **"Calculate Risk"**

### For Google Fit Users
1. Click **"Import Data"**
2. Select **"Wearables"** tab
3. Click **"Connect"** under Google Fit
4. Review imported activity data
5. Click **"Import to Form"**
6. Fill in remaining fields
7. Click **"Calculate Risk"**

---

## 📄 Lab Report Method: Upload PDF

### From Your Doctor's Portal
1. Download your lab results as PDF
2. Click **"Import Data"**
3. Select **"Upload Reports"** tab
4. Upload your PDF file
5. Wait for automatic extraction
6. Review extracted values
7. Click **"Import to Form"**
8. Fill in any missing fields
9. Click **"Calculate Risk"**

**Supported PDFs:**
- Lab test results
- Annual physical reports
- Metabolic panel results
- Diabetes screening reports

**Requirements:**
- Text-based PDF (not scanned image)
- Standard medical terminology
- Clear numerical values

---

## 🎯 What Data Gets Imported?

### From Fitbit
✅ BMI  
✅ Blood Pressure  
✅ Physical Activity  
❌ Age (manual)  
❌ Glucose (manual)  
❌ Family History (manual)

### From Apple Health
✅ BMI  
✅ Blood Pressure  
✅ Physical Activity  
❌ Age (manual)  
❌ Glucose (manual)  
❌ Family History (manual)

### From Google Fit
✅ Physical Activity  
❌ BMI (manual)  
❌ Blood Pressure (manual)  
❌ Age (manual)  
❌ Glucose (manual)  
❌ Family History (manual)

### From CSV/PDF
✅ All fields (if present in file)

---

## 💡 Tips for Best Results

### Calculate Your BMI
If you don't know your BMI:
```
BMI = weight (kg) ÷ height (m)²
```

**Example:**
- Weight: 75 kg
- Height: 1.70 m
- BMI = 75 ÷ (1.70 × 1.70) = 26.0

**Quick reference:**
- Underweight: BMI < 18.5
- Normal: BMI 18.5-24.9
- Overweight: BMI 25-29.9
- Obese: BMI ≥ 30

### Get Your Glucose Tested
You'll need a **fasting blood glucose** test from:
- Annual physical exam
- Doctor's lab order
- Home glucose meter
- Hospital lab results

**Fasting means:**
- No food for 8-12 hours before test
- Usually done in the morning
- Water is okay

### Estimate Physical Activity
Count all moderate to vigorous exercise:
- Brisk walking
- Jogging/running
- Swimming
- Cycling
- Sports
- Gym workouts
- Dance classes
- Yard work

**Example:**
- Walk 30 min/day × 5 days = 2.5 hrs/week
- Gym 1 hour × 3 days = 3 hrs/week
- **Total: 5.5 hours/week**

### Family History Clarification
Answer "Yes" if:
- Parent (mother or father) has diabetes
- Sibling (brother or sister) has diabetes

Answer "No" if:
- Only distant relatives have diabetes
- You're unsure
- No known family history

---

## ⚠️ Troubleshooting

### "Failed to process file"
**Solution:**
- Check file format (CSV or PDF only)
- Ensure file size < 10MB
- Try downloading and using the template
- Check for special characters in your data

### "No data imported"
**Solution:**
- Verify parameter names in CSV match template
- Check numerical values are valid (no text in number fields)
- Ensure at least one parameter is present
- Try manual entry as fallback

### "Wearable won't connect"
**Current Demo:**
- Connection is simulated with mock data
- No real OAuth needed for demo
- Just click "Connect" to see sample import

**For Production:**
- Real OAuth setup required
- See WEARABLE_DATA_REFERENCE.md for details

### "Some fields still empty after import"
**This is normal!** Most data sources don't provide all fields.

**What to do:**
1. Review what was imported
2. Manually enter missing values
3. Click "Calculate Risk" when complete

---

## 📊 Sample Data for Testing

Want to test the feature? Use these values:

### Low Risk Profile
```
Age: 35
BMI: 22.5
Fasting Glucose: 88
Blood Pressure: 118/76
Physical Activity: 6
Family History: No
```

### Moderate Risk Profile
```
Age: 48
BMI: 27.5
Fasting Glucose: 105
Blood Pressure: 130/84
Physical Activity: 2
Family History: No
```

### High Risk Profile
```
Age: 58
BMI: 32.0
Fasting Glucose: 118
Blood Pressure: 142/92
Physical Activity: 0.5
Family History: Yes
```

---

## 🔐 Privacy & Security

### Your Data is Safe
✅ All processing happens in your browser  
✅ Files never uploaded to servers  
✅ No data stored externally  
✅ Wearable connections are secure (OAuth)

### What We Don't Do
❌ Store your health data  
❌ Share data with third parties  
❌ Use data for marketing  
❌ Require account creation (optional)

### Optional Features
- **Save to History**: Requires sign-in, stored securely in Supabase
- **Export Results**: Downloads to your device only
- **Share Results**: You control what to share with your doctor

---

## 🎓 Educational Purpose

**Important Disclaimer:**

This tool is for **educational and screening purposes only**. It is:
- ❌ NOT a medical diagnosis
- ❌ NOT a replacement for doctor visits
- ❌ NOT FDA approved
- ✅ A risk awareness tool
- ✅ A conversation starter with your doctor
- ✅ A way to track health trends

**Always consult a healthcare provider for:**
- Official diabetes screening
- Medical diagnosis
- Treatment plans
- Health advice

---

## 📞 Need Help?

### Common Questions

**Q: Do I need to import data?**  
A: No! Manual entry works perfectly fine. Import is just for convenience.

**Q: Can I import partial data?**  
A: Yes! Import what you have, fill in the rest manually.

**Q: Is my data private?**  
A: Yes! Processing is client-side. See privacy section above.

**Q: Can I use this at a clinic?**  
A: The demo is for personal use. For clinical use, see deployment guides.

**Q: What if I don't have all the data?**  
A: Import what you can. The form will show what's still needed.

### Documentation
- 📖 Full import guide: `DATA_IMPORT_GUIDE.md`
- 🔌 Wearable details: `WEARABLE_DATA_REFERENCE.md`
- 🗄️ Database setup: `SUPABASE_SETUP.md`

### Report Issues
- Check browser console for errors
- Verify file format matches template
- Try a different browser (Chrome recommended)
- Use manual entry as alternative

---

## ✨ That's It!

You're ready to use the data import feature. Choose the method that works best for you:

1. **Fastest**: Upload CSV template
2. **Easiest**: Connect wearable device
3. **Most accurate**: Upload lab report PDF
4. **Most flexible**: Manual entry (no import needed)

Happy assessing! 🎯
