---
title: "Fixing "Unauthorized Access" Issue on Kit Import"
description: "How to fix unauthorized access errors when importing kits in WDesignKit."
---

# Fixing "Unauthorized Access" Issue on Kit Import

## Overview

When you encounter an **"Unauthorized Access"** error on your website during scrolling or pop-up triggering, this typically indicates the **Popup Builder widget lacks an assigned template**. Since pop-up content loads from saved templates, the widget cannot display properly without one.

---

## Step 1: Understand the Cause

The error occurs when the Popup Builder widget is missing its connected template.

**Common reasons include:**
- The Popup Builder widget exists on the page
- No template is selected in widget settings
- The pop-up cannot locate the assigned template

---

## Step 2: Identify the Page Showing the Error

1. Visit your imported kit website on the frontend
2. Scroll or perform actions triggering the pop-up
3. Note the page displaying the "Unauthorized Access" pop-up
4. Check if the issue appears on multiple pages, especially with imported page kits

---

## Step 3: Check Pages for Popup Builder Widget

1. Go to your WordPress Dashboard
2. Navigate to **Pages**
3. Open the affected page
4. Click **Edit with Elementor**
5. Look for the Popup Builder widget in the layout
6. Review other pages if the issue appears on multiple locations

---

## Step 4: Assign Template in Popup Builder Settings

1. Click the **Popup Builder widget**
2. Open the **Content** settings panel
3. Locate the **Content Type** option
4. Set content type to **Template** (if not selected)
5. In the **Select Content** dropdown, choose your pop-up template

> **Important:** Select templates labeled **(container)** when using pop-up layouts. Container templates are designed specifically for pop-up content.
>
> ✅ Correct: Newsletter Popup | LuxeWear **(container)**
> ❌ Incorrect: Product Template Design | LuxeWear **(page)**

---

## Step 5: Update the Page

1. Click **Publish** to save the page
2. Click **View Page** to open the site frontend
3. Trigger the pop-up again

**Expected results:**
- The "Unauthorized Access" error disappears
- The pop-up displays normally
- Pop-up content loads correctly

**If the issue persists:**
- Verify the Popup Builder widget has a template selected
- Confirm the template is a container template
- Review all pages containing Popup Builder widgets
- Update the page after making changes
