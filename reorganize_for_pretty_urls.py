#!/usr/bin/env python3
"""
Reorganize GitHub Pages site for pretty URLs.
Converts top-level .html files (except index.html) into folders with index.html inside them.
Updates all internal links accordingly.
"""

import os
import shutil
import re
from pathlib import Path

def reorganize_site():
    """Main reorganization function"""

    # Files to convert (excluding index.html)
    files_to_convert = [
        'contact.html',
        'game-of-life.html'
    ]

    print("Starting reorganization for pretty URLs...\n")

    # Step 1: Create new folder structure and move files
    for filename in files_to_convert:
        if not os.path.exists(filename):
            print(f"Warning: {filename} not found, skipping...")
            continue

        # Get folder name (e.g., 'contact' from 'contact.html')
        folder_name = filename.replace('.html', '')

        # Create the folder
        os.makedirs(folder_name, exist_ok=True)
        print(f"✓ Created folder: {folder_name}/")

        # Move the file to folder/index.html
        new_path = os.path.join(folder_name, 'index.html')
        shutil.move(filename, new_path)
        print(f"✓ Moved {filename} → {new_path}")

    print("\n" + "="*50)
    print("Step 1 complete: Files reorganized")
    print("="*50 + "\n")

    # Step 2: Update all internal links
    print("Updating internal links...\n")

    # Define link replacements
    replacements = {
        # Top-level index.html
        'index.html': [
            ('href="game-of-life.html"', 'href="/game-of-life/"'),
            ('href="contact.html"', 'href="/contact/"'),
        ],
        # Now in /contact/index.html
        'contact/index.html': [
            ('href="index.html"', 'href="/"'),
        ],
        # Now in /game-of-life/index.html
        'game-of-life/index.html': [
            ('href="index.html"', 'href="/"'),
        ],
        # Archive files (relative path changes)
        'archive/nim.html': [
            ('href="index.html"', 'href="/"'),
        ],
        'archive/game-of-life-vanilla.html': [
            ('href="index.html"', 'href="/"'),
        ],
    }

    # Apply replacements
    for file_path, replacements_list in replacements.items():
        if not os.path.exists(file_path):
            print(f"Warning: {file_path} not found, skipping...")
            continue

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        for old_text, new_text in replacements_list:
            content = content.replace(old_text, new_text)

        # Only write if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated links in: {file_path}")
        else:
            print(f"  No changes needed: {file_path}")

    print("\n" + "="*50)
    print("Step 2 complete: Links updated")
    print("="*50 + "\n")

    print("✅ Reorganization complete!")
    print("\nNew URL structure:")
    print("  https://yourdomain.com/          → index.html")
    print("  https://yourdomain.com/contact/  → contact/index.html")
    print("  https://yourdomain.com/game-of-life/ → game-of-life/index.html")
    print("\n✅ All changes are GitHub Pages compatible!")

if __name__ == '__main__':
    # Confirm before proceeding
    print("This script will reorganize your site for pretty URLs.")
    print("It will:")
    print("  1. Move contact.html → contact/index.html")
    print("  2. Move game-of-life.html → game-of-life/index.html")
    print("  3. Update all internal links")
    print()

    response = input("Continue? (y/n): ").strip().lower()
    if response == 'y':
        reorganize_site()
    else:
        print("Cancelled.")
