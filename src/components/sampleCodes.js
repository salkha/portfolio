/* eslint-disable no-useless-escape */
const sampleCodes = {
    simpleCodeOne: {
        name: "Image Editing (part 1)",
        id: "code1",
        code: `import os
import shutil
import pandas as pd
import numpy as np
from PIL import Image
import cv2
from plytixconnect import handlize  # import your handle function

# ---------------- STEP 1: Get list of GTIN folders ---------------- #
image_project_path = 'two_new'
product_gtin = [
    folder for folder in os.listdir(image_project_path)
    if os.path.isdir(os.path.join(image_project_path, folder))
]

# ---------------- STEP 2: Load CSV data ---------------- #
csv_url = "https://pim.plytix.com/channels/65ce29a9e5a05f785786b45f/feed"
df = pd.read_csv(csv_url, dtype=str)

# ---------------- STEP 3: Filter by GTIN ---------------- #
filtered_df = df[df['GTIN'].isin(product_gtin)]

# ---------------- STEP 4: Define mappings ---------------- #
marke_map = {
    "Henry Stevens": "HS",
    "Heinrich Dinkelacker": "HD",
    "N91": "N91"
}

geschlecht_map = {
    "Herren": "M",
    "Damen": "W"
}

# ---------------- STEP 5: Create folder for renamed images ---------------- #
renamed_root = image_project_path + '_renamed'
os.makedirs(renamed_root, exist_ok=True)

# ---------------- STEP 6: Rename and copy images ---------------- #
for _, row in filtered_df.iterrows():
    gtin = row.get('GTIN', '')
    geschlecht = row.get('Geschlecht', '')
    marke = row.get('Filter - Marke', '')
    parent_color = handlize(row.get('Parent and color', ''))

    geschlecht_mapped = geschlecht_map.get(geschlecht, geschlecht)
    marke_mapped = marke_map.get(marke, marke)

    base_name = f"{marke_mapped}_{geschlecht_mapped}_{parent_color}".replace(" ", "-").replace("/", "-")

    src_folder = os.path.join(image_project_path, gtin, 'images2d')
    dest_folder = os.path.join(renamed_root)

    if not os.path.exists(src_folder):
        continue

    os.makedirs(dest_folder, exist_ok=True)

    image_files = sorted([
        f for f in os.listdir(src_folder)
        if f.lower().endswith(('.png', '.jpg', '.jpeg'))
    ])

    for idx, image_file in enumerate(image_files):
        if idx >= 8:
            break
        ext = os.path.splitext(image_file)[1].lower()
        new_name = f"{base_name}_{idx+1:02d}{ext}"
        shutil.copyfile(
            os.path.join(src_folder, image_file),
            os.path.join(dest_folder, new_name)
        )

# ---------------- STEP 7: Define crop function ---------------- #
def crop_largest_component(pil_img):
    """Crop largest connected component (shoe) and remove mostly-transparent bottom rows."""
    img = pil_img.convert("RGBA")
    np_img = np.array(img)

    alpha = np_img[:, :, 3] > 0
    rgb = np_img[:, :, :3]
    not_white = np.any(rgb < 250, axis=2)
    mask = np.logical_and(alpha, not_white).astype(np.uint8) * 255

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return pil_img

    largest_contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(largest_contour)
    cropped_np = np_img[y:y+h, x:x+w]

    height, width = cropped_np.shape[:2]
    threshold_ratio = 0.95
    crop_line = height

    for row_idx in reversed(range(height)):
        alpha_row = cropped_np[row_idx, :, 3]
        transparent_count = np.count_nonzero(alpha_row == 0)
        transparent_ratio = transparent_count / width
        if transparent_ratio > threshold_ratio:
            crop_line = row_idx
        else:
            break

    cropped_np_final = cropped_np[:crop_line, :, :]
    return Image.fromarray(cropped_np_final, mode='RGBA')

# ---------------- STEP 8: Crop images ---------------- #
cropped_root = image_project_path + '_only_renamed_cropped'
os.makedirs(cropped_root, exist_ok=True)

for img_file in os.listdir(renamed_root):
    src_img_path = os.path.join(renamed_root, img_file)
    try:
        img = Image.open(src_img_path)
        cropped_img = crop_largest_component(img)
        cropped_img.save(os.path.join(cropped_root, img_file))
    except Exception as e:
        print(f"Error processing {img_file}: {e}")

# ---------------- STEP 9: Print GTIN info after processing ---------------- #
for _, row in filtered_df.iterrows():
    gtin = handlize(row.get('GTIN', ''))
    geschlecht = handlize(row.get('Geschlecht', ''))
    marke = handlize(row.get('Filter - Marke', ''))
    parent_color = handlize(row.get('Parent and color', ''))
    print(f"{gtin} {geschlecht} {marke} {parent_color}")`
    },
    simpleCodeTwo: {
        name: "Image Editing (part 2)",
        id: "code2",
        code: `import os
import shutil
import sys
from PIL import Image
from tqdm import tqdm

# ============ PART 1: Use Existing Cropped & Renamed Images ============

# Input folder (already renamed and cropped)
image_project_path = "two_new_only_renamed_cropped"

# Final output folder for renamed images
final_renamed_root = image_project_path + "_prepared"
os.makedirs(final_renamed_root, exist_ok=True)

# Mapping old suffixes to new suffixes for renaming image files
rename_map = {
    "_02.png": "_01.png",
    "_07.png": "_02.png",
    "_03.png": "_03.png",
    "_06.png": "_06.png",
    "_01.png": "_08.png",
    "_04.png": "_09.png",
    "_08.png": "_10.png",
    "_09.png": "_11.png",
    "_05.png": "_12.png",
    "_10.png": "_14.png",
}

# Copy files from source to final_renamed_root with updated suffixes
for filename in sorted(os.listdir(image_project_path)):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        for old_suffix, new_suffix in rename_map.items():
            if filename.endswith(old_suffix):
                new_filename = filename.replace(old_suffix, new_suffix)
                src_file = os.path.join(image_project_path, filename)
                dst_file = os.path.join(final_renamed_root, new_filename)
                shutil.copyfile(src_file, dst_file)
                break

# ============ PART 2: Image Processing Profiles ============

# Root folder containing renamed images
RENAMED_ROOT = final_renamed_root  # This is dynamic based on input folder

SETTINGS_PROFILES = {
    "sp": {
        "output_folder": RENAMED_ROOT + "_shopify",
        "background_width": 1950,
        "background_height": 2400,
        "padding_left": 240,
        "padding_right": 240,
        "padding_top": 240,
        "padding_bottom": 384,
        "background_color": (230, 230, 230),
        "rename_map": {
            "_01.png": "_01.png",
            "_02.png": "_02.png",
            "_10.png": "_10.png",
            "_12.png": "_12.png",
            "_09.png": "_09.png",
            "_11.png": "_11.png",
            "_08.png": "_08.png",
        },
        "file_prefix": ""
    },
    "myb": {
        "output_folder": RENAMED_ROOT + "_myb",
        "background_width": 2048,
        "background_height": 2048,
        "padding_left": 20,
        "padding_right": 20,
        "padding_top": 100,
        "padding_bottom": 100,
        "background_color": (0, 0, 0, 0),
        "center_images": True,
        "rename_map": {
            "_08.png": "_08.png",
            "_02.png": "_02.png",
            "_10.png": "_10.png",
            "_12.png": "_12.png",
            "_09.png": "_09.png",
            "_11.png": "_11.png",
            "_01.png": "_01.png",
        },
        "file_prefix": "MYB_"
    },
    "fsh": {
        "output_folder": RENAMED_ROOT + "_fassionate",
        "background_width": 1200,
        "background_height": 1200,
        "padding_left": 60,
        "padding_right": 60,
        "padding_top": 0,
        "padding_bottom": 120,
        "background_color": (255, 255, 255),
        "rename_map": {
            "_08.png": "_01.png",
            "_02.png": "_03.png",
            "_10.png": "_04.png",
            "_05.png": "_05.png",
            "_11.png": "_06.png",  # This one will be centered
        },
        "file_prefix": "Fashionette_"
    },
    "breuninger": {
        "output_folder": RENAMED_ROOT + "_breuninger",
        "background_width": 6300,
        "background_height": 8625,
        "padding_left": 670,
        "padding_right": 670,
        "padding_top": 670,
        "padding_bottom": 670,
        "background_color": (248, 243, 237),
        "center_images": True,
        "rename_map": {
            "_02.png": "_01.png",
            "_10.png": "_02.png",
            "_12.png": "_03.png",
            "_01.png": "_04.png",
            "_11.png": "_05.png",
            "_14.png": "_06.png",
        },
        "file_prefix": "Breuninger_"
    },
    "mp_grey": {
        "output_folder": RENAMED_ROOT + "_mp_grey",
        "background_width": 1524,
        "background_height": 2200,
        "padding_left": 100,
        "padding_right": 100,
        "padding_top": 100,
        "padding_bottom": 100,
        "default_background_color": (241, 241, 241),
        "white_background_color": (255, 255, 255),
        "rename_map": {
            "_01.png": "_01.png",
            "_02.png": "_02.png",
            "_10.png": "_03.png",
            "_09.png": "_04.png",
            "_11.png": "_05.png",
            "_08.png": "_06.png",
        },
        "file_prefix": "MP_grey_"
    },
    "mp_white": {
        "output_folder": RENAMED_ROOT + "_mp_white",
        "background_width": 1800,
        "background_height": 2592,
        "padding_left": 100,
        "padding_right": 100,
        "padding_top": 100,
        "padding_bottom": 100,
        "background_color": (255, 255, 255),
        "rename_map": {
            "_01.png": "_01.png",
            "_02.png": "_02.png",
            "_10.png": "_03.png",
            "_09.png": "_04.png",
            "_11.png": "_05.png",
            "_08.png": "_06.png",
        },
        "center_images": True,
        "file_prefix": "MP_white_"
    }
}

def create_background(width, height, color):
    mode = "RGBA" if len(color) == 4 else "RGB"
    return Image.new(mode, (width, height), color)

def place_image_on_background(bg, img_path, config, image_name, new_suffix=None):
    img = Image.open(img_path).convert("RGBA")
    iw, ih = img.size

    max_w = config['background_width'] - config['padding_left'] - config['padding_right']
    max_h = config['background_height'] - config['padding_top'] - config['padding_bottom']

    if config.get('output_folder', '').endswith('breuninger'):
        scale = min(max_w / iw, max_h / ih)
    else:
        scale = min(max_w / iw, max_h / ih, 1.0)

    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.LANCZOS)

    # Special rule for "fsh" profile: center _11.png (becomes _06.png)
    if config.get('output_folder', '').endswith('_fassionate') and new_suffix == "_06.png":
        x = (config['background_width'] - nw) // 2
        y = (config['background_height'] - nh) // 2

    elif config.get('output_folder', '').endswith('mp_grey'):
        bg_color = config['white_background_color'] if image_name.endswith('_01.png') else config['default_background_color']
        bg = create_background(config['background_width'], config['background_height'], bg_color)
        if image_name.endswith(('_02.png', '_01.png', '_09.png')):
            adj_h = config['background_height'] - config['padding_top'] - (config['padding_bottom'] - 100)
            y = config['padding_top'] + (adj_h - nh) // 2
        else:
            y = config['padding_top'] + (max_h - nh) // 2
        x = config['padding_left'] + (max_w - nw) // 2

    elif config.get('output_folder', '').endswith('mp_white'):
        if image_name.endswith(('_02.png', '_01.png', '_09.png')):
            adj_h = config['background_height'] - config['padding_top'] - (config['padding_bottom'] - 100)
            y = config['padding_top'] + (adj_h - nh) // 2
        else:
            y = config['padding_top'] + (max_h - nh) // 2
        x = config['padding_left'] + (max_w - nw) // 2

    elif config.get('output_folder', '').endswith('breuninger'):
        x = config['padding_left'] + (max_w - nw) // 2
        y = config['padding_top'] + (max_h - nh) // 2

    elif config.get('center_images'):
        x = (config['background_width'] - nw) // 2
        y = (config['background_height'] - nh) // 2

    else:
        x = config['padding_left'] + (max_w - nw) // 2
        y = config['background_height'] - config['padding_bottom'] - nh

    bg.paste(img, (x, y), img)
    return bg

def process_images_with_settings(profile, config):
    inp = RENAMED_ROOT
    out = config['output_folder']
    os.makedirs(out, exist_ok=True)

    files = sorted(f for f in os.listdir(inp) if f.lower().endswith(".png"))
    rename_map = config.get('rename_map', config.get('rename_list', []))
    if isinstance(rename_map, dict):
        rename_map = rename_map.items()

    file_prefix = config.get("file_prefix", "")

    for fn in tqdm(files, desc=f"Processing {profile}"):
        normalized_fn = fn.replace(" .png", ".png")
        for orig_suffix, new_suffix in rename_map:
            if normalized_fn.endswith(orig_suffix):
                img_path = os.path.join(inp, fn)
                base = fn[:-len(orig_suffix)].strip().rstrip("_")
                new_name = file_prefix + base + new_suffix

                if profile == 'breuninger' and orig_suffix == '_14.png':
                    original_img = Image.open(img_path)
                    original_img.save(os.path.join(out, new_name))
                else:
                    bg = create_background(config['background_width'], config['background_height'],
                                           config.get('background_color', (255, 255, 255)))
                    final = place_image_on_background(bg, img_path, config, fn, new_suffix)
                    final.save(os.path.join(out, new_name))
                break

    print(f"Finished profile {profile}, output in {out}")

# ============ PART 3: CLI Entrypoint ============

if __name__ == "__main__":
    if len(sys.argv) > 1:
        args = [a.lower() for a in sys.argv[1:]]
        if "all" in args:
            for p, cfg in SETTINGS_PROFILES.items():
                process_images_with_settings(p, cfg)
        else:
            for arg in args:
                if arg in SETTINGS_PROFILES:
                    process_images_with_settings(arg, SETTINGS_PROFILES[arg])
                else:
                    print("Unknown profile:", arg)
                    print("Available:", ", ".join(SETTINGS_PROFILES.keys()))
    else:
        print("Please specify a profile or 'all'.")`
    },
    simpleCodeThree: {
        name: "Auto-Translate Shopify Collections",
        id: "code3",
        code: `import shopify
import json
import sys
import re
from openai import OpenAI
import tiktoken
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import config
from bs4 import BeautifulSoup

# Read store, source language, and target language from console arguments
if len(sys.argv) != 4:
    print("Usage: python translation_page_element.py <store> <source_lang> <target_lang>")
    sys.exit(1)

store = sys.argv[1]
lang = sys.argv[2]
target_lang = sys.argv[3]

shop_url = config.SHOPIFY_STORES[store][lang]['SHOPIFY_DOMAIN']
private_app_password = config.SHOPIFY_STORES[store][lang]['SHOPIFY_ACCESS_TOKEN']
api_version = config.SHOPIFY_API_VERSION

client = OpenAI(api_key="**********")

encoding = tiktoken.encoding_for_model("gpt-3.5-turbo-instruct")

def count_tokens(text):
    return len(encoding.encode(text))

def get_shopify_data(query, variables=None):
    with shopify.Session.temp(shop_url, api_version, private_app_password):
        result = shopify.GraphQL().execute(query, variables)
    return json.loads(result)

def get_translatable_resources(resource_type, first=10, after=None):
    query = """
    query translatableResources($resourceType: TranslatableResourceType!, $first: Int!, $after: String) {
        translatableResources(resourceType: $resourceType, first: $first, after: $after) {
            edges {
                cursor
                node {
                    resourceId
                    translatableContent {
                        key
                        locale
                        value
                        digest
                    }
                }
            }
            pageInfo {
                hasNextPage
            }
        }
    }
    """
    variables = {"resourceType": resource_type, "first": first, "after": after}
    return get_shopify_data(query, variables)

def query_chatgpt(prompt):
    try:
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            temperature=0,
            max_tokens=1024,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error: {e}"

def translate_html_sections(html_text):
    soup = BeautifulSoup(html_text, 'html.parser')
    translated_parts = []

    for tag in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']):
        original_html = str(tag)
        plain_text = tag.get_text()

        if not plain_text.strip():
            translated_parts.append(original_html)
            continue

        prompt = (
            f"Translate the following HTML content into {target_lang}. "
            f"Do not add or remove content. "
            f"Preserve all placeholders (e.g., {{var}}, [[link]], %value%). "
            f"Do not use any language other than {target_lang}. "
            f"Only return the translated HTML (no explanation or comments).\n\n"
            f"HTML: {original_html}"
        )

        translated_html = query_chatgpt(prompt)
        translated_parts.append(translated_html)

    return '\n'.join(translated_parts)

def translate_text(value):
    if not value:
        return value
    # Check if it's HTML-heavy content
    if '<p' in value or '<h' in value:
        return translate_html_sections(value)
    else:
        # Fallback to sentence splitting
        return translate_plain_text(value)

def translate_plain_text(value):
    translated_sentences = []

    system_prompt = (
        f"Translate the following sentence into {target_lang}. "
        f"Do not add or remove any content. "
        f"Keep all placeholders unchanged (e.g., {{var}}, %value%, [[name]]). "
        f"Do not use any language other than {target_lang}. "
        f"Return only the translated sentence."
    )

    // eslint-disable-next-line no-useless-escape
    sentences = re.split(r'(?<=[.!?])\s+', value.strip())
    for sentence in sentences:
        if not sentence.strip():
            continue
        prompt = f"{system_prompt}\n\nText: {sentence}"
        translation = query_chatgpt(prompt)

        for match in re.findall(r"{[^{}]+}", sentence):
            if match not in translation:
                translation = translation.replace(match.strip(), match)

        translated_sentences.append(translation)

    return " ".join(translated_sentences)

def register_translations_to_shopify(resource_id, translations):
    mutation = """
    mutation translationsRegister($resourceId: ID!, $translations: [TranslationInput!]!) {
      translationsRegister(resourceId: $resourceId, translations: $translations) {
        translations {
          key
          locale
          value
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    variables = {"resourceId": resource_id, "translations": translations}
    return get_shopify_data(mutation, variables)

def main():
    resource_type = "COLLECTION"
    first = 10
    after = None
    item_count = 0

    while True:
        response = get_translatable_resources(resource_type, first, after)

        if 'errors' in response:
            print("Errors in response:", response['errors'])
            break

        resources = response['data'].get('translatableResources', {}).get('edges', [])
        if not resources:
            print("No translatable resources found.")
            break

        for edge in resources:
            resource = edge['node']
            resource_id = resource['resourceId']
            translations = []

            for content in resource['translatableContent']:
                if content['locale'] == lang and content['value']:
                    translated_value = translate_text(content['value'])
                    translations.append({
                        "key": content['key'],
                        "locale": target_lang,
                        "translatableContentDigest": content['digest'],
                        "value": translated_value
                    })
                else:
                    translations.append({
                        "key": content['key'],
                        "locale": content['locale'],
                        "translatableContentDigest": content['digest'],
                        "value": content['value']
                    })
                item_count += 1

            if translations:
                register_response = register_translations_to_shopify(resource_id, translations)
                if 'errors' in register_response:
                    print("Error registering translations:", register_response['errors'])
                else:
                    print(f"Successfully registered translations for resource {resource_id}")

        page_info = response['data']['translatableResources']['pageInfo']
        if page_info.get('hasNextPage', False):
            after = resources[-1]['cursor']
        else:
            break

    print(f"Processed {item_count} items.")

if __name__ == "__main__":
    main()`
    },
    simpleCodeFour: {
        name: "Generate Image Feed from Server",
        id: "code4",
        code: `import paramiko
import stat
import pandas as pd
from datetime import datetime, timedelta
import requests
import io
import re

# Configurable Parameters
HOSTNAME = "dpssolutions.net"
USERNAME = "dps_files"
PASSWORD = "P0BSmdWUJci5dvXu"
PORT = 22
FOLDER_PATH = "/home/dps_files/files.dpssolutions.net/shoepassion/myb"

# Date Range: full 24-hour period
today = datetime.today()
START_DATE = datetime(today.year, 8, 7, 0, 0, 0)
END_DATE = datetime(today.year, 8, 8, 23, 59, 59)
START_DATE_STR = START_DATE.strftime("%d-%m-%Y")
END_DATE_STR = END_DATE.strftime("%d-%m-%Y")

CSV_URL = "https://feeds.datafeedwatch.com/111833/70be92540c57cdb2eac8322363585840ff48b2a0.csv"
DELIMITER = ','
OUTPUT_CSV = f"myb_with_parent_{today.strftime('%d-%m-%Y')}.csv"

def list_folders():
    folders = []
    folder_mapping = {}
    image_counts = {}

    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(HOSTNAME, PORT, USERNAME, PASSWORD)

        sftp = client.open_sftp()
        sftp.chdir(FOLDER_PATH)

        items = sftp.listdir_attr()

        print("DEBUG: All folders with timestamps:")
        for item in items:
            if stat.S_ISDIR(item.st_mode) and item.filename.isdigit():
                modified_time = datetime.fromtimestamp(item.st_mtime)
                print(f" - {item.filename} | Modified: {modified_time}")

        for item in items:
            if stat.S_ISDIR(item.st_mode) and item.filename.isdigit():
                modified_time = datetime.fromtimestamp(item.st_mtime)
                if START_DATE <= modified_time <= END_DATE:
                    trimmed_name = item.filename.lstrip('0')  # ✅ strip leading zeros
                    folders.append(trimmed_name)
                    folder_mapping[trimmed_name] = item.filename

                    image_folder_path = f"{FOLDER_PATH}/{item.filename}/images2d"
                    try:
                        image_files = sftp.listdir(image_folder_path)
                        // eslint-disable-next-line no-useless-escape
                        image_pattern = re.compile(r'^img_2D_\d{4}\.png$')
                        valid_images = [f for f in image_files if image_pattern.match(f)]
                        image_counts[trimmed_name] = min(len(valid_images), 8)
                    except IOError:
                        image_counts[trimmed_name] = 0

        print("Folders in", FOLDER_PATH, ":")
        for folder in folders:
            print(folder)

        print(f"Total folders processed: {len(folders)}")

        try:
            response = requests.get(CSV_URL)
            response.raise_for_status()
            df = pd.read_csv(io.StringIO(response.text), delimiter=DELIMITER, encoding='utf-8', on_bad_lines='skip', dtype=str)

            df['ean'] = df['ean'].astype(str).str.lstrip('0')  # ✅ also strip zeros from ean
            matched_folders = [ean for ean in folders if ean in df['ean'].values]
            unmatched_folders = [ean for ean in folders if ean not in df['ean'].values]

            print(f"Matched folders: {len(matched_folders)}")
            print(f"Unmatched folders: {len(unmatched_folders)}")
            if unmatched_folders:
                print("Unmatched folder names:")
                for name in unmatched_folders:
                    print(name)
        except Exception as e:
            print("Error while checking matched folders:", e)

        sftp.close()
        client.close()
    except Exception as e:
        print("Error:", e)

    return folders, folder_mapping, image_counts

def create_matched_csv(folders, folder_mapping, image_counts):
    try:
        response = requests.get(CSV_URL)
        response.raise_for_status()
        df = pd.read_csv(io.StringIO(response.text), delimiter=DELIMITER, encoding='utf-8', on_bad_lines='skip', dtype=str)

        print("CSV Columns:", df.columns.tolist())

        required_columns = {'ean', 'group_id', 'sku', 'category'}
        missing_columns = required_columns - set(df.columns)
        if missing_columns:
            raise ValueError(f"Missing columns in CSV: {missing_columns}")

        df['ean'] = df['ean'].astype(str).str.lstrip('0')  # ✅ same fix here

        matched_df = df[df['ean'].isin(folders)][['ean', 'group_id', 'sku', 'category']]
        if matched_df.empty:
            print("No matching folders found in the CSV.")
            return

        matched_group_ids = matched_df['group_id'].unique()
        final_df = df[df['group_id'].isin(matched_group_ids)][['ean', 'group_id', 'sku', 'category']]
        print(f"Total eans in matched groups: {len(final_df)}")

        for i in range(1, 9):
            final_df[f'image_{i}'] = None

        for index, item in matched_df.iterrows():
            group_id = item['group_id']
            ean = item['ean']
            print(f"Processing ean: {ean}, group_id: {group_id}")

            full_folder_name = folder_mapping.get(ean, ean)
            num_images = image_counts.get(ean, 0)

            group_rows = final_df[final_df['group_id'] == group_id]
            for group_index, group_item in group_rows.iterrows():
                for i in range(1, num_images + 1):
                    final_df.loc[group_index, f'image_{i}'] = (
                        f"https://www.old.mybudapester.com/shoepassion/myb/{full_folder_name}/images2d/img_2D_{str(i).zfill(4)}.png?c=e7e7e7"
                    )

        final_df['product_gallery'] = ''

        final_df = final_df[['ean', 'sku', 'group_id', 'category', 'image_1', 'image_2', 'image_3', 'image_4',
                             'image_5', 'image_6', 'image_7', 'image_8', 'product_gallery']]
        final_df = final_df[final_df['sku'] != final_df['group_id']]
        final_df = final_df.sort_values(by='group_id').reset_index(drop=True)

        extra_rows = []
        for group_id, group_rows in final_df.groupby('group_id'):
            if len(group_rows) > 1:
                first_row = group_rows.iloc[0]
                category_value = str(first_row['category']).strip().lower()

                if category_value not in ['taschen', 'accessories, taschen']:
                    first_row = first_row.copy()
                    first_row['ean'] = ''
                    first_row['sku'] = group_id
                    images = [first_row[f'image_{i}'] for i in range(1, 9) if first_row[f'image_{i}']]
                    combined_images_str = ",".join(images)
                    first_row['product_gallery'] = combined_images_str
                    extra_rows.append(first_row)

        extra_df = pd.DataFrame(extra_rows)

        combined_rows = []
        for group_id, group_rows in final_df.groupby('group_id'):
            combined_rows.append(group_rows)
            extra_row = extra_df[extra_df['group_id'] == group_id]
            combined_rows.append(extra_row)

        final_df_with_extra = pd.concat(combined_rows, ignore_index=True)

        def is_specific_taschen(cat):
            return str(cat).strip().lower() in ['taschen', 'accessories, taschen']

        is_special = final_df_with_extra['category'].apply(is_specific_taschen)
        normal_df = final_df_with_extra[~is_special]
        special_df = final_df_with_extra[is_special]

        for index, row in special_df.iterrows():
            images = [row[f'image_{i}'] for i in range(1, 9) if pd.notna(row[f'image_{i}'])]
            special_df.at[index, 'product_gallery'] = ",".join(images)

        final_sorted_df = pd.concat([normal_df, special_df], ignore_index=True)

        final_sorted_df = final_sorted_df.drop_duplicates()
        final_sorted_df = final_sorted_df.drop(columns=['ean', 'group_id', 'category'])

        final_sorted_df.to_csv(OUTPUT_CSV, index=False, encoding='utf-8')
        print(f"Matched data has been saved to {OUTPUT_CSV}")
    except Exception as e:
        print("Error processing CSV:", e)

if __name__ == "__main__":
    print(f"Looking for folders modified from {START_DATE_STR} to {END_DATE_STR}")
    folders, folder_mapping, image_counts = list_folders()
    create_matched_csv(folders, folder_mapping, image_counts)`
    },
    simpleCodeFive: {
        name: "Update Supplier Prices from CSV",
        id: "code5",
        code: `import csv
import pixi_api
from dotenv import load_dotenv

# Load environment variables (for Pixi credentials)
load_dotenv()

# Initialize Pixi API client
pixi_api_client = pixi_api.PixiApi()


def get_supplier_info(item_nr_int, only_active=True):
    """
    Fetch supplier info for an item using pixiGetItemSuppliers.
    Returns all suppliers as a list of dicts.
    """
    try:
        response = pixi_api_client.call(
            "pixiGetItemSuppliers",
            ItemNrInt=item_nr_int,
            OnlyActiveSuppliers=only_active
        )

        if not response:
            print(f"⚠ No suppliers found for ItemNr {item_nr_int}")
            return []

        if isinstance(response, dict):
            response = [response]

        return response

    except Exception as e:
        print(f"❌ Error fetching supplier info for ItemNr {item_nr_int}: {e}")
        return []


def update_supplier_price(supplier, new_price):
    """
    Update supplier price in Pixi using pixiSetItemSupplier.
    """
    try:
        update_data = {
            "SupplNr": supplier["SupplNr"],          # required
            "ItemNrInt": supplier["ItemNrInt"],      # item number
            "ItemNrSuppl": supplier.get("ItemNrSuppl"),
            "SupplPrice": new_price,                 # new EK
            "AddEAN": False,
            "PreferredSupplier": "1"
        }

        response = pixi_api_client.call("pixiSetItemSupplier", **update_data)

        print(f"✅ Updated supplier '{supplier['SupplNr']}' for ItemNrInt {supplier['ItemNrInt']} → EK: {new_price}")

        if response:
            print(f"Response: {response}")
        else:
            print("⚠ No response returned from API")

    except Exception as e:
        print(f"❌ Error updating supplier price for ItemNrInt {supplier.get('ItemNrInt')}: {e}")


if __name__ == "__main__":
    csv_file = "new_file_26_items.csv"  # <-- Change to your actual CSV file path

    try:
        # <-- Change encoding to utf-8-sig to remove BOM
        with open(csv_file, mode="r", encoding="utf-8-sig") as file:
            reader = csv.DictReader(file, delimiter=";")
            print(f"📄 Found columns: {reader.fieldnames}")

            for row in reader:
                item_nr = row.get("Item Nr", "").strip()
                ek_value = row.get("EK", "").strip()
                supplier_from_csv = row.get("Lieferant", "").strip()

                if not item_nr:
                    print(f"⚠ Skipping row with missing Item NR: {row}")
                    continue

                if not supplier_from_csv:
                    print(f"⚠ Missing Lieferant for Item NR {item_nr}")
                    continue

                # Convert EK to float
                try:
                    new_price = float(ek_value.replace(",", "."))
                except ValueError:
                    print(f"⚠ Invalid EK value for Item NR {item_nr}: '{ek_value}' — skipping.")
                    continue

                # Fetch all suppliers for this item
                suppliers = get_supplier_info(item_nr)

                # Match supplier by SupplNr from CSV
                matching_suppliers = [
                    s for s in suppliers
                    if s.get("SupplNr", "").strip().lower() == supplier_from_csv.lower()
                ]

                if not matching_suppliers:
                    print(f"⏭ No matching supplier '{supplier_from_csv}' found for Item NR {item_nr}")
                    continue

                for supplier in matching_suppliers:
                    update_supplier_price(supplier, new_price)

        print("\n✅ Finished updating all supplier prices from CSV.")

    except FileNotFoundError:
        print(f"❌ File not found: {csv_file}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
`
    },
    simpleCodeSix: {
        name: "Store Locator Map (Shopify Widget)",
        id: "code6",
        code: `<section id="section-{{ section.id }}" class="store-locator-map">
    <div class="store-locator-map__container">
        <div class="store_page_container">

            <!-- Left column: search + store list -->
            <div class="store_finder_left_section">
                <!-- Search box -->
                <div class="store_finder_top_section">
                    <div class="row store-search">
                        <div class="search-box">
                            <input id="storeFinderSearchBox" class="controls" type="text" placeholder="Berlin">
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" />
                        </div>
                    </div>
                </div>

                <!-- Store list -->
                <div class="filtered_search_result"></div>
            </div>

            <!-- Right column: Map -->
            <div class="store_finder_map_section">
                <div id="map"></div>
            </div>

        </div>
    </div>
</section>

<script src="https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js"></script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDioUUV3qMZgtv1nFmEnNDH4BNpOgzk7dg&callback=initMap&libraries=places&v=weekly">
</script>

<script>
    let map;
    let infowindow;
    let marker_array = [];
    let currentStores = [];

    const image = 'https://hd-production.s3.amazonaws.com/Group%204013.svg';

    const storesObj = {
        "stores": [
            {% for block in section.blocks %}
            {
                "label": "{{ block.settings.label }}",
                "street": "{{ block.settings.street }}",
                "place": "{{ block.settings.place }}",
                "lat": parseFloat("{{ block.settings.lat }}"),
                "lng": parseFloat("{{ block.settings.lng }}")
            }{% if forloop.last == false %},{% endif %}
            {% endfor %}
        ]
    };

    function initMap() {
        const germany = { lat: 50.612885, lng: 7.1281099 };

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            center: germany,
            styles: [
                {
                    featureType: "all",
                    elementType: "all",
                    stylers: [
                        { saturation: -100 },
                        { lightness: 10 }
                    ]
                }
            ]
        });

        infowindow = new google.maps.InfoWindow();
        currentStores = [...storesObj.stores];

        setMarkers(currentStores);
        render_store_list(currentStores);
    }

    function setMarkers(stores) {
        marker_array.forEach(marker => marker.setMap(null));
        marker_array = [];

        stores.forEach(store => {
            const marker = new google.maps.Marker({
                position: { lat: store.lat, lng: store.lng },
                map: map,
                icon: image
            });

            marker.addListener("click", () => {
                infowindow.setContent(\`
                    <div>
                        <h4><strong>\${store.label}</strong></h4>
                        <p>\${store.street}</p>
                        <p>\${store.place}</p>
                    </div>
                \`);
                infowindow.open(map, marker);
                map.setCenter(marker.getPosition());
                map.setZoom(17);
            });

            marker_array.push(marker);
        });
    }

    function render_store_list(stores) {
        let html = "";

        stores.forEach((store, index) => {
            html += \`
                <div class="search_result" data-index="\${index}">
                    <h4><strong>\${store.label}</strong></h4>
                    <p>\${store.street}</p>
                    <p>\${store.place}</p>
                </div>
            \`;
        });

        document.querySelector(".filtered_search_result").innerHTML = html;
        attach_list_click();
    }

    function attach_list_click() {
        document.querySelectorAll(".search_result").forEach(item => {
            item.addEventListener("click", function () {
                const index = this.dataset.index;
                const marker = marker_array[index];
                map.setCenter(marker.getPosition());
                map.setZoom(17);
                google.maps.event.trigger(marker, "click");
            });
        });
    }

    document.getElementById("storeFinderSearchBox").addEventListener("input", function () {
        const value = this.value.toLowerCase().trim();

        if (value === "") {
            currentStores = [...storesObj.stores];
        } else {
            const matches = storesObj.stores.filter(store =>
                store.label.toLowerCase().includes(value) ||
                store.street.toLowerCase().includes(value) ||
                store.place.toLowerCase().includes(value)
            );

            const nonMatches = storesObj.stores.filter(store =>
                !(
                    store.label.toLowerCase().includes(value) ||
                    store.street.toLowerCase().includes(value) ||
                    store.place.toLowerCase().includes(value)
                )
            );

            currentStores = [...matches, ...nonMatches];
        }

        render_store_list(currentStores);
        setMarkers(currentStores);
    });
</script>

<style>
/* Your CSS here, same as original */
</style>

{% schema %}
{
    "name": "Store Locator Map",
    "settings": [
        { "type": "color", "id": "store_bg_color", "label": "Store list background color", "default": "#373a36" },
        { "type": "color", "id": "store_bg_hover_color", "label": "Store list hover color", "default": "#4a4c4a" }
    ],
    "blocks": [
        {
            "type": "store",
            "name": "Store",
            "settings": [
                { "type": "text", "id": "label", "label": "Store Name", "default": "Shoepassion Store Berlin" },
                { "type": "text", "id": "street", "label": "Street", "default": "Leibnizstraße 59" },
                { "type": "text", "id": "place", "label": "Place / City", "default": "10629 Berlin" },
                { "type": "text", "id": "lat", "label": "Latitude", "default": "52.5028363" },
                { "type": "text", "id": "lng", "label": "Longitude", "default": "13.3128713" }
            ]
        }
    ],
    "presets": [{ "name": "Store Locator Map" }]
}
{% endschema %}`
    }
};

export default sampleCodes;