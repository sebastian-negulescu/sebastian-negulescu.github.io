import os
import json
import pdb

GALLERY_PATH = "./gallery"


def generate_manifest(path: str) -> dict[str, any] | list[str]:
    assert os.path.isdir(path)

    contents = os.listdir(path)

    directories = [directory for directory in contents if os.path.isdir(os.path.join(path, directory))]
    if not directories:
        return [image for image in contents if os.path.isfile(os.path.join(path, image)) and (os.path.splitext(image)[1] == ".jpeg" or os.path.splitext(image)[1] == ".png")]

    manifest = {}
    for directory in directories:
        manifest[directory] = generate_manifest(os.path.join(path, directory))

    return manifest


def manifest_is_valid(manifest: dict[str, any]) -> bool:
    for name, gallery in manifest.items():
        print(name)
        if set(gallery["thumbnails"]) != set(gallery["images"]):
            return False

    return True


if __name__ == "__main__":
    assert os.path.isdir(GALLERY_PATH)

    manifest = generate_manifest(GALLERY_PATH)
    assert manifest_is_valid(manifest)

    with open("manifest.json", "w") as f:
        json.dump(manifest, f)
