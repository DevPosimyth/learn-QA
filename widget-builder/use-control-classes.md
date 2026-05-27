---
title: "How to Use Control Classes to Style UI Elements"
description: "How to use control classes in the WDesignKit widget builder."
---

# How to Use Control Classes to Style UI Elements

## Overview

This feature enables customization of Elementor widget control appearance within the editor panel. You can apply custom styles to your controls, making them visually appealing in the Elementor editor widget panel.

**Requirement:** WDesignKit must be installed and activated. This feature targets advanced users requiring theme file editing.

---

## Step 1: Add a Custom Class to a Control

When adding any control in the Layout or Style tabs, locate the **Classes** field. Enter your custom class name here to target elements with CSS.

> **Important:** Do not include a period (dot) when adding the class name.

---

## Step 2: Add an Elementor Hook

Add this code to your child theme's `functions.php` file (or via a Code Snippets plugin):

```php
add_action( 'elementor/editor/after_enqueue_styles', function() {

    wp_enqueue_style(
        'script-unique-name',
        get_stylesheet_directory_uri() . '/file_name.css',
        [],
        time(),
        false
    );

} );
```

**Alternative methods:** Use the Code Snippets plugin or Nexter Builder if using the Nexter theme.

---

## Step 3: Apply Custom CSS

Add your custom styling rules to your child theme's `style.css` file. This will display unique styling for your custom widget controls in the Elementor widget panel.

---

## Related Resources

- How to Use the Choose Control to Set Predefined Styling Options
- How to Make the Widget CSS Unique to the Widget
