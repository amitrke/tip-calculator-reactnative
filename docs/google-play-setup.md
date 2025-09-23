# Google Play Store API Setup Guide

## Prerequisites
- Google Play Console account with admin access
- Your app published or ready for publishing on Google Play

## Step 1: Create Google Cloud Project & Service Account

### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Play Android Developer API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Play Android Developer API"
   - Click "Enable"

### 1.2 Create Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Fill in details:
   - Name: `fastlane-service-account`
   - Description: `Service account for Fastlane Google Play Store uploads`
4. Click "Create and Continue"
5. Skip role assignment for now
6. Click "Done"

### 1.3 Create JSON Key
1. Find your service account in the list
2. Click on it > "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Download the JSON file (keep it secure!)

## Step 2: Grant Permissions in Google Play Console

### 2.1 Add Service Account to Play Console
1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your app
3. Go to "Users and permissions" (left sidebar)
4. Click "Invite new users"
5. Enter your service account email (from JSON file)
6. Grant these permissions:
   - ✅ View app information and download bulk reports (read-only)
   - ✅ Manage store presence
   - ✅ Manage production releases
   - ✅ Manage testing tracks
7. Click "Send Invitation"

### 2.2 Accept Invitation
1. The service account will receive an email invitation
2. Accept it (this is automatic for service accounts)

## Step 3: Set Up Environment Variables

### 3.1 Store JSON Key Securely
```bash
# Create a secure directory for keys
mkdir -p ~/.fastlane/keys

# Move your JSON key file there
mv ~/Downloads/your-service-account-key.json ~/.fastlane/keys/play-store-key.json

# Set proper permissions
chmod 600 ~/.fastlane/keys/play-store-key.json
```

### 3.2 Set Environment Variable
```bash
# Add to your ~/.zshrc or ~/.bashrc
echo 'export GOOGLE_PLAY_JSON_KEY_FILE=~/.fastlane/keys/play-store-key.json' >> ~/.zshrc

# Reload shell
source ~/.zshrc
```

### 3.3 Verify Setup
```bash
# Check environment variable
echo $GOOGLE_PLAY_JSON_KEY_FILE

# Test Fastlane connection
fastlane run validate_play_store_json_key json_key:~/path/to/your/key.json
```

## Step 4: Test Fastlane Setup

### 4.1 Test Screenshot Upload
```bash
# Upload only screenshots
fastlane android upload_screenshots
```

### 4.2 Test Full Upload
```bash
# Build, take screenshots, and upload everything
fastlane android build_and_upload
```

## Step 5: Organize Screenshots

### 5.1 Screenshot Structure
Google Play Store expects screenshots in specific folders:

```
maestro/screenshots/screenshots/
├── en-US/
│   ├── phoneScreenshots/
│   │   ├── calculator-empty.png
│   │   ├── calculator-bill-entered.png
│   │   └── ...
│   ├── sevenInchScreenshots/
│   └── tenInchScreenshots/
```

### 5.2 Organize Your Screenshots
```bash
# Create directory structure
mkdir -p maestro/screenshots/screenshots/en-US/phoneScreenshots

# Move screenshots to correct location
mv maestro/screenshots/screenshots/*.png maestro/screenshots/screenshots/en-US/phoneScreenshots/
```

## Troubleshooting

### Common Issues:

1. **"Invalid service account" error**
   - Check that the service account email is correct
   - Ensure the service account has been invited to Play Console
   - Wait 24-48 hours after inviting the service account

2. **"Permission denied" error**
   - Verify the service account has the correct permissions in Play Console
   - Check that the JSON key file path is correct

3. **"Package name not found" error**
   - Ensure your app is published or in draft status
   - Verify the package name matches exactly

4. **Screenshot upload issues**
   - Check screenshot dimensions (required: various sizes)
   - Ensure screenshots are in PNG format
   - Verify the directory structure matches Play Store requirements

### Debug Commands:
```bash
# Test JSON key validity
fastlane run validate_play_store_json_key

# Check app details
fastlane run get_google_play_store_app_details

# Verbose output
fastlane android upload_screenshots --verbose
```

## Security Best Practices

1. **Never commit JSON keys to git**
   - Add `*.json` to `.gitignore`
   - Store keys in secure location (`~/.fastlane/keys/`)

2. **Use environment variables**
   - Don't hardcode paths in Fastfile
   - Use `ENV["GOOGLE_PLAY_JSON_KEY_FILE"]`

3. **Limit permissions**
   - Only grant necessary permissions to service account
   - Regularly rotate service account keys

## Next Steps

Once setup is complete, you can:

1. **Upload screenshots only:**
   ```bash
   fastlane android upload_screenshots
   ```

2. **Upload APK + screenshots:**
   ```bash
   fastlane android upload_all
   ```

3. **Full automated workflow:**
   ```bash
   fastlane android build_and_upload
   ```

Your app screenshots will be uploaded to Google Play Store and ready for review!
