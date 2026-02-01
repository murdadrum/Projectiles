import re
from pathlib import Path

APP_FILE = Path(__file__).resolve().parents[1] / 'src' / 'app' / 'App.tsx'


def _read_app() -> str:
    return APP_FILE.read_text(encoding='utf-8')


def test_tile_color_count_is_16():
    text = _read_app()
    match = re.search(r"const tileColors = \[(.*?)\];", text, re.S)
    assert match, 'tileColors array not found'
    colors = re.findall(r"'#[0-9a-fA-F]{3,8}'", match.group(1))
    assert len(colors) == 16, f'Expected 16 tile colors, found {len(colors)}'


def test_preview_images_count_is_16():
    text = _read_app()
    match = re.search(r"const previewImages:.*?= \{(.*?)\};", text, re.S)
    assert match, 'previewImages map not found'
    keys = re.findall(r"\n\s*(\d+):", match.group(1))
    assert len(keys) == 16, f'Expected 16 preview images, found {len(keys)}'


def test_tile_info_count_is_16():
    text = _read_app()
    match = re.search(r"const tileInfo:.*?= \{(.*?)\n\};", text, re.S)
    assert match, 'tileInfo map not found'
    keys = re.findall(r"\n\s*(\d+):\s*\{", match.group(1))
    assert len(keys) == 16, f'Expected 16 tile info entries, found {len(keys)}'
