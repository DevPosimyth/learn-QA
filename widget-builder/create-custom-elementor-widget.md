# How to Create Custom Elementor Widget Using Free WDesignKit Widget Builder

## Overview

The WDesignKit Widget Builder enables users to design custom Elementor widgets tailored to specific needs. This process applies similarly to Gutenberg and Bricks page builders.

## Required Setup

- Elementor FREE Plugin installed and activated
- WDesignKit plugin installed and activated

---

## How to Create a Widget

### Step 1: Navigate to Widget Builder

1. Go to **WDesignKit** from the WordPress dashboard
2. Select **Widgets > My Widgets**
3. Click the **Create Widget** button

### Step 2: Widget Setup Configuration

In the popup dialog, fill in:

- **Page Builder** — Select Elementor (or Gutenberg/Bricks)
- **Widget Name** — Enter your widget's name
- **Featured Image** — Optional image for the widget listing
- **Widget Icon** — Add an icon from E-icons or Font Awesome libraries

> **Note:** E-icons library is recommended. Font Awesome 4/5 require manual library loading.

---

## Widget Builder Editor Interface

The editor contains three main columns:

### 1. Code Editor Panel (Three Tabs)

- **HTML** — Widget HTML code and control options
- **CSS** — Styling specific to the widget
- **JS** — Custom interactivity and widget-specific JavaScript

### 2. Layout Panel (Center)

Two tabs:
- **Layout** — Layout-related controls
- **Style** — Style-related controls

Drag controls from the Controller panel, create sections, and rename/rearrange as needed.

### 3. Controller Panel

Available control types:

#### Data Controls

| Control | Description |
|---|---|
| **Text** | Text input field with label, placeholder, dynamic tags support |
| **Number** | Number input with min/max and step settings |
| **Textarea** | Multi-line text input |
| **WYSIWYG** | Visual rich content editor |
| **Code** | Code editor (HTML, CSS, JS) |
| **Hidden** | Invisible field for passing values |
| **Switcher** | Toggle on/off control |
| **Popover** | Controls grouped in a popup |
| **Select** | Dropdown with customizable options |
| **Select2** | Multi-select dropdown |
| **Choose** | Alignment and predefined styling control |
| **Color** | Color picker with alpha and global color support |
| **DateTime** | Date and time picker |
| **Gallery** | Multi-image gallery control |
| **Repeater** | Repeatable group of controls |

#### Dynamic Controls

- **Post Listing** — Display posts with filtering and sorting
- **Select Template** — Choose from Elementor templates
- **Product Listing** — Display products with customization
- **Taxonomy** — Select taxonomy types and post limits

#### Unit Controls

- **Slider** — Draggable range with unit support
- **Dimension** — Four-value input (padding, margin, borders)
- **NormalHover** — Tab control for styling different element states

#### Group Controls

- **Typography** — Text styling options
- **TextShadow** — Text shadow management
- **BoxShadow** — Box shadow styling
- **Border** — Border customization
- **Background** — Background styling
- **CSS Filter** — CSS filter effects

---

## Adding Controls to the Editor

1. Drag and drop a control from the Controller panel to the Layout panel
2. The control's unique name appears in the HTML tab's right sidebar
3. Position your cursor in HTML where you want the control value
4. Click the control's unique name to insert it

---

## Implementation Example (Profile Card)

1. Navigate to **WDesignKit** and click **Add Widget**
2. Enter widget name, select Elementor, add icon
3. Copy HTML to the **HTML** tab (exclude DOCTYPE, html, head, body tags)
4. Copy CSS to the **CSS** tab (exclude global styles like body, *)
5. Add JavaScript to the **JS** tab
6. View the layout in the **Live Preview** panel

### Adding Dynamic Controls Based on Your Layout

- Add **Media** control for images
- Add **Text** controls for titles, subtitles, and button text
- Add **URL** control for button links
- Add style controls with selectors for background, typography, etc.

---

## Saving and Publishing

### Save the Widget

Click **Save** at the top, or use the **Publish** dropdown to save as draft.

### Edit Widget Information

Click the **Settings** icon to update:
- Widget name and description
- Widget category
- Keywords for searchability in the Elementor panel
- Help link for user guidance

### Push to Public Library

Use the **Push** button to upload your widget to the WDesignKit public library for other users.

---

## Final Steps

1. Click **Save** to finalize
2. Open an Elementor page or post
3. Search for your widget by name
4. Drag and drop onto the page
5. Configure options in the widget panel
