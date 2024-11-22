import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from PIL import Image, ImageDraw, ImageFont, ImageTk
import os
import platform


def get_system_fonts():
    """Detect fonts from system directories."""
    font_paths = []
    if platform.system() == "Windows":
        # Common Windows font directories
        font_dirs = [
            os.path.join(os.environ["WINDIR"], "Fonts"),
            os.path.join(os.environ["LOCALAPPDATA"], "Microsoft", "Windows", "Fonts"),
            os.path.join(os.environ["APPDATA"], "Microsoft", "Windows", "Fonts"),
        ]
    elif platform.system() == "Darwin":  # macOS
        # Common macOS font directories
        font_dirs = ["/System/Library/Fonts", "/Library/Fonts", os.path.expanduser("~/Library/Fonts")]
    else:  # Linux/Unix
        # Common Linux font directories
        font_dirs = ["/usr/share/fonts", "/usr/local/share/fonts", os.path.expanduser("~/.fonts")]

    for font_dir in font_dirs:
        if os.path.exists(font_dir):
            for root, _, files in os.walk(font_dir):
                for file in files:
                    if file.lower().endswith((".ttf", ".otf")):
                        font_paths.append(os.path.join(root, file))

    return font_paths


def get_font_names(font_paths):
    """Extract the font names from font files."""
    font_names = []
    for font_path in font_paths:
        try:
            font = ImageFont.truetype(font_path, size=12)
            font_name = os.path.basename(font_path)
            font_names.append((font_name, font_path))
        except Exception as e:
            print(f"Failed to load font: {font_path} ({e})")  # Debugging output
    return font_names


def generate_image():
    # Clear any existing preview
    for widget in preview_frame.winfo_children():
        widget.destroy()

    # Get user inputs
    text = text_input.get()
    selected_font_name = font_dropdown.get()
    bg_color = bg_color_input.get()
    text_color = text_color_input.get()
    padding = int(padding_input.get())

    if not text or not selected_font_name or not bg_color or not text_color:
        messagebox.showerror("Error", "Please fill in all fields!")
        return

    try:
        # Get the full font path from the font name
        font_path = next(
            (path for name, path in font_list if name == selected_font_name), None
        )
        if not font_path:
            messagebox.showerror("Error", "Font not found!")
            return

        # Convert colors to RGB tuples
        bg_color_rgb = tuple(map(int, bg_color.split(',')))
        text_color_rgb = tuple(map(int, text_color.split(',')))

        # Load font
        font = ImageFont.truetype(font_path, 40)

        # Calculate the tight bounding box around the text
        temp_image = Image.new("RGB", (1, 1))
        temp_draw = ImageDraw.Draw(temp_image)
        text_bbox = temp_draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]

        # Create a tightly fitted image with padding
        image_width = text_width + 2 * padding
        image_height = text_height + 2 * padding
        global generated_image
        generated_image = Image.new("RGB", (image_width, image_height), bg_color_rgb)
        draw = ImageDraw.Draw(generated_image)

        # Draw the text with padding applied
        draw.text((padding, padding - text_bbox[1]), text, font=font, fill=text_color_rgb)

        # Convert to a format suitable for Tkinter
        tk_image = ImageTk.PhotoImage(generated_image)

        # Display the generated image
        preview_label = tk.Label(preview_frame, image=tk_image)
        preview_label.image = tk_image
        preview_label.pack()

        # Add Save button
        save_button = tk.Button(preview_frame, text="Save Image", command=save_image)
        save_button.pack(pady=10)
    except Exception as e:
        messagebox.showerror("Error", f"Failed to generate image: {str(e)}")


def save_image():
    try:
        # Open save dialog
        file_path = filedialog.asksaveasfilename(defaultextension=".png",
                                                 filetypes=[("PNG files", "*.png")])
        if file_path:
            generated_image.save(file_path)
            messagebox.showinfo("Success", f"Image saved at {file_path}")
    except Exception as e:
        messagebox.showerror("Error", f"Failed to save image: {str(e)}")


def update_font_dropdown(*args):
    """Update the dropdown with fonts containing the entered letter."""
    query = font_search_var.get().lower()
    filtered_fonts = [name for name, path in font_list if query in name.lower()]
    if not filtered_fonts:
        filtered_fonts = [name for name, path in font_list if query in os.path.basename(path).lower()]
    font_dropdown["values"] = filtered_fonts
    if filtered_fonts:
        font_dropdown.current(0)
    else:
        font_dropdown.set("")


# Load available fonts
system_fonts = get_system_fonts()
font_list = get_font_names(system_fonts)
font_names = [name for name, path in font_list]

# Create GUI
app = tk.Tk()
app.title("Text Image Generator")

# Input frame
input_frame = tk.Frame(app)
input_frame.pack(padx=10, pady=10, fill="x")

# Text Input
tk.Label(input_frame, text="Text:").grid(row=0, column=0, padx=10, pady=5, sticky="e")
text_input = tk.Entry(input_frame, width=30)
text_input.grid(row=0, column=1, padx=10, pady=5)

# Font Filter Input
tk.Label(input_frame, text="Filter Fonts by Letter:").grid(row=1, column=0, padx=10, pady=5, sticky="e")
font_search_var = tk.StringVar()
font_search_entry = tk.Entry(input_frame, textvariable=font_search_var)
font_search_entry.grid(row=1, column=1, padx=10, pady=5)
font_search_var.trace_add("write", update_font_dropdown)

# Font Dropdown
tk.Label(input_frame, text="Font:").grid(row=2, column=0, padx=10, pady=5, sticky="e")
font_dropdown = ttk.Combobox(input_frame, values=font_names, state="readonly", width=40)
if font_names:
    font_dropdown.current(0)  # Select the first font as default
font_dropdown.grid(row=2, column=1, padx=10, pady=5)

# Background Color Input
tk.Label(input_frame, text="Background Color (R,G,B):").grid(row=3, column=0, padx=10, pady=5, sticky="e")
bg_color_input = tk.Entry(input_frame, width=30)
bg_color_input.insert(0, "255,255,255")  # Default to white
bg_color_input.grid(row=3, column=1, padx=10, pady=5)

# Text Color Input
tk.Label(input_frame, text="Text Color (R,G,B):").grid(row=4, column=0, padx=10, pady=5, sticky="e")
text_color_input = tk.Entry(input_frame, width=30)
text_color_input.insert(0, "0,0,0")  # Default to black
text_color_input.grid(row=4, column=1, padx=10, pady=5)

# Padding Input
tk.Label(input_frame, text="Padding:").grid(row=5, column=0, padx=10, pady=5, sticky="e")
padding_input = tk.Entry(input_frame, width=30)
padding_input.insert(0, "10")  # Default padding
padding_input.grid(row=5, column=1, padx=10, pady=5)

# Generate Button
generate_button = tk.Button(input_frame, text="Generate Image", command=generate_image)
generate_button.grid(row=6, column=0, columnspan=2, pady=10)

# Preview frame
preview_frame = tk.Frame(app)
preview_frame.pack(padx=10, pady=10)

app.mainloop()
